import { invalid, redirect, error } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { users } from '$db/collections';
import * as argon2 from 'argon2';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	// if (locals.user) throw redirect(302, '/');
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const user = await users.findOne({ username });
	if (user) return invalid(400, { user: true });

	try {
		await users.insertOne({
			username,
			password: await argon2.hash(password),
			userAuthToken: crypto.randomUUID()
		});
	} catch (e) {
		throw error(500, 'Internal server error');
	}

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
