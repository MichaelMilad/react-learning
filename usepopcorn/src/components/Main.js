import { useState } from 'react';

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
}

export function MovieList({ movies }) {
	return (
		<ul className='list'>
			{movies?.map((movie) => (
				<Movie key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
}

export function Movie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

export function WatchedMovieList({ watched }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
}

export function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

export function WatchedMovie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}

export default function Main({ children }) {
	return <main className='main'>{children}</main>;
}
