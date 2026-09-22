import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CommentsSection from "@/components/CommentsSection";

export const revalidate = 0;

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;
  const isLocked = article.isPremium && !isAuthenticated;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              article.isPremium
                ? "bg-amber-500/10 text-amber-700 border border-amber-300"
                : "bg-emerald-500/10 text-emerald-700 border border-emerald-300"
            }`}
          >
            {article.isPremium ? "ویژه VIP" : "رایگان"}
          </span>
          <time className="text-xs text-slate-400">
            {new Date(article.createdAt).toLocaleDateString("fa-IR")}
          </time>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-navy mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="relative">
          <div
            className={`prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap ${
              isLocked ? "blur-sm select-none max-h-48 overflow-hidden" : ""
            }`}
          >
            {article.content}
          </div>

          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-xs rounded-xl p-6">
              <div className="bg-navy text-cream p-8 rounded-2xl border border-gold/30 shadow-2xl text-center max-w-md w-full">
                <div className="w-12 h-12 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cream mb-2">محتوای مخصوص اعضا</h3>
                <p className="text-cream/70 text-sm mb-6">
                  این مقاله جزو محتوای ویژه است. برای مطالعه کامل لطفا وارد حساب کاربری خود شوید.
                </p>
                <Link
                  href="/login"
                  className="inline-block w-full bg-gold hover:bg-gold-hover text-navy font-semibold py-3 px-6 rounded-xl transition-colors shadow-md"
                >
                  ورود / ثبت‌نام
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection targetId={article.id} />
    </div>
  );
}
