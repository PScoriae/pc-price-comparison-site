import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pcParts } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ params }) => {
	const data = await pcParts.findOne({ _id: new ObjectId(params.slug) });
	if (data)
		return {
			pcPart: JSON.parse(JSON.stringify(data))
		};

	throw error(500, 'That product does not exist');
};
