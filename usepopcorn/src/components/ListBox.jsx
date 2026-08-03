import Box from './Box';
import MovieList from './MovieList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

export default function ListBox({ movies, isLoading, error, onSelect }) {
	return (
		<Box>
			{!isLoading && !error && <MovieList movies={movies} onSelect={onSelect} />}
			{isLoading && !error && <Loader />}
			{!isLoading && error && <ErrorMessage message={error} />}
		</Box>
	);
}
