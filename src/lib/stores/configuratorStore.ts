import { writable } from 'svelte/store';
import type { PartsList } from '$lib/types/types';

let partsListObj: PartsList = {
	cpu: null,
	motherboard: null,
	memory: null,
	gpu: null,
	storage: null,
	psu: null,
	case: null,
	cooling: null
};

let partsListIdStore: string | null = '';
let partsListNameStore: string | null = '';

export const partsList = writable(partsListObj);
export const partsListId = writable(partsListIdStore);
export const partsListName = writable(partsListNameStore);
