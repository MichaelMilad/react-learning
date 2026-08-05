import { useState } from 'react';

import { useMovies } from './hooks/useMovies';

import NavBar from './components/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const { movies, isLoading, error } = useMovies(query);

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
