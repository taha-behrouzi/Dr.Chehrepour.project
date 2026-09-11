"use client";

interface CustomVideoPlayerProps {
  videoUrl: string;
  isPremium: boolean;
  title: string;
}

export default function CustomVideoPlayer({
  videoUrl,
  isPremium,
  title,
}: CustomVideoPlayerProps) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-200/80 shadow-md">
        <video
          controls
          src={videoUrl}
          controlsList={isPremium ? "nodownload" : undefined}
          onContextMenu={isPremium ? (e) => e.preventDefault() : undefined}
          className="w-full rounded-lg shadow-lg aspect-video object-contain"
        >
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>
      </div>

      <div className="flex items-center justify-between pt-2">
        {isPremium ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-300 text-amber-800 text-xs font-medium">
            <svg
              className="w-4 h-4 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>محتوای ویژه: فقط پخش آنلاین (بدون قابلیت دانلود)</span>
          </div>
        ) : (
          <a
            href={videoUrl}
            download
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            دانلود ویدیو
          </a>
        )}
      </div>
    </div>
  );
}
