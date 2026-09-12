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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">
            فروشگاه آکادمی
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base">
            مجموعه کتاب‌های تخصصی فیزیکی و نسخه دیجیتال (PDF) جهت ارتقاء دانش تخصصی شما.
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-navy/50 border border-gold/10 rounded-2xl">
            <p className="text-cream/60">محصولی در حال حاضر یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-navy/80 border border-gold/20 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* Product Cover */}
                <div className="relative h-64 w-full bg-navy/90 overflow-hidden">
                  <Image
                    src={product.coverImage || '/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-navy/90 text-gold text-xs font-bold px-3 py-1 rounded-full border border-gold/30">
                    {product.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال (PDF)'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-lg font-bold text-cream hover:text-gold transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <p className="text-cream/70 text-sm line-clamp-2">{product.description}</p>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cream/60">قیمت:</span>
                      <div className="text-left">
                        {product.discountPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-cream/40 line-through">
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
                        className="flex-1 text-center py-2.5 rounded-xl border border-gold/40 text-gold hover:bg-gold hover:text-navy font-semibold text-sm transition-all"
                      >
                        جزئیات
                      </Link>
                      <AddToCartButton product={product} className="flex-1 text-xs py-2.5 px-3" />
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
