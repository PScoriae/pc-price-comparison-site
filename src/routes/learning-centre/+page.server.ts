import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { LearningArticles } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const data = await LearningArticles.find().toArray();
	if (data)
		return {
			learningArticles: JSON.parse(JSON.stringify(data))
		};

	throw error(500, 'server issue');
};
