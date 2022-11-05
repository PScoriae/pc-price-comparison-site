import type { PageServerLoad } from './$types';
import ShortUniqueId from 'short-unique-id';

export const load: PageServerLoad = async () => {
	const uid = new ShortUniqueId({ length: 10 });
	return { partsListId: uid() };
};
