import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">ویدیوهای آموزشی</h1>
        <p className="text-slate-600 text-sm">
          آرشیو جدیدترین ویدیوها و دوره‌های تصویری
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
          هنوز ویدیویی منتشر نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-gold/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
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
                <h2 className="text-xl font-bold text-navy mb-2 line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {video.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-gold">
                <span>مشاهده ویدیو</span>
                <span>←</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
