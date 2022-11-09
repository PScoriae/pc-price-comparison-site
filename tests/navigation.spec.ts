import { test, expect } from '@playwright/test';

test.describe('homepage nav when logged in', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('logo should go to homepage', async ({ page }) => {
		await page.getByRole('link', { name: 'logo PCPartsTool' }).click();
		await expect(page).toHaveURL('/');
	});

	test('pc configurator hero button should go to configurator ', async ({ page }) => {
		await page.getByRole('link', { name: 'PC Configurator' }).click();
		await expect(page).toHaveURL('/configurator');
	});

	test('products navbar button should go to products page', async ({ page }) => {
		await page.getByRole('link', { name: 'Products' }).click();
		await expect(page).toHaveURL('/products');
	});

	test('configurator navbar button should go to configurator page', async ({ page }) => {
		await page.getByRole('link', { name: 'Configurator' }).click();
		await expect(page).toHaveURL('/configurator');
	});

	test('learning centre button should go to learning centre page', async ({ page }) => {
		await page.getByRole('link', { name: 'Learning Centre' }).click();
		await expect(page).toHaveURL('/learning-centre');
	});

	test('profile button should go to profile page', async ({ page }) => {
		await page.getByRole('link', { name: 'Profile' }).click();
		await expect(page).toHaveURL('/profile');
	});
});

test.describe('homepage nav when logged out', () => {
	// log out
	test.beforeEach(async ({ page }) => {
		await page.goto('/profile');
		await page.getByRole('button', { name: 'log out' }).click();
	});

	test('logo should go to homepage', async ({ page }) => {
		await page.getByRole('link', { name: 'logo PCPartsTool' }).click();
		await expect(page).toHaveURL('/');
	});

	test('pc configurator hero button should go to configurator ', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'PC Configurator' }).click();
		await expect(page).toHaveURL('/configurator');
	});

	test('products navbar button should go to products page', async ({ page }) => {
		await page.getByRole('link', { name: 'Products' }).click();
		await expect(page).toHaveURL('/products');
	});

	test('configurator navbar button should go to configurator page', async ({ page }) => {
		await page.getByRole('link', { name: 'Configurator' }).click();
		await expect(page).toHaveURL('/configurator');
	});

	test('learning centre button should go to learning centre page', async ({ page }) => {
		await page.getByRole('link', { name: 'Learning Centre' }).click();
		await expect(page).toHaveURL('/learning-centre');
	});

	test('signup button should to to signup page', async ({ page }) => {
		await page.getByRole('link', { name: 'Sign Up' }).click();
		await expect(page).toHaveURL('/signup');
	});

	test('login button should go to login page', async ({ page }) => {
		await page.getByRole('link', { name: 'Login' }).click();
		await expect(page).toHaveURL('/login');
	});
});

test.describe('products nav', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/products');
	});

	test('product cpu button', async ({ page }) => {
		await page.getByRole('link', { name: 'CPU' }).click();
		await expect(page).toHaveURL('/products/cpu');
	});

	test('product motherboard button', async ({ page }) => {
		await page.getByRole('link', { name: 'Motherboard' }).click();
		await expect(page).toHaveURL('/products/motherboard');
	});

	test('product memory button', async ({ page }) => {
		await page.getByRole('link', { name: 'Memory' }).click();
		await expect(page).toHaveURL('/products/memory');
	});

	test('product gpu button', async ({ page }) => {
		await page.getByRole('link', { name: 'GPU' }).click();
		await expect(page).toHaveURL('/products/gpu');
	});

	test('product psu button', async ({ page }) => {
		await page.getByRole('link', { name: 'PSU' }).click();
		await expect(page).toHaveURL('/products/psu');
	});

	test('product case button', async ({ page }) => {
		await page.getByRole('link', { name: 'Case' }).click();
		await expect(page).toHaveURL('/products/case');
	});

	test('product cooling button', async ({ page }) => {
		await page.getByRole('link', { name: 'Cooling' }).click();
		await expect(page).toHaveURL('/products/cooling');
	});
});

test.describe('learning centre nav', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/learning-centre');
	});

	test('cpu article', async ({ page }) => {
		await page.locator('.card-actions > .btn').first().click();
		await expect(page).toHaveURL('/learning-centre/cpu');
	});

	test('memory article', async ({ page }) => {
		await page.locator('div:nth-child(2) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/memory');
	});

	test('motherboard article', async ({ page }) => {
		await page.locator('div:nth-child(3) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/motherboard');
	});

	test('gpu article', async ({ page }) => {
		await page.locator('div:nth-child(4) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/gpu');
	});

	test('storage article', async ({ page }) => {
		await page.locator('div:nth-child(5) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/storage');
	});

	test('psu article', async ({ page }) => {
		await page.locator('div:nth-child(6) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/psu');
	});

	test('case article', async ({ page }) => {
		await page.locator('div:nth-child(7) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/case');
	});

	test('cooling article', async ({ page }) => {
		await page.locator('div:nth-child(8) > .card-body > .card-actions > .btn').click();
		await expect(page).toHaveURL('/learning-centre/cooling');
	});
});

test.describe('configurator nav', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/configurator');
	});

	test('cpu', async ({ page }) => {
		await page.getByRole('link', { name: 'CPU' }).click();
		await expect(page).toHaveURL('/learning-centre/cpu');
	});

	test('motherboard', async ({ page }) => {
		await page.getByRole('link', { name: 'Motherboard' }).click();
		await expect(page).toHaveURL('/learning-centre/motherboard');
	});

	test('memory', async ({ page }) => {
		await page.getByRole('link', { name: 'Memory' }).click();
		await expect(page).toHaveURL('/learning-centre/memory');
	});

	test('gpu', async ({ page }) => {
		await page.getByRole('link', { name: 'GPU' }).click();
		await expect(page).toHaveURL('/learning-centre/gpu');
	});

	test('psu', async ({ page }) => {
		await page.getByRole('link', { name: 'PSU' }).click();
		await expect(page).toHaveURL('/learning-centre/psu');
	});

	test('case', async ({ page }) => {
		await page.getByRole('link', { name: 'Case' }).click();
		await expect(page).toHaveURL('/learning-centre/case');
	});

	test('cooling', async ({ page }) => {
		await page.getByRole('link', { name: 'Cooling' }).click();
		await expect(page).toHaveURL('/learning-centre/cooling');
	});
});
