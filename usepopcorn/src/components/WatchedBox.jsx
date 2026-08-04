import { useState, useEffect } from 'react';
import axios from 'axios';

import Box from './Box';
import MovieDetails from './MovieDetails';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

export default function WatchedBox({ selectedId, setSelectedId }) {
	const [watched, setWatched] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

	useEffect(() => {
		const controller = new AbortController();

		async function getMovieDetails() {
			try {
				setIsLoading(true);
				const res = await axios.get(
					`http://www.omdbapi.com/?apikey=1499b5ef&i=${selectedId}`,
					{
						signal: controller.signal,
					},
				);

				setSelectedMovie(res.data);
				setError(null);
			} catch (error) {
				let message = 'Oops !, an Error happened while loading the movie';
				if (error.message === 'Movie Not Found!') message = error.message;
				setError(message);
			} finally {
				setIsLoading(false);
			}
		}

		if (selectedId) {
			getMovieDetails();
		}

		return () => controller.abort();
	}, [selectedId]);

	function handleAddWatchedMovie() {
		setWatched([...watched, selectedMovie]);
		setSelectedId(null);
	}

	function handleDeleteWatchedMovie() {
		setWatched((watched) =>
			watched.filter((movie) => movie.imdbID !== selectedMovie.imdbID),
		);
		setSelectedId(null);
	}

	return (
		<Box>
			{selectedId ? (
				error ? (
					<ErrorMessage message={error} />
				) : isLoading ? (
					<Loader />
				) : (
					<MovieDetails
						movie={selectedMovie}
						onBack={() => setSelectedId(null)}
						onAddWatched={handleAddWatchedMovie}
						isWatched={isWatched}
					/>
				)
			) : (
				<>
					<WatchedSummary watched={watched} />
					<WatchedMovieList
						watched={watched}
						onDeleteWatched={handleDeleteWatchedMovie}
					/>
				</>
			)}
		</Box>
	);
}
