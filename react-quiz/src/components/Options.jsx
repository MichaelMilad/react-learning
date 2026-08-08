export default function Options({ question, dispatch, answer }) {
	function handleSubmitAnswer(val) {
		return () =>
			dispatch({
				type: 'newAnswer',
				payload: val,
			});
	}

	return (
		<div className='options'>
			{question.options.map((option, index) => {
				return (
					<button
						key={option}
						className={`btn btn-option ${index === answer ? 'answer' : ''} ${index === question.correctOption ? 'correct' : 'wrong'}`}
						onClick={handleSubmitAnswer(index)}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
