import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* آدرس اصلی پروژه شما */
    baseURL: 'http://localhost:3000',
    /* گرفتن عکس و ویدیو در صورت بروز خطا در تست */
    trace: 'on-first-retry',
  },

  /* تنظیم تست‌ها روی مرورگر Chrome موجود در ویندوز شما */
  projects: [
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome' // استفاده از مرورگر اصلی سیستم بدون نیاز به دانلود جداگانه
      },
    },
  ],

  /* اجرای خودکار سرور Next.js قبل از شروع تست‌ها (در صورت نیاز) */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});