import { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from './components/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';

export default function App() {
	const [movies, setMovies] = useState([]);
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
				<ListBox
					movies={movies}
					isLoading={isLoading}
					error={error}
					onSelect={handleSelectMovie}
				/>
				<WatchedBox selectedId={selectedId} setSelectedId={setSelectedId} />
			</Main>
		</>
	);
}
