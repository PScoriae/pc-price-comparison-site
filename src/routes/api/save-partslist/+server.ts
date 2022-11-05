import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PartsLists } from '$db/collections';

export const POST: RequestHandler = async ({ request }) => {
	const { partsListId, partsList, user, name } = await request.json();
	try {
		const res = await PartsLists.updateOne(
			{ partsListId, username: user.name },
			{
				$set: {
					partsListId,
					name,
					partsList,
					username: user.name
				}
			},
			{ upsert: true }
		);

		if (res) return json({ status: 200, body: { message: 'Successfully saved parts list!' } });
	} catch (e) {
		throw error(500, 'Something went wrong. Please try again.');
	}
	throw error(500, 'Something went wrong. Please try again.');
};
