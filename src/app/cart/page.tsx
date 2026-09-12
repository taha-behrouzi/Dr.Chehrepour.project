'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-navy min-h-[75vh] text-cream py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-xl animate-pulse">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-navy border border-gold/40 flex items-center justify-center text-gold text-lg font-bold">
            !
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-cream mb-3">
          سبد خرید شما خالی است
        </h1>
        <p className="text-cream/70 mb-8 max-w-md text-sm leading-relaxed">
          هیچ محصول یا دوره‌ای در سبد خرید شما وجود ندارد. جهت مشاهده محصولات و دوره‌ها از فروشگاه دیدن فرمایید.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-gold/20 hover:scale-105 duration-300"
        >
          <span>بازگشت به فروشگاه</span>
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-navy min-h-screen text-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-gold/20 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gold tracking-tight">سبد خرید</h1>
            <p className="text-xs sm:text-sm text-cream/70 mt-1">مدیریت و تکمیل خرید محصولات انتخابی</p>
          </div>
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            پاک‌سازی سبد
          </button>
        </div>

        {/* 2 Columns: Order Summary Left, Items Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Right Column: Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.discountPrice ?? item.price;
              return (
                <div
                  key={item.id}
                  className="bg-navy/90 border border-gold/20 hover:border-gold/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 justify-between shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-navy/90 rounded-xl overflow-hidden border border-gold/20 shadow-inner">
                      <Image
                        src={item.coverImage || '/placeholder.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-bold text-cream hover:text-gold transition-colors text-base line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <span className="inline-block bg-gold/10 text-gold text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-gold/30">
                        {item.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال (PDF)'}
                      </span>
                      <p className="text-xs text-cream/70">
                        قیمت واحد: <span className="font-semibold text-gold">{itemPrice.toLocaleString('fa-IR')}</span> تومان
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gold/10">
                    <div className="flex items-center border border-gold/30 rounded-xl overflow-hidden bg-navy/90 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3.5 py-1.5 hover:bg-gold/20 text-gold font-bold text-base transition-colors"
                        aria-label="کاهش تعداد"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-sm font-extrabold text-cream min-w-[2.5rem] text-center">
                        {item.quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3.5 py-1.5 hover:bg-gold/20 text-gold font-bold text-base transition-colors"
                        aria-label="افزایش تعداد"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-cream/50 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      title="حذف آیتم"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Column: Order Summary */}
          <div className="bg-navy/90 border border-gold/30 rounded-2xl p-6 space-y-6 shadow-xl sticky top-28">
            <h2 className="text-xl font-extrabold text-gold border-b border-gold/15 pb-4 flex items-center justify-between">
              <span>خلاصه سفارش</span>
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-cream/80">
                <span>جمع کل اقلام:</span>
                <span className="font-bold text-cream">{totalPrice.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-cream/80">
                <span>مالیات و عوارض:</span>
                <span className="text-teal font-semibold">محاسبه در پرداخت</span>
              </div>
              <div className="flex justify-between text-cream/80">
                <span>هزینه ارسال:</span>
                <span className="text-teal font-semibold">رایگان</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/15 flex justify-between items-center text-base font-extrabold">
              <span className="text-cream">مبلغ قابل پرداخت:</span>
              <span className="text-gold text-xl">{totalPrice.toLocaleString('fa-IR')} تومان</span>
            </div>

            <button
              onClick={() => alert('امکان پرداخت به‌زودی فعال می‌شود.')}
              className="w-full py-4 bg-gold hover:bg-gold-hover text-navy font-extrabold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>تکمیل فرآیند خرید</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
