export default function NextButton({ dispatch, answer }) {
	if (answer === null) return null;

	function handleNext() {
		dispatch({
			type: 'next',
		});
	}

	return (
		<button className='btn btn-ui' onClick={handleNext}>
			Next
		</button>
	);
}
