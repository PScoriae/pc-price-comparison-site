import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pcParts } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const data = await pcParts.find({ type: params.slug }).toArray();
	if (data) {
		return {
			pcParts: JSON.parse(JSON.stringify(data)),
			type: params.slug
		};
	}

	throw error(500, 'server issue');
};
