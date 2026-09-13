'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'فروشگاه', href: '/products' },
    { name: 'مقالات', href: '/articles' },
    { name: 'پادکست‌ها', href: '/podcasts' },
    { name: 'ویدیوها', href: '/videos' },
    { name: 'دوره‌های آموزشی', href: '#' },
    { name: 'رزرو نوبت مشاوره', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md text-cream border-b border-gold/20 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Side: Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 py-1 shrink-0">
              <Image
                src="/logo.png"
                alt="دکتر حمید چهره پور"
                width={240}
                height={80}
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-cream/90 hover:text-gold transition-colors duration-200 relative py-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Left Side: Actions (Cart & Auth) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Cart Icon Button */}
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="p-2.5 text-cream hover:text-teal rounded-xl border border-cream/10 hover:border-teal/40 bg-navy/50 transition-all duration-200 relative group flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-navy text-[11px] font-extrabold rounded-full flex items-center justify-center border border-navy shadow-sm">
                  {totalItems.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>

            {/* Login / Register Button or User Info & Dashboard Link */}
            {status === 'loading' ? (
              <div className="w-28 h-10 bg-cream/10 animate-pulse rounded-xl" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-navy px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  داشبورد
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-2 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-navy px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-gold/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                ورود / ثبت‌نام
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Cart Button */}
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="p-2 text-cream hover:text-teal sm:hidden relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-navy text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {totalItems.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-cream hover:text-gold hover:bg-navy/80 focus:outline-none transition-colors"
              aria-label="منوی اصلی"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gold/10 bg-navy/98 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-cream/90 hover:text-gold hover:bg-white/5 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-cream/10 flex flex-col gap-3">
            {session?.user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-gold text-navy hover:bg-gold-hover py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  ورود به داشبورد
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full text-center border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  خروج از حساب
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center border border-gold text-gold hover:bg-gold hover:text-navy py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                ورود / ثبت‌نام
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
