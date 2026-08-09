export default function Options({ question, dispatch, answer }) {
	function handleSubmitAnswer(val) {
		return () =>
			dispatch({
				type: 'newAnswer',
				payload: val,
			});
	}

	const hasAnswer = answer !== null;

	return (
		<div className='options'>
			{question.options.map((option, index) => {
				return (
					<button
						key={option}
						disabled={hasAnswer}
						className={`btn btn-option ${index === answer ? 'answer' : ''}
							${hasAnswer ? (index === question.correctOption ? 'correct' : 'wrong') : ''}`}
						onClick={handleSubmitAnswer(index)}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
