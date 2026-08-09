export default function NextButton({
	dispatch,
	answer,
	current,
	questionsCount,
}) {
	if (answer === null) return null;

	const isLastQuestion = current + 1 === questionsCount;

	function handleNext() {
		if (isLastQuestion) {
			return dispatch({
				type: 'finish',
			});
		}

		return dispatch({
			type: 'next',
		});
	}

	return (
		<button className='btn btn-ui' onClick={handleNext}>
			{isLastQuestion ? 'Finish' : 'Next'}
		</button>
	);
}
