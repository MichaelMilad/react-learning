function Progress({ index, total, score, maxScore, answer }) {
	return (
		<header className='progress'>
			<progress max={total} value={index + Number(answer !== null)} />

			<p>
				Question <strong>{index + 1}</strong> / {total}
			</p>

			<p>
				<strong>{score}</strong> / {maxScore}
			</p>
		</header>
	);
}

export default Progress;
