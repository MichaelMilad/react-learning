import { useQuiz } from '../contexts/QuizContext';

export default function StartScreen() {
	const { questionsCount, dispatch } = useQuiz();

	function handleStart() {
		dispatch({
			type: 'start',
		});
	}

	return (
		<div className='start'>
			<h2>Welcome to The React Quiz!</h2>
			<h3>{questionsCount} question to test your React mastery</h3>
			<button className='btn btn-ui' onClick={handleStart}>
				Let's Start
			</button>
		</div>
	);
}
