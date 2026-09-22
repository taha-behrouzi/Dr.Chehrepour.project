export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B132B]">
      {/* Hero Section */}
      <section className="bg-navy text-cream py-20 px-6 sm:px-12 text-center shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-white">
            پروژه با موفقیت راه‌اندازی شد
          </h1>
          <p className="text-teal text-lg sm:text-xl max-w-2xl font-medium">
            پایه‌ریزی رابط کاربری وب‌سایت آموزشی و فروشگاهی با پالت رنگی فاخر و فونت وزیرمتن
          </p>
          <button className="mt-4 bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-md">
            شروع مسیر یادگیری
          </button>
        </div>
      </section>

      {/* Color Swatch Preview Section */}
      <section className="max-w-5xl mx-auto my-12 px-6 w-full">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          تست پالت رنگی اختصاصی
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Navy */}
          <div className="flex flex-col items-center p-6 bg-[#16223B] text-cream rounded-2xl shadow-md border border-slate-700/50">
            <span className="font-bold text-lg mb-1 text-white">Navy</span>
            <span className="text-xs text-teal dir-ltr font-mono">#0B132B</span>
          </div>

          {/* Teal */}
          <div className="flex flex-col items-center p-6 bg-teal text-navy rounded-2xl shadow-md">
            <span className="font-bold text-lg mb-1">Teal</span>
            <span className="text-xs text-navy/80 dir-ltr font-mono">#14B8A6</span>
          </div>

          {/* Cream */}
          <div className="flex flex-col items-center p-6 bg-cream text-slate-800 rounded-2xl shadow-md">
            <span className="font-bold text-lg mb-1">Cream</span>
            <span className="text-xs text-slate-500 dir-ltr font-mono font-bold">#FBF9F5</span>
          </div>

          {/* Gold */}
          <div className="flex flex-col items-center p-6 bg-gold text-navy rounded-2xl shadow-md">
            <span className="font-bold text-lg mb-1">Gold</span>
            <span className="text-xs text-navy/80 dir-ltr font-mono font-bold">#D4AF37</span>
          </div>
        </div>
      </section>
    </div>
  );
}
