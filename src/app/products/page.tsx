import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-navy min-h-screen text-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
            <span>✨ دسترسی به بروزترین منابع آموزشی</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gold tracking-tight leading-tight">
            فروشگاه کتاب و منابع دیجیتال
          </h1>
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
            مجموعه کامل کتاب‌های تخصصی، نسخه فیزیکی و PDF جهت ارتقاء دانش حرفه‌ای شما با بهترین کیفیت.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-navy/60 border border-gold/15 rounded-3xl space-y-3">
            <svg className="w-12 h-12 text-gold/40 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-cream/60 font-medium">محصولی در حال حاضر ثبت نشده است.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-navy/90 border border-gold/20 hover:border-gold/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold/10"
              >
                {/* Product Cover */}
                <div className="relative h-64 w-full bg-navy/95 overflow-hidden">
                  <Image
                    src={product.coverImage || '/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-md text-gold text-xs font-extrabold px-3 py-1.5 rounded-full border border-gold/30 shadow-md">
                    {product.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال (PDF)'}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-lg font-extrabold text-cream group-hover:text-gold transition-colors line-clamp-1 block"
                    >
                      {product.title}
                    </Link>
                    <p className="text-cream/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cream/60 font-medium">قیمت محصول:</span>
                      <div className="text-left">
                        {product.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-cream/40 line-through font-semibold">
                              {product.price.toLocaleString('fa-IR')}
                            </span>
                            <span className="text-base font-extrabold text-gold">
                              {product.discountPrice.toLocaleString('fa-IR')} تومان
                            </span>
                          </div>
                        ) : (
                          <span className="text-base font-extrabold text-gold">
                            {product.price.toLocaleString('fa-IR')} تومان
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-gold/40 text-gold hover:bg-gold hover:text-navy font-bold text-xs transition-all duration-300"
                      >
                        جزئیات
                      </Link>
                      <AddToCartButton product={product} className="flex-1 text-xs py-2.5 px-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
