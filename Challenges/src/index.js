import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Switch challenges by changing this one line.
// import App from './challenges/1-Profile-Card/App'
// import App from './challenges/2-Stepper/App'
// import App from './challenges/3-Date-Counter/App'
// import App from './challenges/4-Flash-Cards/App'
// import App from './challenges/4-Flash-Cards/App';
import App from './challenges/Accordion Component/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
