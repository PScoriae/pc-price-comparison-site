import { test, expect } from '@playwright/test';
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 10 });

test.describe('login and signup tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Profile' }).click();
		await expect(page).toHaveURL('/profile');
		await page.getByRole('button', { name: 'log out' }).click();
		await expect(page).toHaveURL('/login');
		await page.getByRole('link', { name: 'logo PCPartsTool' }).click();
		await expect(page).toHaveURL('/');
	});
	test('should allow user to signup', async ({ page }) => {
		await page.goto('/signup');

		await page.getByPlaceholder('username').click();

		await page.getByPlaceholder('username').fill(`test-user${uid()}`);

		await page.getByPlaceholder('password').click();

		await page.getByPlaceholder('password').fill('test-user-pass');

		await page.getByRole('button', { name: 'Sign up' }).click();
		await expect(page).toHaveURL('/login');
	});

	test('should allow user to login', async ({ page }) => {
		await page.goto('/login');

		await page.getByPlaceholder('username').click();

		await page.getByPlaceholder('username').fill('test-user-signedin');

		await page.getByPlaceholder('password').click();

		await page.getByPlaceholder('password').fill('pass123');

		await page.getByRole('button', { name: 'Login' }).click();
		await expect(page).toHaveURL('');
	});
});
