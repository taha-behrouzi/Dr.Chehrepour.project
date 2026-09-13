'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80 border-t border-gold/30 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-cream/10">
          
          {/* Section 1: About Doctor Chehrepour */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-gold font-semibold text-lg border-b border-gold/20 pb-2 inline-block">
              درباره دکتر چهره پور
            </h3>
            <p className="text-sm text-cream/70 leading-relaxed">
              پلتفرم تخصصی روانشناسی، مشاوره و توسعه فردی. همراه شما در مسیر آگاهی، رشد و آرامش روان.
            </p>
          </div>

          {/* Section 2: Contact & Hours */}
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

          {/* Section 3: Social Media */}
          <div className="space-y-4">
            <h3 className="text-gold font-semibold text-lg border-b border-gold/20 pb-2 inline-block">
              شبکه‌های اجتماعی
            </h3>
            <p className="text-xs text-cream/70 leading-relaxed">
              ما را در شبکه‌های اجتماعی دنبال کنید و از جدیدترین مطالب و آگاهی‌ها باخبر شوید.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام"
                className="w-10 h-10 rounded-xl bg-cream/10 hover:bg-gold hover:text-navy text-cream flex items-center justify-center transition-all duration-300 border border-cream/10 hover:border-gold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="w-10 h-10 rounded-xl bg-cream/10 hover:bg-gold hover:text-navy text-cream flex items-center justify-center transition-all duration-300 border border-cream/10 hover:border-gold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساپ"
                className="w-10 h-10 rounded-xl bg-cream/10 hover:bg-gold hover:text-navy text-cream flex items-center justify-center transition-all duration-300 border border-cream/10 hover:border-gold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* Aparat */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="آپارات"
                className="w-10 h-10 rounded-xl bg-cream/10 hover:bg-gold hover:text-navy text-cream flex items-center justify-center transition-all duration-300 border border-cream/10 hover:border-gold font-bold text-xs"
              >
                آپارات
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>
            تمامی حقوق برای سایت <span className="text-gold font-medium">دکتر چهره پور</span> محفوظ است.
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
