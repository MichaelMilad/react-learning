import { useQuiz } from '../contexts/QuizContext';

function Progress() {
	const { current, questionsCount, score, maxScore, answer } = useQuiz();

	return (
		<header className='progress'>
			<progress
				max={questionsCount}
				value={current + Number(answer !== null)}
			/>

			<p>
				Question <strong>{current + 1}</strong> / {questionsCount}
			</p>

			<p>
				<strong>{score}</strong> / {maxScore}
			</p>
		</header>
	);
}

export default Progress;
