import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';
import CommentsSection from '@/components/CommentsSection';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-navy min-h-screen text-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-hover transition-colors font-semibold"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          بازگشت به فهرست محصولات
        </Link>

        {/* Premium Product Details Hero Grid */}
        <div className="bg-navy/90 border border-gold/25 rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 shadow-2xl">
          {/* Product Cover Image Container */}
          <div className="relative h-80 sm:h-[420px] w-full bg-navy/95 rounded-2xl overflow-hidden border border-gold/20 shadow-xl group">
            <Image
              src={product.coverImage || '/placeholder.jpg'}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-md text-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-gold/30 shadow-lg">
              {product.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال (PDF)'}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-teal text-xs font-bold tracking-wider uppercase">
                  کد محصول: #{product.id.slice(-6)}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-cream leading-snug">
                  {product.title}
                </h1>
              </div>

              <div className="h-0.5 w-full bg-gradient-to-l from-gold/40 via-gold/10 to-transparent" />

              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gold">توضیحات محصول:</h2>
                <p className="text-cream/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Pricing and Add to Cart Section */}
            <div className="space-y-6 pt-6 border-t border-gold/15">
              <div className="flex items-center justify-between">
                <span className="text-cream/70 text-sm font-medium">موجودی و قیمت:</span>
                <div className="text-left">
                  {product.discountPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-cream/40 line-through font-semibold">
                        {product.price.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-gold">
                        {product.discountPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-extrabold text-gold">
                      {product.price.toLocaleString('fa-IR')} تومان
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-teal font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>موجود در انبار - آماده ارسال</span>
              </div>

              <AddToCartButton product={product} className="w-full text-base py-4 shadow-xl" />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection targetId={product.id} />
      </div>
    </div>
  );
}
