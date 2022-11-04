import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PartsLists } from '$db/collections';

export const POST: RequestHandler = async ({ request }) => {
	const { partsListId, partsList, user } = await request.json();
	await PartsLists.updateOne(
		{ partsListId, username: user.name },
		{
			$set: {
				partsListId,
				partsList,
				username: user.name
			}
		},
		{ upsert: true }
	);

	return new Response(JSON.stringify({ body: { message: 'hi' } }));
};
