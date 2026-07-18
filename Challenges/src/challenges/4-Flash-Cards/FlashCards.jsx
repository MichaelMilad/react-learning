import { useState } from 'react';

const questions = [
	{
		id: 3457,
		question: 'What language is React based on?',
		answer: 'JavaScript',
	},
	{
		id: 7336,
		question: 'What are the building blocks of React apps?',
		answer: 'Components',
	},
	{
		id: 8832,
		question: "What's the name of the syntax we use to describe a UI in React?",
		answer: 'JSX',
	},
	{
		id: 1297,
		question: 'How to pass data from parent to child components?',
		answer: 'Props',
	},
	{
		id: 9103,
		question: 'How to give components memory?',
		answer: 'useState hook',
	},
	{
		id: 2002,
		question:
			'What do we call an input element that is completely synchronised with state?',
		answer: 'Controlled element',
	},
];

export default function FlashCards() {
	const [selected, setSelected] = useState(null);
	const [deletedCards, setDeletedCards] = useState([]);

	function handleSelect(id) {
		return () => {
			if (id === selected) setSelected(null);
			else setSelected(id);
		};
	}

	function handleDelete(id) {
		return () => {
			setDeletedCards([...deletedCards, id]);
			if (selected === id) setSelected(null);
		};
	}

	function handleReset() {
		setDeletedCards([]);
	}

	return (
		<>
			<button
				type='button'
				onClick={handleReset}
				className='reset'
				disabled={!deletedCards.length}
			>
				Reset
			</button>
			<div className='flashcards'>
				{questions
					.filter((q) => !deletedCards.includes(q.id))
					.map((q) => (
						<Card
							key={q.id}
							item={q}
							isSelected={q.id === selected}
							onSelect={handleSelect(q.id)}
							onDelete={handleDelete(q.id)}
						/>
					))}
			</div>
		</>
	);
}

function Card({ item, isSelected, onSelect, onDelete }) {
	const [clickCounter, setClickCounter] = useState(0);

	function handleClick() {
		setClickCounter(clickCounter + 1);
		onSelect();
	}

	const { question, answer } = item;
	return (
		<div className={`card ${isSelected ? 'selected' : ''}`}>
			<div className='clicks'>Clicks: {clickCounter}</div>
			<button type='button' onClick={handleClick} className='question'>
				{isSelected ? answer : question}
			</button>
			<button type='button' onClick={onDelete} className='delete'>
				x
			</button>
		</div>
	);
}
