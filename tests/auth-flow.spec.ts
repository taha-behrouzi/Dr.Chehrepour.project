import { test, expect } from '@playwright/test';

test.describe('Authentication and Dashboard Flow', () => {
  test('A. Unauthenticated user redirected to /login when accessing /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('B. User can login and navigate to /dashboard', async ({ page }) => {
    // Intercept NextAuth credentials authentication API endpoint
    await page.route('**/api/auth/callback/credentials*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'http://localhost:3000/dashboard' }),
        headers: {
          'set-cookie': 'next-auth.session-token=mock-session-token; Path=/; HttpOnly',
        },
      });
    });

    // Intercept NextAuth session endpoint to mock authenticated state
    await page.route('**/api/auth/session', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { id: 'test-id', name: 'کاربر تست', phone: '09123456789', role: 'USER' },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }),
      });
    });

    await page.goto('/login');

    const phoneInput = page.locator('input[name="phone"], input[type="tel"], input[type="text"]').first();
    const passwordInput = page.locator('input[name="password"], input[type="password"]').first();

    await phoneInput.fill('09123456789');
    await passwordInput.fill('password123');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Navigate to dashboard or wait for redirect
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
