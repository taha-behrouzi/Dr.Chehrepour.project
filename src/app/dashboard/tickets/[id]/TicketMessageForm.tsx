"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TicketMessageFormProps {
  ticketId: string;
}

export default function TicketMessageForm({ ticketId }: TicketMessageFormProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "خطا در ارسال پاسخ");
      }

      setText("");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطای غیرمنتظره‌ای رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
      {error && (
        <div className="p-3 text-xs text-red-700 bg-red-100 dark:bg-red-950/50 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="پاسخ خود را بنویسید..."
        required
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow disabled:opacity-50 transition-colors"
        >
          {loading ? "در حال ارسال..." : "ارسال پاسخ"}
        </button>
      </div>
    </form>
  );
}
