export default function WatchedMovie({ movie, onDeleteWatched }) {
	const { Runtime } = movie;

	const formattedRuntime = +Runtime.split(' ')[0];

	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{+movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{formattedRuntime} min</span>
				</p>
				<button
					className='btn-delete'
					onClick={() => onDeleteWatched(movie.imdbID)}
				></button>
			</div>
		</li>
	);
}
