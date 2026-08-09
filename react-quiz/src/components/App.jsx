import { useEffect, useReducer } from 'react';
import DateCounter from './DateCounter';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';

const initialState = {
	questions: [],
	status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
	current: 0,
	answer: null,
	score: 0,
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
		default:
			throw new Error('Action unknown !');
	}
}

export default function App() {
	const [{ status, questions, current, answer }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const questionsCount = questions.length;

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
						<Question
							question={questions[current]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	);
}
