# Context Refactor — Review Notes

Notes from moving the `useReducer` state out of `App` and into `contexts/QuizContext.jsx`.

## What was fixed

The refactor's actual breakage had one root cause: **derived values stayed in `Main` but the consumers started reading them from context.**

- `questionsCount` / `maxScore` were computed in `Main` and passed down as props. `Progress` and
  `FinishedScreen` had already switched to `useQuiz()`, so they received `undefined` — the progress
  bar had no `max`, and `(score / undefined) * 100` made the results screen render `NaN%` with no
  emoji. Both derivations moved into the provider's `value` so there is one source.
- Stripped the leftover prop drilling and converted the rest of the tree to `useQuiz()`: `Main` is
  now just a status switch, plus `StartScreen`, `Question`, `Options`, `NextButton`, `Timer`.
- `createContext(initialState)` → `createContext(null)`. Worth internalizing: with a non-null
  default, the `if (!context) throw` guard is **dead code**. A component rendered outside the
  provider would silently receive a frozen `initialState` and render a permanent loading screen
  instead of telling you why.
- Error message said `useAuth must be used within AuthProvider`.
- `newAnswer` case needed braces (`no-case-declarations`).
- Dropped the unused `DateCounter` import from `App`.

## Assessment

The structure is right.

- The provider owning the fetch effect is the correct call — the data's lifecycle belongs with the
  state that holds it.
- Exporting only `useQuiz` and `QuizProvider` while keeping the context object private is exactly
  the pattern you want.
- The reducer stayed pure, and the `restart` case correctly rebuilds from `initialState` while
  carrying `questions` and `highscore` forward.

## TODO — open items

### 1. The `Timer` dispatch is a genuine bug

Pre-existing, not introduced by this refactor. `dispatch` is called inside the `setTimer` updater.
Updater functions must be pure — React runs them during render, and StrictMode deliberately
double-invokes them in dev, so `finish` dispatches twice. It's masked here only because `finish`
happens to be idempotent.

Fix: either a `useEffect` watching `timer`, or move the countdown into the reducer as a `tick`
action.

### 2. The timer probably belongs in the reducer anyway

It's quiz state, not view state. Something like
`secondsRemaining: questionsCount * SECS_PER_QUESTION` set on `start` removes the hardcoded
duration and makes restart behavior obvious.

### 3. The fetch cleanup doesn't do what it looks like it does

```js
let timeoutId = null;
fetch(...).then((data) => (timeoutId = setTimeout(...)));
return () => clearTimeout(timeoutId);
```

`clearTimeout(timeoutId)` reads `timeoutId` at the moment the cleanup *runs*. If the fetch hasn't
resolved yet, that's still `null`, so it clears nothing — then the fetch resolves, schedules the
`setTimeout`, and dispatches into a dead provider. In StrictMode this fires on every dev load.

Harmless in practice here, but the standard fix is an `ignore` boolean or an `AbortController`.

Also: the `.catch` sits after the `.then`, so it catches reducer errors too and reports them as
`dataFailed`.

### 4. Don't reach for `useMemo` on the context value

Common advice says you always should. Here you shouldn't bother: `QuizProvider` only re-renders when
the reducer state changes, and when that changes every consumer needs to update anyway. It would
start mattering if the provider took props or held unrelated state.

### 5. Minor

- `Question` and `Options` both compute `questions[current]` — consider exposing `question`
  directly from the context.
- `highscore: null` only works because `Math.max(x, null)` coerces to `0`. `0` is the honest
  initial value.
