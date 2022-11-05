import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PartsLists } from '$db/collections';

export const POST: RequestHandler = async ({ request }) => {
	const { partsListId } = await request.json();
	try {
		const res = await PartsLists.deleteOne({ partsListId });

		if (res) return json({ status: 200, body: { message: 'Successfully deleted parts list!' } });
	} catch (e) {
		throw error(500, 'Something went wrong. Please try again.');
	}
	throw error(500, 'Something went wrong. Please try again.');
};
