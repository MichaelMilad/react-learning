import { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar, { NumResults, Search } from './components/NavBar';
import Main, {
	Box,
	MovieList,
	WatchedMovieList,
	WatchedSummary,
} from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				const res = await axios.get(
					`http://www.omdbapi.com/?apikey=1499b5ef&s=${query}`,
				);

				if (res.data.Error === 'Movie not found!')
					throw new Error('Movie Not Found!');

				setMovies(res.data.Search);
				setError(null);
			} catch (error) {
				let message = 'Oops !, an Error happened while loading the movies';
				if (error.message === 'Movie Not Found!') message = error.message;
				setError(message);
			} finally {
				setIsLoading(false);
			}
		};

		if (!query || query.length < 4) {
			setMovies([]);
			setError(null);
		} else {
			fetchMovies();
		}
	}, [query]);

	function handleSelectMovie(id) {
		setSelectedId(id === selectedId ? null : id);
	}

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies || []} />
			</NavBar>
			<Main>
				<Box>
					{!isLoading && !error && (
						<MovieList movies={movies} onSelect={handleSelectMovie} />
					)}
					{isLoading && !error && <Loader />}
					{!isLoading && error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							setSelectedMovie={setSelectedId}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
			{/* <StarRating maxRating={5} messages={messages} />
			<StarRating maxRating={10} color='red' size={24} defaultRating={5} />
			<Test /> */}
		</>
	);
}
