import { useQuiz } from '../contexts/QuizContext';

import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';

export default function Main() {
	const { status } = useQuiz();

	return (
		<main className='main'>
			{status === 'loading' && <Loader />}
			{status === 'error' && <Error />}
			{status === 'ready' && <StartScreen />}
			{status === 'active' && (
				<>
					<Progress />
					<Question />
					<Footer>
						<Timer />
						<NextButton />
					</Footer>
				</>
			)}
			{status === 'finished' && <FinishedScreen />}
		</main>
	);
}
