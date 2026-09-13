'use client';

import { useState, useEffect } from 'react';

/**
 * Interface representing an Appointment Slot database object
 */
export interface AppointmentSlot {
  id: string;
  date: string; // ISO date string or formatted date YYYY-MM-DD
  startTime: string; // e.g. "10:00"
  endTime: string;   // e.g. "11:00"
  type: 'IN_PERSON' | 'ONLINE';
  price: number;
  status: 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'CANCELLED';
}

/**
 * Helper function to format ISO date or date string into Persian Date representation.
 */
function formatPersianDate(dateString: string) {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    // If invalid Date instance, fall back to string display
    return { dayName: '', dateDisplay: dateString };
  }
  const dayName = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(d);
  const dateDisplay = new Intl.DateTimeFormat('fa-IR', { month: 'long', day: 'numeric' }).format(d);
  return { dayName, dateDisplay };
}

export default function BookingCalendar() {
  // State management
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available slots on component mount
  useEffect(() => {
    async function fetchSlots() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/slots');
        if (!res.ok) {
          throw new Error('دریافت لیست نوبت‌ها با خطا مواجه شد.');
        }
        const data: AppointmentSlot[] = await res.json();
        setSlots(data);

        // Group dates and set default selected date if slots exist
        if (data.length > 0) {
          // extract unique normalized date strings
          const uniqueDates = Array.from(new Set(data.map((s) => s.date)));
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('خطایی رخ داده است.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlots();
  }, []);

  // Filter slots for the active date
  const filteredSlots = slots.filter((slot) => slot.date === selectedDate);

  // Group all available unique dates
  const availableDates = Array.from(new Set(slots.map((s) => s.date)));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16 text-gold">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <span className="mr-3 font-semibold text-cream">در حال بارگذاری نوبت‌ها...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl text-center">
        {error}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="bg-[#0B132B]/80 border border-[#D4AF37]/20 text-cream/80 p-8 rounded-2xl text-center">
        در حال حاضر هیچ نوبت فعالی برای رزرو وجود ندارد.
      </div>
    );
  }

  return (
    <div className="space-y-8 dir-rtl text-right" dir="rtl">
      {/* Date Selection Header & Horizontal Scroll Bar */}
      <div className="space-y-4">
        <h3 className="text-cream text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6]"></span>
          انتخاب تاریخ مشاوره
        </h3>

        {/* Scrollable Row for Dates */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {availableDates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            const { dayName, dateDisplay } = formatPersianDate(dateStr);

            return (
              <button
                key={dateStr}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setSelectedSlot(null); // Reset selection when date changes
                }}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-28 py-4 px-3 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-[#14B8A6] shadow-lg shadow-[#14B8A6]/10 scale-105'
                    : 'bg-[#0B132B]/90 border-[#D4AF37]/20 text-cream/80 hover:border-[#D4AF37]/50 hover:text-cream'
                }`}
              >
                <span className="text-xs font-medium opacity-80 mb-1">{dayName || 'تاریخ'}</span>
                <span className="text-sm font-extrabold">{dateDisplay || dateStr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="space-y-4 pt-4 border-t border-[#D4AF37]/10">
        <h3 className="text-cream text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
          انتخاب زمان و نوع مشاوره
        </h3>

        {filteredSlots.length === 0 ? (
          <p className="text-cream/50 text-sm py-4">نوبتی برای این تاریخ یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isOnline = slot.type === 'ONLINE';

              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-cream ring-2 ring-[#D4AF37]/40 shadow-xl'
                      : 'bg-[#0B132B]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:bg-[#0B132B]'
                  }`}
                >
                  {/* Slot Top Bar: Time and Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-cream font-bold text-base dir-ltr tracking-wider">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        isOnline
                          ? 'bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30'
                          : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                      }`}
                    >
                      {isOnline ? 'آنلاین' : 'حضوری'}
                    </span>
                  </div>

                  {/* Slot Bottom Bar: Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-cream/5">
                    <span className="text-xs text-cream/60">مبلغ مشاوره:</span>
                    <span className="text-sm font-bold text-[#D4AF37]">
                      {slot.price.toLocaleString('fa-IR')} <span className="text-xs text-cream/70 font-normal">تومان</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Drawer / CTA Button */}
      <div
        className={`transition-all duration-500 ease-in-out transform overflow-hidden ${
          selectedSlot
            ? 'opacity-100 max-h-40 translate-y-0 pt-6 border-t border-[#D4AF37]/20'
            : 'opacity-0 max-h-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#14B8A6]/10 border border-[#14B8A6]/30 p-4 sm:p-6 rounded-2xl">
          <div className="text-right">
            <p className="text-cream font-bold text-sm sm:text-base">
              نوبت انتخاب شده: {selectedSlot?.startTime} تا {selectedSlot?.endTime} ({selectedSlot?.type === 'ONLINE' ? 'آنلاین' : 'حضوری'})
            </p>
            <p className="text-xs text-cream/70 mt-1">
              مبلغ قابل پرداخت: {selectedSlot?.price.toLocaleString('fa-IR')} تومان
            </p>
          </div>

          <button
            onClick={() => {
              if (selectedSlot) {
                alert(`نوبت ${selectedSlot.startTime} انتخاب شد.`);
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c4a02e] text-[#0B132B] font-extrabold text-base rounded-xl shadow-lg transition-all duration-200 transform active:scale-95"
          >
            تایید و ادامه
          </button>
        </div>
      </div>
    </div>
  );
}
