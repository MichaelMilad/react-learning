import { useEffect, useState } from 'react';
import axios from 'axios';

import StarRating from './StarRating';
import Loader from './Loader';

export default function MovieDetails({ selectedId, setSelectedMovie }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const {
		Title: title,
		Runtime: runtime,
		Year: year,
		Poster: poster,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	useEffect(() => {
		async function getMovieDetails(movieId) {
			try {
				setIsLoading(true);
				const res = await axios.get(
					`http://www.omdbapi.com/?apikey=1499b5ef&i=${selectedId}`,
				);

				setMovie(res.data);
				setError(null);
			} catch (error) {
				let message = 'Oops !, an Error happened while loading the movies';
				if (error.message === 'Movie Not Found!') message = error.message;
				setError(message);
			} finally {
				setIsLoading(false);
			}
		}

		if (selectedId) {
			getMovieDetails();
		}
	}, [selectedId]);

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={() => setSelectedMovie(null)}>
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

					<section>
						<div className='rating'>
							<StarRating maxRating={10} size={24} />
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed By: {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
