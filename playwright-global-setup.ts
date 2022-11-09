import { chromium } from '@playwright/test';
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:4173/login');

	await page.getByPlaceholder('username').click();

	await page.getByPlaceholder('username').fill('test-account');

	await page.getByPlaceholder('password').click();

	await page.getByPlaceholder('password').fill('pass123');

	await page.getByRole('button', { name: 'Login' }).click();
	// Save signed-in state to 'storageState.json'.
	await page.context().storageState({ path: 'playwright-state.json' });
	await browser.close();
}

export default globalSetup;
