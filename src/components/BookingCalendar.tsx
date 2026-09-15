'use client';

import { useState, useEffect, useMemo } from 'react';

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

type ConsultationTypeFilter = 'ALL' | 'ONLINE' | 'IN_PERSON';

/**
 * Helper function to format ISO date or date string into Persian Date representation.
 */
function formatPersianDateDetails(dateString: string) {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    return { dayName: '', dayNum: '', monthName: dateString };
  }
  const dayName = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(d);
  const dayNum = new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(d);
  const monthName = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(d);
  return { dayName, dayNum, monthName };
}

export default function BookingCalendar() {
  // State management
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [consultationTypeFilter, setConsultationTypeFilter] = useState<ConsultationTypeFilter>('ALL');
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('خطایی در ارتباط با سرور رخ داده است.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlots();
  }, []);

  // Filter slots based on type filter
  const filteredByTypeSlots = useMemo(() => {
    if (consultationTypeFilter === 'ALL') return slots;
    return slots.filter((slot) => slot.type === consultationTypeFilter);
  }, [slots, consultationTypeFilter]);

  // Extract available unique dates for current type filter
  const availableDates = useMemo(() => {
    return Array.from(new Set(filteredByTypeSlots.map((s) => s.date)));
  }, [filteredByTypeSlots]);

  // Set default selected date if current selection is invalid
  useEffect(() => {
    if (availableDates.length > 0) {
      if (!selectedDate || !availableDates.includes(selectedDate)) {
        setSelectedDate(availableDates[0]);
      }
    } else {
      setSelectedDate(null);
    }
  }, [availableDates, selectedDate]);

  // Reset selected slot when type filter or selected date changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [consultationTypeFilter, selectedDate]);

  // Filter slots for active date & type
  const activeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return filteredByTypeSlots.filter((slot) => slot.date === selectedDate);
  }, [filteredByTypeSlots, selectedDate]);

  // Count available slots per date
  const getSlotCountForDate = (dateStr: string) => {
    return filteredByTypeSlots.filter((s) => s.date === dateStr).length;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 text-[#D4AF37] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <span className="font-semibold text-cream/90 text-sm sm:text-base">در حال دریافت و به‌روزرسانی تقویم نوبت‌دهی...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl text-center max-w-2xl mx-auto backdrop-blur-md">
        <p className="font-bold text-lg mb-2">خطا در بارگذاری اطلاعات</p>
        <p className="text-sm opacity-90">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 dir-rtl text-right font-sans pb-24" dir="rtl">
      
      {/* Visual Step Indicator Banner */}
      <div className="bg-[#16223B]/80 border border-[#D4AF37]/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-cream/80">
          <span className="font-extrabold text-[#D4AF37] tracking-wide text-sm sm:text-base">
            مراحل رزرو آنلاین:
          </span>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center font-medium">
            <span className={`px-2.5 py-1 rounded-lg ${consultationTypeFilter ? 'text-[#14B8A6] font-bold bg-[#14B8A6]/10' : ''}`}>
              ۱. انتخاب نوع مشاوره
            </span>
            <span className="text-[#D4AF37]/50">➔</span>
            <span className={`px-2.5 py-1 rounded-lg ${selectedDate ? 'text-[#14B8A6] font-bold bg-[#14B8A6]/10' : ''}`}>
              ۲. انتخاب روز و ساعت
            </span>
            <span className="text-[#D4AF37]/50">➔</span>
            <span className={`px-2.5 py-1 rounded-lg ${selectedSlot ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10' : ''}`}>
              ۳. ثبت نوبت
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Control Filter Toggle Bar */}
      <div className="space-y-3">
        <label className="text-cream text-base font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/50"></span>
          نوع مشاوره را انتخاب کنید:
        </label>
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#16223B] border border-[#D4AF37]/20 rounded-2xl max-w-xl">
          <button
            type="button"
            onClick={() => setConsultationTypeFilter('ALL')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
              consultationTypeFilter === 'ALL'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                : 'text-cream/80 hover:text-cream hover:bg-[#0B132B]/50'
            }`}
          >
            همه نوبت‌ها
          </button>
          <button
            type="button"
            onClick={() => setConsultationTypeFilter('ONLINE')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
              consultationTypeFilter === 'ONLINE'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                : 'text-cream/80 hover:text-cream hover:bg-[#0B132B]/50'
            }`}
          >
            مشاوره آنلاین 💻
          </button>
          <button
            type="button"
            onClick={() => setConsultationTypeFilter('IN_PERSON')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
              consultationTypeFilter === 'IN_PERSON'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                : 'text-cream/80 hover:text-cream hover:bg-[#0B132B]/50'
            }`}
          >
            مشاوره حضوری 🏥
          </button>
        </div>
      </div>

      {/* Date Carousel & Slot Section or Global Empty State */}
      {availableDates.length === 0 ? (
        <div className="bg-[#16223B]/60 border border-[#D4AF37]/20 rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto shadow-2xl backdrop-blur-md my-8">
          <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
            🗓️
          </div>
          <h4 className="text-lg font-extrabold text-cream">
            در حال حاضر هیچ نوبت فعالی یافت نشد.
          </h4>
          <p className="text-sm text-cream/70 leading-relaxed">
            لطفاً فیلتر نوع مشاوره را تغییر دهید یا بعداً مجدداً تقویم نوبت‌دهی کلینیک را بررسی فرمایید.
          </p>
        </div>
      ) : (
        <>
          {/* Horizontal Date Selector Carousel */}
          <div className="space-y-3">
            <h3 className="text-cream text-base font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shadow-sm shadow-[#14B8A6]/50"></span>
              تاریخ مورد نظر را انتخاب کنید:
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
              {availableDates.map((dateStr) => {
                const isSelected = selectedDate === dateStr;
                const { dayName, dayNum, monthName } = formatPersianDateDetails(dateStr);
                const count = getSlotCountForDate(dateStr);

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex-shrink-0 flex flex-col items-center justify-between w-32 py-4 px-3 rounded-2xl border transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-[#14B8A6] shadow-xl shadow-[#14B8A6]/10 ring-2 ring-[#14B8A6]/40 scale-105'
                        : 'bg-[#16223B]/80 border-[#D4AF37]/20 text-cream/80 hover:border-[#D4AF37]/50 hover:bg-[#16223B]'
                    }`}
                  >
                    {/* Badge showing available slots */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold mb-2 ${
                        isSelected
                          ? 'bg-[#14B8A6] text-[#0B132B]'
                          : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      }`}
                    >
                      {count.toLocaleString('fa-IR')} نوبت
                    </span>

                    <span className="text-xs font-semibold opacity-80 mb-1">{dayName || 'روز'}</span>
                    <span className="text-2xl font-black my-0.5 tracking-tight">{dayNum || '-'}</span>
                    <span className="text-xs font-medium opacity-80">{monthName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Grid Section */}
          <div className="space-y-4 pt-4 border-t border-[#D4AF37]/15">
            <div className="flex items-center justify-between">
              <h3 className="text-cream text-base font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/50"></span>
                ساعت‌های موجود برای تاریخ انتخاب شده:
              </h3>
            </div>

            {activeSlots.length === 0 ? (
              <div className="bg-[#16223B]/40 border border-[#D4AF37]/10 rounded-2xl p-8 text-center space-y-2">
                <p className="text-cream font-bold text-base">
                  در این تاریخ یا با این نوع مشاوره، نوبت فعالی یافت نشد.
                </p>
                <p className="text-xs text-cream/60">
                  لطفاً تاریخ دیگری را بررسی کنید یا فیلتر نوع مشاوره را تغییر دهید.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const isOnline = slot.type === 'ONLINE';

                  return (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#D4AF37]/25 to-[#14B8A6]/10 border-[#D4AF37] text-cream ring-2 ring-[#D4AF37]/60 shadow-2xl scale-[1.02]'
                          : 'bg-[#16223B]/90 border-teal-500/20 hover:border-[#D4AF37]/50 hover:bg-[#16223B] hover:shadow-lg'
                      }`}
                    >
                      {/* Slot Header: Time Range & Type Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⏰</span>
                          <span className="text-cream font-black text-base dir-ltr tracking-wider">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            isOnline
                              ? 'bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/40'
                              : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                          }`}
                        >
                          {isOnline ? '💻 آنلاین' : '🏥 حضوری'}
                        </span>
                      </div>

                      {/* Slot Footer: Price Tag */}
                      <div className="flex items-center justify-between pt-3 border-t border-cream/10">
                        <span className="text-xs text-cream/70 font-medium">مبلغ مشاوره:</span>
                        <span className="text-base font-extrabold text-[#D4AF37]">
                          {slot.price.toLocaleString('fa-IR')}{' '}
                          <span className="text-xs text-cream/70 font-normal">تومان</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Sticky Confirmation Bottom Bar */}
      {selectedSlot && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-50 transition-all duration-300 animate-in slide-in-from-bottom-6">
          <div className="max-w-4xl mx-auto bg-[#0B132B]/95 border-2 border-[#D4AF37] p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right space-y-1 w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-wrap text-cream font-bold text-sm sm:text-base">
                <span className="text-[#14B8A6] font-black">نوبت انتخاب شده:</span>
                <span>{formatPersianDateDetails(selectedSlot.date).dayName} {formatPersianDateDetails(selectedSlot.date).dayNum} {formatPersianDateDetails(selectedSlot.date).monthName}</span>
                <span className="text-[#D4AF37]">|</span>
                <span>ساعت {selectedSlot.startTime} تا {selectedSlot.endTime}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#14B8A6]/20 text-[#14B8A6] font-semibold">
                  {selectedSlot.type === 'ONLINE' ? 'مشاوره آنلاین' : 'مشاوره حضوری'}
                </span>
              </div>
              <p className="text-xs text-cream/80">
                مبلغ قابل پرداخت:{' '}
                <strong className="text-[#D4AF37] text-sm">
                  {selectedSlot.price.toLocaleString('fa-IR')}
                </strong>{' '}
                تومان
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                alert(`نوبت ${selectedSlot.startTime} با موفقیت تایید شد.`);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#14B8A6] hover:bg-[#0d9488] text-[#0B132B] font-black text-sm sm:text-base rounded-xl shadow-xl hover:shadow-[#14B8A6]/30 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>تایید و تکمیل اطلاعات رزرو</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
