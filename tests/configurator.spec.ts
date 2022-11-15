import { test, expect } from '@playwright/test';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGO_URL ?? 'mongodb://localhost:4600/pc-comparison-site-dev';

test.beforeEach(async ({ page }) => {
	await page.reload();
	await page.goto('/configurator');
});

test.describe('configurator validation', () => {
	test('user should be able to add and remove products and button changes dynamically', async ({
		page
	}) => {
		// cpu row is empty
		await expect(page.locator('role=row[name="CPU Add Product"] >> div >> nth=0')).toBeEmpty();

		// add product button is visible
		await expect(
			page.locator('role=row[name="CPU Add Product"] >> role=link[name="Add Product"]')
		).toBeVisible();

		// remove product button is invisible
		await expect(page.locator('role=button[name="Remove"]')).not.toBeVisible();
		await page
			.getByRole('row', { name: 'CPU Add Product' })
			.getByRole('link', { name: 'Add Product' })
			.click();
		await expect(page).toHaveURL('/products/cpu');

		// add product from cpu page
		await page
			.getByRole('row', {
				name: 'Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor image Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor MYR 2,799.00 CY 2U Add Product'
			})
			.getByRole('button', { name: 'Add Product' })
			.click();
		await expect(page).toHaveURL('/configurator');

		// table row contains cpu
		await expect(
			page.locator(
				'role=link[name="Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor"]'
			)
		).toBeVisible();

		// add product is invisible
		await expect(
			page.locator('role=row[name="CPU Add Product"] >> role=link[name="Add Product"]')
		).not.toBeVisible();

		// remove product is visible
		await expect(page.locator('role=button[name="Remove"]')).toBeVisible();

		// press remove product button
		await page.getByRole('button', { name: 'Remove' }).click();

		// cpu row is empty
		await expect(page.locator('role=row[name="CPU Add Product"] >> div >> nth=0')).toBeEmpty();
	});

	test('user cannot save empty partslist', async ({ page }) => {
		// all rows are empty
		await expect(
			page.locator('role=row[name="CPU Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="Motherboard Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="Memory Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="GPU Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="PSU Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="Case Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();
		await expect(
			page.locator('role=row[name="Cooling Add Product"] >> role=cell >> nth=2')
		).toBeEmpty();

		// save parts list is invisible
		// add a product button is disabled
		await expect(page.getByRole('button', { name: 'Save Parts List' })).not.toBeVisible();
		await expect(
			page.locator(
				'body > div > div.min-h-screen > div.my-3.grid.grid-cols-3.grid-rows-3.place-items-center > div.col-start-3.row-start-2 > button'
			)
		).toBeDisabled();
	});

	test('logged out user should not be able to save', async ({ page }) => {
		// add a product button is disabled
		await expect(
			page.locator(
				'body > div > div.min-h-screen > div.my-3.grid.grid-cols-3.grid-rows-3.place-items-center > div.col-start-3.row-start-2 > button'
			)
		).toBeDisabled();

		// logout
		await page.goto('/profile');
		await page.getByRole('button', { name: 'log out' }).click();

		// add cpu product
		await page.goto('/products/cpu');
		await page
			.getByRole('row', {
				name: 'Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor image Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor MYR 2,799.00 CY 2U Add Product'
			})
			.getByRole('button', { name: 'Add Product' })
			.click();
		await expect(page).toHaveURL('/configurator');

		// save parts list is invisible
		await expect(page.getByRole('button', { name: 'Save Parts List' })).not.toBeVisible();

		// button is disabled
		await expect(
			page.locator(
				'body > div > div.min-h-screen > div.my-3.grid.grid-cols-3.grid-rows-3.place-items-center > div.col-start-3.row-start-2 > button'
			)
		).toBeDisabled();
	});
});

test.describe('configurator saving', () => {
	test.afterAll(async () => {
		const client = new MongoClient(url);
		await client.connect();
		client.db().collection('parts-lists').deleteMany({ username: 'test-account' });
	});

	test('logged in user should be able to save parts list and is viewable in profile', async ({
		page
	}) => {
		// save message doesn't show on load
		await expect(
			page.locator(
				'body > div > div.min-h-screen > div.my-3.grid.grid-cols-3.grid-rows-3.place-items-center > div.col-start-3.row-start-3'
			)
		).not.toBeVisible();

		// press add product button on cpu row
		await page
			.getByRole('row', { name: 'CPU Add Product' })
			.getByRole('link', { name: 'Add Product' })
			.click();
		await expect(page).toHaveURL('/products/cpu');

		// add cpu from products page
		await page
			.getByRole('row', {
				name: 'Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor image Intel Core i9-13900K 13th Gen Socket LGA1700 3.0GHz Up to 5.7GHz Desktop Processor MYR 2,799.00 CY 2U Add Product'
			})
			.getByRole('button', { name: 'Add Product' })
			.click();

		// redirection back to configurator
		await expect(page).toHaveURL('/configurator');

		// get partslist id
		const partsListUrl = await page.locator('#parts-list-id').textContent();
		const partsListId = partsListUrl!.split('/').pop();

		// name partslist and save to profile
		await page.getByPlaceholder('Type your parts list name here').click();
		await page.getByPlaceholder('Type your parts list name here').fill('test-partslist');
		await page.getByRole('button', { name: 'Save Parts List' }).click();

		// save message shows on save
		await expect(
			page.locator(
				'body > div > div.min-h-screen > div.my-3.grid.grid-cols-3.grid-rows-3.place-items-center > div.col-start-3.row-start-3'
			)
		).toBeVisible();

		// partslistid is visible in profile page
		await page.goto('/profile');
		await expect(page.locator(`role=cell[name="${partsListId}"]`)).toBeVisible();
	});
});
