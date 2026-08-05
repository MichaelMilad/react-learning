import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				const res = await axios.get(
					`http://www.omdbapi.com/?apikey=1499b5ef&s=${query}`,
					{
						signal: controller.signal,
					},
				);

				if (res.data.Error === 'Movie not found!')
					throw new Error('Movie Not Found!');

				setMovies(res.data.Search);
				setError(null);
			} catch (error) {
				let message = 'Oops !, an Error happened while loading the movies';
				if (error.message === 'Movie Not Found!') message = error.message;

				if (error.name !== 'AbortError') {
					setError(message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (query && query.length >= 4) {
			fetchMovies();
		}

		return () => controller.abort();
	}, [query]);

	return { movies, isLoading, error };
}
