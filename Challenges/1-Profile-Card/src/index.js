import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Intro from './components/Intro';
import Avatar from './components/Avatar';
import SkillList from './components/SkillList';

import './styles.css';
import './index.css';

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

function App() {
	const messages = ['Learn React', 'Apply for jobs', 'Invest your new income'];
	const [step, setStep] = useState(0);

	function handleNext() {
		if (step + 1 > messages.length - 1) setStep(messages.length - 1);
		else setStep(step + 1);
	}

	function handlePrev() {
		if (step - 1 < 0) setStep(0);
		else setStep(step - 1);
	}

	return (
		<div className='steps'>
			<div className='numbers'>
				{[0, 1, 2].map((i) => (
					<div className={step >= i ? 'active' : 'inactive'}>{i}</div>
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
	);
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
