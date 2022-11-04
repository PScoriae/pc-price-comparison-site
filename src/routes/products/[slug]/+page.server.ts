import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PcParts } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const data = await PcParts.find({ type: params.slug }).toArray();
	if (data) {
		return {
			pcParts: JSON.parse(JSON.stringify(data)),
			type: params.slug
		};
	}

	throw error(500, 'server issue');
};
