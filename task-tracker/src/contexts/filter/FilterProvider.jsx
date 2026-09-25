/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const FilterContext = createContext(null);

export default function FilterProvider({ children }) {
	const [statusFilter, setStatusFilter] = useState('all');
	const [queryFilter, setQueryFilter] = useState('');

	const value = {
		statusFilter,
		setStatusFilter,
		queryFilter,
		setQueryFilter,
	};

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
}
