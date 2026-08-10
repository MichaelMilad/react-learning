import { useEffect, useReducer } from 'react';
import DateCounter from './DateCounter';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
	questions: [],
	status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
	current: 0,
	answer: null,
	score: 0,
	highscore: null,
};

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
		case 'newAnswer':
			const { correctOption, points } = state.questions[state.current];

			return {
				...state,
				answer: action.payload,
				score:
					action.payload === correctOption ? state.score + points : state.score,
			};
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

export default function App() {
	const [{ status, questions, current, answer, score, highscore }, dispatch] =
		useReducer(reducer, initialState);

	const questionsCount = questions.length;
	const maxScore = questions.reduce((prev, next) => prev + next.points, 0);

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

	return (
		<div className='app'>
			<Header />

			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen count={questionsCount} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={current}
							total={questionsCount}
							score={score}
							maxScore={maxScore}
							answer={answer}
						/>
						<Question
							question={questions[current]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer dispatch={dispatch} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								questionsCount={questionsCount}
								current={current}
							/>
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishedScreen
						score={score}
						maxScore={maxScore}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
