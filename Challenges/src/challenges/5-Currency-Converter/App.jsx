// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from 'react';

export default function App() {
	const [query, setQuery] = useState(1);
	const [currencyFrom, setCurrencyFrom] = useState('USD');
	const [currencyTo, setCurrencyTo] = useState('EUR');
	const [output, setOutput] = useState(0);

	function handleChangeCurrency(target) {
		return target === 'from'
			? (e) => setCurrencyFrom(e.target.value)
			: (e) => setCurrencyTo(e.target.value);
	}

	function handleChangeQuery(e) {
		setQuery(e.target.value);
	}

	useEffect(() => {
		const fetchApi = () => {
			fetch(
				`https://api.frankfurter.dev/v1/latest?amount=${query}&from=${currencyFrom}&to=${currencyTo}`,
			).then(async (res) => {
				const json = await res.json();
				console.log(json);
				setOutput(json.rates[currencyTo]);
			});
		};

		if (currencyFrom && currencyTo && query) fetchApi();
	}, [currencyFrom, currencyTo, query]);

	return (
		<div>
			<input type='text' value={query} onChange={handleChangeQuery} />
			<select
				id='currency-from'
				value={currencyFrom}
				onChange={handleChangeCurrency('from')}
			>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='INR'>INR</option>
			</select>
			<select
				id='currency-to'
				value={currencyTo}
				onChange={handleChangeCurrency('to')}
			>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='INR'>INR</option>
			</select>
			<p>OUTPUT {output}</p>
		</div>
	);
}
