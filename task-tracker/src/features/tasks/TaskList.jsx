/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';

import { useFilter } from '../../contexts/filter/useFilter';

import Task from './Task';

function TaskList() {
	const { statusFilter, setStatusFilter } = useFilter();

	const statusFilterParam =
		statusFilter !== 'all' ? `?status=${statusFilter}` : '';

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['tasks', statusFilter],
		queryFn: async () => {
			console.log('Filter', statusFilterParam);
			const response = await fetch(
				`http://localhost:8000/tasks${statusFilterParam}`,
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {error.message}</div>;

	return (
		<div>
			<div>
				<label htmlFor='status'>Status:</label>

				<select
					name='status'
					id='status'
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
				>
					<option value='all'>All Tasks</option>
					<option value='todo'>Todos</option>
					<option value='in-progress'>In-Progress</option>
				</select>
			</div>
			<ul>
				{data.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</ul>
		</div>
	);
}

export default TaskList;
