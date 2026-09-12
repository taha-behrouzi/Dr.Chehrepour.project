'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-navy min-h-screen text-cream py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-navy/80 border border-gold/30 flex items-center justify-center mb-6 text-gold">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-cream mb-2">سبد خرید شما خالی است</h1>
        <p className="text-cream/70 mb-8 max-w-md text-sm">
          شما هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید.
        </p>
        <Link
          href="/products"
          className="bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          مشاهده محصولات فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-navy min-h-screen text-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-gold/20 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gold">سبد خرید</h1>
          <button
            onClick={clearCart}
            className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            پاک‌سازی سبد خرید
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.discountPrice ?? item.price;
              return (
                <div
                  key={item.id}
                  className="bg-navy/80 border border-gold/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 justify-between shadow-md"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-navy/90 rounded-xl overflow-hidden border border-gold/10">
                      <Image
                        src={item.coverImage || '/placeholder.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-bold text-cream hover:text-gold transition-colors text-sm sm:text-base line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs text-gold/80 block">
                        {item.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال'}
                      </span>
                      <span className="text-xs text-cream/60 block">
                        قیمت واحد: {itemPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gold/10">
                    <div className="flex items-center border border-gold/30 rounded-xl overflow-hidden bg-navy/90">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gold/20 text-gold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-bold text-cream">
                        {item.quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gold/20 text-gold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 p-2 transition-colors"
                      title="حذف"
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

          {/* Checkout Summary */}
          <div className="bg-navy/80 border border-gold/20 rounded-2xl p-6 h-fit space-y-6 shadow-md">
            <h2 className="text-lg font-bold text-gold border-b border-gold/10 pb-4">
              خلاصه سفارش
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-cream/80">
                <span>مبلغ کل:</span>
                <span className="font-bold">{totalPrice.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-cream/80">
                <span>هزینه ارسال:</span>
                <span className="text-teal">رایگان</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/10 flex justify-between items-center text-base font-extrabold text-cream">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-gold text-lg">{totalPrice.toLocaleString('fa-IR')} تومان</span>
            </div>

            <button
              onClick={() => alert('امکان پرداخت به زودی فعال می‌شود.')}
              className="w-full py-3.5 bg-gold hover:bg-gold-hover text-navy font-bold rounded-xl transition-all shadow-md text-center"
            >
              تکمیل فرآیند خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
