import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const getSavedValue = (key, initialValue) => {
	const savedValue = JSON.parse(Cookie.get(key));
	if (savedValue) return savedValue;

	if (initialValue instanceof Function) return initialValue();

	return initialValue;
};

const useCookie = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		Cookie.set(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useCookie;
