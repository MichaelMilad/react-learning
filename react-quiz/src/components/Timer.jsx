import { useEffect, useState, useRef } from 'react';
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
	const { dispatch, remainingTime } = useQuiz();

	const formattedTime = formatTime(remainingTime);

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => clearInterval(intervalId);
	}, [dispatch]);

	return <div className='timer'>{formattedTime}</div>;
}
