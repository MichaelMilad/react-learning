import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TaskList from './features/tasks/TaskList';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';
import FilterProvider from './contexts/filter/FilterProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Home Page</div>,
	},
	{
		path: '/tasks',
		element: <TaskList />,
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<FilterProvider>
				<RouterProvider router={router} />
			</FilterProvider>
		</QueryClientProvider>
	);
}

export default App;
