import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { learningArticles } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const data = await learningArticles.find().toArray();
	if (data)
		return {
			learningArticles: JSON.parse(JSON.stringify(data))
		};

	throw error(500, 'server issue');
};
