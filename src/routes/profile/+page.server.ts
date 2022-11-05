import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PartsLists, Users } from '$db/collections';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	// redirect user if not logged in
	if (!locals.user) throw redirect(302, '/');

	const user = await Users.findOne({ userAuthToken: cookies.get('session') });
	if (!user) throw error(500, 'Internal Server Error');

	const partsLists = await PartsLists.find({ username: user.username }).toArray();

	if (partsLists)
		return {
			partsLists: JSON.parse(JSON.stringify(partsLists))
		};

	throw error(500, 'That product does not exist');
};
