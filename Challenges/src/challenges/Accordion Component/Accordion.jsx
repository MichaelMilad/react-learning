import { useState } from 'react';

const faqs = [
	{
		title: 'Where are these chairs assembled?',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
	},
	{
		title: 'How long do I have to return my chair?',
		text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
	},
	{
		title: 'Do you ship to countries outside the EU?',
		text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
	},
];

export default function Accordion() {
	return (
		<div className='accordion'>
			{faqs.map((faq, idx) => (
				<Item key={idx} data={faq} idx={idx} />
			))}
		</div>
	);
}

function Item({ data, idx }) {
	const [isOpened, setIsOpened] = useState(false);

	const { title, text } = data;

	function handleClick() {
		setIsOpened((o) => !o);
	}

	return (
		<div
			type='button'
			onClick={handleClick}
			className={`item ${isOpened ? 'open' : ''}`}
		>
			<p className='number'>{idx + 1}</p>
			<h3 className='title text'>{title}</h3>
			<span className='icon'>{isOpened ? '−' : '+'}</span>
			{isOpened && (
				<div className='content-box'>
					<p>{text}</p>
				</div>
			)}
		</div>
	);
}
