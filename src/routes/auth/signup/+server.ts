import * as cookie from 'cookie';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { users } from '$db/collections';
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const user = await users.findOne({ email: data.email });
	if (user) throw error(409, 'User with that email already exists');

	const cookieId = uuidv4();
	try {
		await users.insertOne({
			email: data.email,
			password: await argon2.hash(data.password),
			name: data.name,
			cookie: cookieId
		});
	} catch (e) {
		throw error(500, 'Internal server error');
	}

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
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
