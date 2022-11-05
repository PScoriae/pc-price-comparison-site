import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PartsLists } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const savedPartsList = await PartsLists.findOne({ partsListId: params.partsListId });
	if (!savedPartsList) throw redirect(300, '/configurator');

	return {
		partsList: JSON.parse(JSON.stringify(savedPartsList))
	};
};
