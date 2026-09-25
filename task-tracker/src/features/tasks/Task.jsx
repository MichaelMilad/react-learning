/* eslint-disable react/prop-types */
function Task({ task }) {
	const { name, id, status } = task;

	return (
		<div>
			<div>
				Task: <span>{name}</span>
			</div>
			<div>
				Task ID: <span>{id}</span>
			</div>
			<div>
				Task Status: <span>{status}</span>
			</div>
			<br />
		</div>
	);
}

export default Task;
