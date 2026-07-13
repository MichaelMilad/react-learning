import Skill from './Skill';

const skills = [
	{
		skill: 'React',
		level: 'beginner',
		color: 'blue',
	},
	{
		skill: 'HTML+CSS',
		level: 'intermediate',
		color: 'orange',
	},
	{
		skill: 'JavaScript',
		level: 'expert',
		color: 'yellow',
	},
	{
		skill: 'Svelte',
		level: 'something-else',
		color: 'orangered',
	},
];

export default function SkillList() {
	return (
		<div className='skill-list'>
			{skills.map((s) => (
				<Skill {...s} />
			))}
		</div>
	);
}
