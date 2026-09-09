import { test, expect } from '@playwright/test';

test.describe('Authentication and Dashboard Flow', () => {
  test('1. Protected Route Guard (Unauthenticated User) redirects to /login', async ({ page }) => {
    // Navigate directly to the dashboard
    await page.goto('/dashboard');

    // Verify redirection to /login
    await expect(page).toHaveURL(/\/login/);
  });

  test('2. Authentication & Dashboard Access Flow', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Fill in phone and password credentials
    await page.fill('input[type="tel"], input[name="phone"]', '09123456789');
    await page.fill('input[type="password"], input[name="password"]', 'password123');

    // Click submit/login button
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify core dashboard elements are visible
    await expect(page.getByText('پیش‌خوان')).toBeVisible();
  });
});
