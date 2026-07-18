import Intro from './components/Intro';
import Avatar from './components/Avatar';
import SkillList from './components/SkillList';

import './styles.css';

// Dev profile card with image, summary and skills
export default function App() {
	return (
		<div className='card'>
			<Avatar />
			<div className='data'>
				<Intro />
				{/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
				<SkillList />
			</div>
		</div>
	);
}
