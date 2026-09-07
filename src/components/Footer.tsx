'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80 border-t border-gold/30 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream/10">
          
          {/* Section 1: About / Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold to-teal flex items-center justify-center text-navy font-bold text-base shadow-md">
                آ
              </div>
              <span className="text-xl font-bold text-cream">
                آکادمی <span className="text-gold">لوکس</span>
              </span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              ارائه‌دهنده فاخرترین دوره‌های آموزشی تخصصی و خدمات مشاوره هوشمندانه. ما متعهد به ارتقای سطح دانش و دستیابی شما به عالی‌ترین درجات موفقیت هستیم.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold font-semibold text-lg border-b border-gold/20 pb-2 inline-block">
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-gold transition-colors duration-200">
                  دوره‌های اختصاصی
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gold transition-colors duration-200">
                  کتاب‌ها و محصولات دیجیتال
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gold transition-colors duration-200">
                  مقالات تخصصی و پادکست
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gold transition-colors duration-200">
                  درباره آکادمی
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-gold font-semibold text-lg border-b border-gold/20 pb-2 inline-block">
              ارتباط با ما
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal font-medium">نشانی:</span>
                <span className="text-cream/80">تهران، خیابان ولیعصر، مجتمع تجاری‌اداری لوکس</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal font-medium">تلفن پشتیبانی:</span>
                <span className="text-cream/80 dir-ltr font-mono">۰۲۱ - ۸۸۸۸ ۹۹۹۹</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal font-medium">ساعات کاری:</span>
                <span className="text-cream/80">شنبه تا چهارشنبه ۹ الی ۱۸</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Newsletter / Trust */}
          <div className="space-y-4">
            <h3 className="text-gold font-semibold text-lg border-b border-gold/20 pb-2 inline-block">
              خبرنامه VIP
            </h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              جهت دریافت آخرین اخبار، تخفیف‌های ویژه و مقالات تخصصی عضو خبرنامه شوید.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-hover text-navy font-semibold px-4 py-2 rounded-xl text-sm transition-colors duration-200 flex-shrink-0"
              >
                عضویت
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به <span className="text-gold font-medium">آکادمی لوکس</span> می‌باشد.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-cream transition-colors">
              حریم خصوصی
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="#" className="hover:text-cream transition-colors">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
