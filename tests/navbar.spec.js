import { test, expect } from '@playwright/test';

test('navbar dan brand tampil', async ({ page }) => {
    await page.goto('http://127.0.0.1:8000');

    const navbar = page.locator('.site-header');
    const brand = page.locator('.logo');

    await expect(navbar).toBeVisible();
    await expect(brand).toBeVisible();
});

test('navbar mobile mengikuti aktivitas scroll dan timeout hide', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://127.0.0.1:8000');

    const navbar = page.locator('.site-header');

    await expect(navbar).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 500);
    });

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(500);
    await expect(navbar).not.toHaveClass(/is-hidden/);

    await page.waitForTimeout(1000);
    await expect(navbar).not.toHaveClass(/is-hidden/);

    await page.waitForTimeout(700);
    await expect(navbar).toHaveClass(/is-hidden/);

    await page.evaluate(() => {
        window.scrollTo(0, 700);
    });

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(700);
    await expect(navbar).not.toHaveClass(/is-hidden/);

    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(navbar).not.toHaveClass(/is-hidden/);
});

test('navbar mobile tidak menyebabkan horizontal overflow', async ({ page }) => {
    const viewportWidths = [320, 360, 390, 430];

    for (const width of viewportWidths) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto('http://127.0.0.1:8000');

        const brand = page.locator('.logo');

        await expect(brand).toBeVisible();
        await expect(brand).toHaveCSS('white-space', 'nowrap');

        const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        expect(hasHorizontalOverflow).toBe(false);
    }
});

test('halaman tidak menghasilkan console error', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', message => {
        if (message.type() === 'error') {
            consoleErrors.push(message.text());
        }
    });

    await page.goto('http://127.0.0.1:8000');

    expect(consoleErrors).toEqual([]);
});
