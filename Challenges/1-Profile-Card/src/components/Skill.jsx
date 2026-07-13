export default function Skill({ skill, color, level }) {
	const levelEmojiMap = {
		beginner: '👶',
		intermediate: '💪',
		expert: '💪',
	};

	return (
		<div className='skill' style={{ backgroundColor: color }}>
			<span>{skill}</span>
			<span>{levelEmojiMap[level] || 'N/A'}</span>
		</div>
	);
}
