import { useState } from 'react';

import './styles.css';

// Date counter with adjustable step
export default function App() {
	const [step, setStep] = useState(1);
	const [date, setDate] = useState(new Date());

	function handleStepChange(val) {
		return () => {
			setStep(step + val);
		};
	}

	function handleDateChange(val) {
		return () => {
			const next = new Date(date);
			next.setDate(next.getDate() + val * step);
			setDate(next);
		};
	}

	const formatted = date.toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});

	return (
		<div className='main'>
			<div className='row'>
				<button onClick={handleStepChange(-1)}>-</button>
				<span>{step}</span>
				<button onClick={handleStepChange(1)}>+</button>
			</div>
			<div className='row'>
				<button onClick={handleDateChange(-1)}>-</button>
				<span>{formatted}</span>
				<button onClick={handleDateChange(1)}>+</button>
			</div>
		</div>
	);
}
