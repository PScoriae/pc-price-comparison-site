import { dbConnect } from '$db/mongo';
import { users } from '$db/collections';
import type { Handle } from '@sveltejs/kit';

try {
	await dbConnect();
	console.log('connected to mongodb');
} catch (e) {
	console.error(e);
}

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	// if there is no session load page as normal
	if (!session) return await resolve(event);

	// find the user based on the session
	const user = await users.findOne({ userAuthToken: session });

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			name: user.username
		};
	}

	// load page as normal
	return await resolve(event);
};
