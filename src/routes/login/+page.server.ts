import { invalid, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';
import type { Action, Actions, PageServerLoad } from './$types';

import { users } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const user = await users.findOne({ username });

	if (!user) {
		return invalid(400, { credentials: true });
	}

	const userPassword = await argon2.verify(user.password, password);

	if (!userPassword) {
		return invalid(400, { credentials: true });
	}

	// generate new auth token just in case
	const authenticatedUser = await users.findOneAndUpdate(
		{ _id: new ObjectId(user._id) },
		{
			$set: {
				userAuthToken: crypto.randomUUID()
			}
		},
		{ returnDocument: 'after' }
	);

	cookies.set('session', authenticatedUser.value?.userAuthToken, {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		// secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30
	});

	// redirect the user
	throw redirect(302, '/');
};

export const actions: Actions = { login };
