import { useEffect } from 'react';

export function useKey(callBack, key) {
	useEffect(() => {
		const callback = (e) => {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				callBack();
			}
		};
		document.addEventListener('keydown', callback);

		return () => {
			document.removeEventListener('keydown', callback);
		};
	}, [callBack, key]);
}
