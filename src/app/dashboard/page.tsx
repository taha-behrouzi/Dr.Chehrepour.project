import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userIdentifier =
    session?.user?.name ||
    (session?.user as { phone?: string })?.phone ||
    'کاربر عزیز';

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy border border-gold/30 rounded-2xl p-8 text-cream shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              خوش آمدید، <span className="text-gold">{userIdentifier}</span>
            </h1>
            <p className="text-cream/70 text-sm">
              به پنل کاربری خود خوش آمدید. از این بخش می‌توانید وضعیت حساب و اطلاعات خود را مشاهده کنید.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block px-4 py-2 bg-gold/20 border border-gold/40 text-gold rounded-xl text-xs font-semibold">
              حساب کاربری فعال
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active Courses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:border-gold/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">دوره‌های فعال</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-navy mb-1">0</div>
          <p className="text-xs text-slate-400">دوره‌های ثبت‌نام شده</p>
        </div>

        {/* Card 2: Wallet */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:border-gold/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">کیف پول</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-navy mb-1">۰ تومان</div>
          <p className="text-xs text-slate-400">موجودی کیف پول</p>
        </div>

        {/* Card 3: Messages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:border-gold/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">پیام‌ها</span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-navy mb-1">۰</div>
          <p className="text-xs text-slate-400">پیام‌های خوانده نشده</p>
        </div>
      </div>
    </div>
  );
}
