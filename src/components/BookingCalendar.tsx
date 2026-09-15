'use client';

import { useState, useEffect, useMemo } from 'react';

export interface AppointmentSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'IN_PERSON' | 'ONLINE';
  price: number;
  status: 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'CANCELLED';
}

type ConsultationTypeFilter = 'ALL' | 'ONLINE' | 'IN_PERSON';

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
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [consultationTypeFilter, setConsultationTypeFilter] = useState<ConsultationTypeFilter>('ALL');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredByTypeSlots = useMemo(() => {
    if (consultationTypeFilter === 'ALL') return slots;
    return slots.filter((slot) => slot.type === consultationTypeFilter);
  }, [slots, consultationTypeFilter]);

  const availableDates = useMemo(() => {
    return Array.from(new Set(filteredByTypeSlots.map((s) => s.date)));
  }, [filteredByTypeSlots]);

  useEffect(() => {
    if (availableDates.length > 0) {
      if (!selectedDate || !availableDates.includes(selectedDate)) {
        setSelectedDate(availableDates[0]);
      }
    } else {
      setSelectedDate(null);
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [consultationTypeFilter, selectedDate]);

  const activeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return filteredByTypeSlots.filter((slot) => slot.date === selectedDate);
  }, [filteredByTypeSlots, selectedDate]);

  const getSlotCountForDate = (dateStr: string) => {
    return filteredByTypeSlots.filter((s) => s.date === dateStr).length;
  };

  const handleBookSlot = () => {
    if (!selectedSlot) return;
    alert(`نوبت شما برای ساعت ${selectedSlot.startTime} در تاریخ ${selectedSlot.date} با موفقیت انتخاب شد.`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 text-[#D4AF37] space-y-4" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <span className="font-semibold text-cream/90 text-sm sm:text-base">در حال دریافت و به‌روزرسانی تقویم نوبت‌دهی...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-2xl text-center max-w-2xl mx-auto backdrop-blur-md" dir="rtl">
        <p className="font-bold text-lg mb-2">خطا در بارگذاری اطلاعات</p>
        <p className="text-sm opacity-90">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 dir-rtl text-right font-sans pb-28" dir="rtl">
      {/* Visual Step Indicator Header */}
      <div className="bg-[#16223B] border border-[#D4AF37]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/80">
          <span className="font-extrabold text-[#D4AF37] text-sm sm:text-base">
            مراحل رزرو:
          </span>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center font-medium">
            <span className={consultationTypeFilter ? 'text-[#14B8A6] font-bold' : 'text-white/60'}>
              ۱. انتخاب نوع مشاوره
            </span>
            <span className="text-white/40">-</span>
            <span className={selectedDate ? 'text-[#14B8A6] font-bold' : 'text-white/60'}>
              ۲. انتخاب روز و ساعت
            </span>
            <span className="text-white/40">-</span>
            <span className={selectedSlot ? 'text-[#D4AF37] font-bold' : 'text-white/60'}>
              ۳. ثبت نوبت
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toggle Bar */}
      <div className="space-y-3">
        <label className="text-white text-base font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
          نوع مشاوره را انتخاب کنید:
        </label>
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#16223B] border border-[#D4AF37]/20 rounded-xl">
          <button
            onClick={() => setConsultationTypeFilter('ALL')}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
              consultationTypeFilter === 'ALL'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            همه نوبت‌ها
          </button>
          <button
            onClick={() => setConsultationTypeFilter('ONLINE')}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
              consultationTypeFilter === 'ONLINE'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            مشاوره آنلاین
          </button>
          <button
            onClick={() => setConsultationTypeFilter('IN_PERSON')}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
              consultationTypeFilter === 'IN_PERSON'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            مشاوره حضوری
          </button>
        </div>
      </div>

      {/* Date Selection */}
      {availableDates.length === 0 ? (
        <div className="bg-[#16223B] border border-[#D4AF37]/10 rounded-2xl p-8 text-center text-white/60">
          نوبت فعالی در حال حاضر وجود ندارد.
        </div>
      ) : (
        <div className="space-y-4">
          <label className="text-white text-base font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            تاریخ مورد نظر خود را انتخاب کنید:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableDates.map((dateStr) => {
              const { dayName, dayNum, monthName } = formatPersianDateDetails(dateStr);
              const isSelected = selectedDate === dateStr;
              const count = getSlotCountForDate(dateStr);

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-4 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#16223B] border-[#D4AF37]/10 text-white/80 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <span className="text-xs opacity-75">{dayName}</span>
                  <span className="text-xl font-extrabold">{dayNum}</span>
                  <span className="text-xs opacity-75">{monthName}</span>
                  <span className="text-[10px] mt-1 px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                    {count} نوبت
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Time Slots Selection */}
      {selectedDate && activeSlots.length > 0 && (
        <div className="space-y-4">
          <label className="text-white text-base font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            ساعت مورد نظر خود را انتخاب کنید:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activeSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3.5 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#16223B] border-[#D4AF37]/10 text-white/80 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <span className="text-sm font-bold">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="text-[10px] opacity-75">
                    {slot.type === 'ONLINE' ? 'آنلاین' : 'حضوری'}
                  </span>
                  <span className="text-xs font-semibold mt-1 text-[#D4AF37]">
                    {slot.price.toLocaleString('fa-IR')} تومان
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Action Button */}
      {selectedSlot && (
        <div className="bg-[#16223B] border border-[#D4AF37]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-right space-y-1">
            <p className="text-white/70 text-xs">نوبت انتخاب شده:</p>
            <p className="text-white font-bold text-sm sm:text-base">
              {formatPersianDateDetails(selectedSlot.date).dayName}{' '}
              {formatPersianDateDetails(selectedSlot.date).dayNum}{' '}
              {formatPersianDateDetails(selectedSlot.date).monthName} - ساعت{' '}
              {selectedSlot.startTime} ({selectedSlot.type === 'ONLINE' ? 'آنلاین' : 'حضوری'})
            </p>
          </div>
          <button
            onClick={handleBookSlot}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#bfa032] text-[#0B132B] font-extrabold rounded-xl transition-all duration-200 shadow-lg shadow-[#D4AF37]/10"
          >
            تایید و ثبت نوبت
          </button>
        </div>
      )}
    </div>
  );
}
