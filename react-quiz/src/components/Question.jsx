import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

export default function Question() {
	const { questions, current } = useQuiz();
	const question = questions[current];

	return (
		<div>
			<h4>{question.question}</h4>

			<Options />
		</div>
	);
}
