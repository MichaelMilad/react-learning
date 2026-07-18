import { useState } from 'react';

import './styles.css';

// Stepper with next/prev
export default function App() {
	const messages = ['Learn React', 'Apply for jobs', 'Invest your new income'];
	const [step, setStep] = useState(0);
	const [isOpen, setIsOpen] = useState(true);

	function handleNext() {
		if (step + 1 > messages.length - 1) setStep(messages.length - 1);
		else setStep(step + 1);
	}

	function handlePrev() {
		if (step - 1 < 0) setStep(0);
		else setStep(step - 1);
	}

	return (
		<div>
			<button className='close' onClick={() => setIsOpen(!isOpen)}>
				&times;
			</button>

			{isOpen && (
				<div className='steps'>
					<div className='numbers'>
						{messages.map((_val, i) => (
							<div key={i} className={step >= i ? 'active' : 'inactive'}>
								{i}
							</div>
						))}
					</div>

					<p className='message'>
						Step #{step + 1}: {messages[step]}
					</p>

					<div className='buttons'>
						<button
							style={{ backgroundColor: '#7950f2', color: '#fff' }}
							onClick={handlePrev}
						>
							Previous
						</button>
						<button
							style={{ backgroundColor: '#7950f2', color: '#fff' }}
							onClick={handleNext}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
