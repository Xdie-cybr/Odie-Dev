import { test, expect } from '@playwright/test';

test('production website dapat dibuka', async ({ page }) => {
    await page.goto('https://odie-dev.vercel.app');

    await expect(page).toHaveTitle(/Portfolio - Odie Syahputra/);

    const navbar = page.locator('.site-header');
    const hero = page.locator('#beranda');

    await expect(navbar).toBeVisible();
    await expect(hero).toBeVisible();
});
