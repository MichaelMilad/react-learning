import { useState } from 'react';

import StarRating from './StarRating';

export default function MovieDetails({
	movie,
	onBack,
	onAddWatched,
	isWatched,
}) {
	const [userRating, setUserRating] = useState(null);

	const {
		Title: title,
		Runtime: runtime,
		Poster: poster,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	movie.userRating = userRating;

	function handleSetRating(rating) {
		setUserRating(rating);
	}

	return (
		<div className='details'>
			<header>
				<button className='btn-back' onClick={onBack}>
					&larr;
				</button>
				<img src={poster} alt={`Poster of ${title}`} />
				<div className='details-overview'>
					<h2>{title}</h2>
					<p>
						{released} &bull; {runtime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐</span>
						{imdbRating} IMDb Rating
					</p>
				</div>
			</header>
			s
			<section>
				<div className='rating'>
					{!isWatched ? (
						<>
							<StarRating
								maxRating={10}
								size={24}
								onSetRating={handleSetRating}
							/>

							<button
								disabled={!userRating}
								className='btn-add'
								onClick={() => onAddWatched(movie)}
							>
								Add to List
							</button>
						</>
					) : (
						<p>You added this movie {movie.userRating}!</p>
					)}
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actors}</p>
				<p>Directed By: {director}</p>
			</section>
		</div>
	);
}
