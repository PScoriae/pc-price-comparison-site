import * as cookie from 'cookie';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { users } from '$db/collections';
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const user = await users.findOne({ email: data.email });
	if (!user || !(await argon2.verify(user.password, data.password)))
		throw error(401, 'Incorrect email or password');

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', user.cookie, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			path: '/'
		})
	};

	return json({
		status: 200,
		headers,
		body: {
			message: 'Success'
		}
	});
};
