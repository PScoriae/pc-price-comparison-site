import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import * as argon2 from 'argon2';
import { Users } from '$db/collections';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

const signup: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const user = await Users.findOne({ username });
	if (user) return invalid(400, { user: true });

	await Users.insertOne({
		username,
		password: await argon2.hash(password),
		userAuthToken: crypto.randomUUID()
	});

	throw redirect(303, '/login');
};

export const actions: Actions = { signup };
