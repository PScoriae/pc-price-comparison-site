import type { PageLoad } from './$types';
import ShortUniqueId from 'short-unique-id';

export const load: PageLoad = async () => {
	const uid = new ShortUniqueId({ length: 10 });
	return { partsListId: uid() };
};
