import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Intro from './components/Intro';
import Avatar from './components/Avatar';
import SkillList from './components/SkillList';

import './styles.css';
import './index.css';

//Dev Profile card with image, summary and skills
// function App() {
// 	return (
// 		<div className='card'>
// 			<Avatar />
// 			<div className='data'>
// 				<Intro />
// 				{/* Should contain one Skill component
//         for each web dev skill that you have,
//         customized with props */}
// 				<SkillList />
// 			</div>
// 		</div>
// 	);
// }

//stepper with next/prev
// function App() {
// 	const messages = ['Learn React', 'Apply for jobs', 'Invest your new income'];
// 	const [step, setStep] = useState(0);
// 	const [isOpen, setIsOpen] = useState(true);

// 	function handleNext() {
// 		if (step + 1 > messages.length - 1) setStep(messages.length - 1);
// 		else setStep(step + 1);
// 	}

// 	function handlePrev() {
// 		if (step - 1 < 0) setStep(0);
// 		else setStep(step - 1);
// 	}

// 	return (
// 		<div>
// 			<button className='close' onClick={() => setIsOpen(!isOpen)}>
// 				&times;
// 			</button>

// 			{isOpen && (
// 				<div className='steps'>
// 					<div className='numbers'>
// 						{messages.map((_val, i) => (
// 							<div key={i} className={step >= i ? 'active' : 'inactive'}>
// 								{i}
// 							</div>
// 						))}
// 					</div>

// 					<p className='message'>
// 						Step #{step + 1}: {messages[step]}
// 					</p>

// 					<div className='buttons'>
// 						<button
// 							style={{ backgroundColor: '#7950f2', color: '#fff' }}
// 							onClick={handlePrev}
// 						>
// 							Previous
// 						</button>
// 						<button
// 							style={{ backgroundColor: '#7950f2', color: '#fff' }}
// 							onClick={handleNext}
// 						>
// 							Next
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

//date counter
function App() {
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
		<>
			<style>{`
                .main { display: flex; flex-direction: column; gap: 1rem; align-items: center }
                .row { display: flex; gap: 0.5rem; align-items: center; }
                .row button { padding: 0.5rem 1rem; cursor: pointer; }
            `}</style>
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
		</>
	);
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
