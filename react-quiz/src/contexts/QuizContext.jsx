import { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
	questions: [],
	status: 'loading',
	current: 0,
	answer: null,
	score: 0,
	highscore: null,
};

const QuizContext = createContext(null);

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
			};
		case 'newAnswer': {
			const { correctOption, points } = state.questions[state.current];

			return {
				...state,
				answer: action.payload,
				score:
					action.payload === correctOption ? state.score + points : state.score,
			};
		}
		case 'next':
			return {
				...state,
				current: state.current + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore: Math.max(state.score, state.highscore),
			};
		case 'restart': {
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
				highscore: state.highscore,
			};
		}
		default:
			throw new Error('Action unknown !');
	}
}

function QuizProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const questionsCount = state.questions.length;
	const maxScore = state.questions.reduce((prev, next) => prev + next.points, 0);

	const value = { ...state, questionsCount, maxScore, dispatch };

	useEffect(() => {
		let timeoutId = null;
		fetch('http://localhost:8000/questions')
			.then((res) => res.json())
			.then(
				(data) =>
					(timeoutId = setTimeout(
						() =>
							dispatch({
								type: 'dataReceived',
								payload: data,
							}),
						1500,
					)),
			)
			.catch((err) =>
				dispatch({
					type: 'dataFailed',
				}),
			);

		return () => clearTimeout(timeoutId);
	}, []);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (!context) throw new Error('useQuiz must be used within QuizProvider');
	return context;
}

export { QuizProvider, useQuiz };
