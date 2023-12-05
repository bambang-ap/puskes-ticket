// import {effect} from '@preact/signals-react';

// import {CreateSignalArray} from '@utils/signals';

// const STORAGE_KEY = 'TODOS';
// function getTodos() {
// 	if (typeof window === 'undefined') return [];

// 	const value = localStorage.getItem(STORAGE_KEY);
// 	if (!value) return [];
// 	return JSON.parse(value) as string[];
// }

// export const K = new CreateSignalArray(getTodos());

// effect(() => {
// 	if (typeof window === 'undefined') return;
// 	localStorage.setItem(STORAGE_KEY, JSON.stringify(K.value));
// });

export {};
