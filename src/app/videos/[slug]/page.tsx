import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await prisma.video.findUnique({
    where: { slug },
  });

  if (!video) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;
  const isLocked = video.isPremium && !isAuthenticated;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              video.isPremium
                ? "bg-amber-500/10 text-amber-700 border border-amber-300"
                : "bg-emerald-500/10 text-emerald-700 border border-emerald-300"
            }`}
          >
            {video.isPremium ? "ویژه VIP" : "رایگان"}
          </span>
          <time className="text-xs text-slate-400">
            {new Date(video.createdAt).toLocaleDateString("fa-IR")}
          </time>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-navy mb-4 leading-tight">
          {video.title}
        </h1>

        <p className="text-slate-600 leading-relaxed mb-8">{video.description}</p>

        {isLocked ? (
          <div className="bg-navy text-cream p-8 rounded-2xl border border-gold/30 shadow-2xl text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cream mb-2">محتوای مخصوص اعضا</h3>
            <p className="text-cream/70 text-sm mb-6">
              این ویدیو جزو محتوای ویژه است. برای تماشای ویدیو لطفا وارد حساب کاربری خود شوید.
            </p>
            <Link
              href="/login"
              className="inline-block w-full bg-gold hover:bg-gold-hover text-navy font-semibold py-3 px-6 rounded-xl transition-colors shadow-md"
            >
              ورود / ثبت‌نام
            </Link>
          </div>
        ) : (
          <div className="bg-black rounded-2xl overflow-hidden border border-slate-200">
            <video controls src={video.videoUrl} className="w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
