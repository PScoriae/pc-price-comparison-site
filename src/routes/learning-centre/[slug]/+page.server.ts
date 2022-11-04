import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { LearningArticles } from '$db/collections';

export const load: PageServerLoad = async ({ params }) => {
	const data = await LearningArticles.findOne({ slug: params.slug });
	if (data)
		return {
			article: JSON.parse(JSON.stringify(data))
		};

	throw error(500, 'server issue');
};
