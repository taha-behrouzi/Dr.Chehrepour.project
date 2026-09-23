"use client";

import React, { useState } from "react";

interface DiscountFormProps {
  onApplySuccess?: (percent: number) => void;
}

export default function DiscountForm({ onApplySuccess }: DiscountFormProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const applyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || "خطایی رخ داده است.");
      } else {
        setIsError(false);
        setMessage(`کد تخفیف با موفقیت اعمال شد (${data.percent}٪ تخفیف)`);
        if (onApplySuccess) {
          onApplySuccess(data.percent);
        }
      }
    } catch {
      setIsError(true);
      setMessage("خطا در برقراری ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm text-right" dir="rtl">
      <form onSubmit={applyDiscount} className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="کد تخفیف..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          className="flex-1 bg-[#16223B] border border-[#D4AF37]/30 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="bg-[#D4AF37] hover:bg-[#b8952b] text-[#0B132B] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 flex-shrink-0"
        >
          {loading ? "در حال بررسی..." : "اعمال کد"}
        </button>
      </form>

      {message && (
        <p
          className={`text-xs font-semibold mt-1 ${
            isError ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
