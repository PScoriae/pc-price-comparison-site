import { writable } from 'svelte/store';
import type { PartsList } from '$lib/types/types';

let partsListObj: PartsList = {
	cpu: null,
	motherboard: null,
	memory: null,
	gpu: null,
	psu: null,
	case: null,
	cooling: null
};

export const partsList = writable(partsListObj);
