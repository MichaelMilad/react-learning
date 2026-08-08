import { useReducer } from 'react';

const initialState = {
	count: 0,
	step: 1,
};

function reducer(state, action) {
	// if (action.type === 'inc') return state + 1;
	// if (action.type === 'dec') return state - 1;
	// if (action.type === 'set') return action.payload;

	switch (action.type) {
		case 'dec':
			return { ...state, count: state.count - 1 };
		case 'inc':
			return { ...state, count: state.count + 1 };
		case 'set':
			return { ...state, count: action.payload };
		case 'setStep':
			return { ...state, step: action.payload };
		case 'reset':
			return { count: 0, step: 1 };
		default:
			throw new Error('Unknown Action !');
	}
}

export default function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { count, step } = state;

	// This mutates the date object.
	const date = new Date();
	date.setDate(date.getDate() + count * step);

	const dec = function () {
		dispatch({
			type: 'dec',
		});
	};

	const inc = function () {
		dispatch({
			type: 'inc',
		});
	};

	const defineCount = function (e) {
		dispatch({
			type: 'set',
			payload: Number(e.target.value),
		});
	};

	const defineStep = function (e) {
		dispatch({
			type: 'setStep',
			payload: e.target.value,
		});
	};

	const reset = function () {
		dispatch({
			type: 'reset',
		});
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
