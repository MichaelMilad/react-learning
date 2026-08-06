import { useState } from 'react';

function useGeolocation() {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState({});
	const [error, setError] = useState(null);

	const getPosition = () => {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation');

		setError(null);
		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			},
		);
	};

	return { position, getPosition, error, isLoading };
}

export default function App() {
	const { position, getPosition, error, isLoading } = useGeolocation();
	const [counter, setCounter] = useState(0);

	const handleGetPosition = () => {
		setCounter((count) => count + 1);
		getPosition();
	};

	const { lat, lng } = position;

	return (
		<div>
			<button onClick={handleGetPosition} disabled={isLoading}>
				Get my position
			</button>

			{isLoading && <p>Loading position...</p>}
			{error && <p>{error}</p>}
			{!isLoading && !error && lat && lng && (
				<p>
					Your GPS position:{' '}
					<a
						target='_blank'
						rel='noreferrer'
						href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
					>
						{lat}, {lng}
					</a>
				</p>
			)}

			<p>You requested position {counter} times</p>
		</div>
	);
}
