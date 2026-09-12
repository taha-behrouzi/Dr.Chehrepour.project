import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';

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
      <div className="max-w-5xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-hover mb-8 transition-colors"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          بازگشت به فروشگاه
        </Link>

        <div className="bg-navy/80 border border-gold/20 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-2xl">
          {/* Image */}
          <div className="relative h-80 md:h-[400px] w-full bg-navy/90 rounded-2xl overflow-hidden border border-gold/10">
            <Image
              src={product.coverImage || '/placeholder.jpg'}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30">
                {product.type === 'PHYSICAL_BOOK' ? 'کتاب فیزیکی' : 'کتاب دیجیتال (PDF)'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-cream leading-snug">
                {product.title}
              </h1>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-gold/10">
              <div className="flex items-center justify-between">
                <span className="text-cream/70 text-sm">موجودی و قیمت:</span>
                <div className="text-left">
                  {product.discountPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-cream/40 line-through">
                        {product.price.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-gold">
                        {product.discountPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl sm:text-2xl font-extrabold text-gold">
                      {product.price.toLocaleString('fa-IR')} تومان
                    </span>
                  )}
                </div>
              </div>

              <AddToCartButton product={product} className="w-full text-base py-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
