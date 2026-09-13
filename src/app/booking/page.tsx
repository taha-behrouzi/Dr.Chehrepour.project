import BookingCalendar from '@/components/BookingCalendar';

export const metadata = {
  title: 'رزرو نوبت مشاوره | دکتر چهره‌پور',
  description: 'رزرو آنلاین و حضوری وقت مشاوره روانشناسی با دکتر چهره‌پور',
};

/**
 * Server Component page layout for appointment booking interface
 */
export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0B132B] text-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3 border-b border-[#D4AF37]/20 pb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-tight">
            رزرو نوبت مشاوره
          </h1>
          <p className="text-cream/80 text-sm sm:text-base max-w-xl mx-auto">
            زمان و نوع جلسه مشاوره (آنلاین یا حضوری) خود را مشخص کرده و نوبت خود را ثبت کنید.
          </p>
        </div>

        {/* Interactive Booking Calendar Component */}
        <div className="bg-[#0B132B]/60 border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <BookingCalendar />
        </div>

      </div>
    </main>
  );
}
