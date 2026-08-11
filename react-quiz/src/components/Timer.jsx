import { useEffect, useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

function formatTime(totalSeconds) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	// padStart adds a leading zero if the number is a single digit
	const paddedMinutes = String(minutes).padStart(2, '0');
	const paddedSeconds = String(seconds).padStart(2, '0');

	return `${paddedMinutes}:${paddedSeconds}`;
}

export default function Timer() {
	const { dispatch } = useQuiz();
	const [timer, setTimer] = useState(5 * 60);

	const formattedTime = formatTime(timer);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((time) => {
				if (time <= 1) {
					clearInterval(intervalId);
					dispatch({
						type: 'finish',
					});
				}
				return time - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [dispatch]);

	return <div className='timer'>{formattedTime}</div>;
}
