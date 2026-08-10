function FinishedScreen({ score, maxScore, highscore, dispatch }) {
	const percentage = (score / maxScore) * 100;

	let emoji;
	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🎉';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';

	function handleRestart() {
		dispatch({
			type: 'restart',
		});
	}

	return (
		<>
			<p className='result'>
				<span>{emoji}</span>
				You scored <strong>{score}</strong> out of {maxScore} (
				{percentage.toFixed(2)}%)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
			<button className='btn btn-ui' onClick={handleRestart}>
				Restart
			</button>
		</>
	);
}

export default FinishedScreen;
