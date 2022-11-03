import { writable } from 'svelte/store';

let partsListObj = {
	cpu: null,
	motherboard: null,
	memory: null,
	gpu: null,
	psu: null,
	case: null,
	cooling: null
};

export const partsList = writable(partsListObj);
