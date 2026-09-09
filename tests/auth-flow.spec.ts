import { test, expect } from '@playwright/test';

test.describe('Authentication and Dashboard Flow', () => {
  test('A. Unauthenticated user redirected to /login when accessing /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('B. User can login and navigate to /dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="phone"]', '09123456789');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
