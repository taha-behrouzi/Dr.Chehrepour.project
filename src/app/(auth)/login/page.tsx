"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-cream flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-navy-light/40 backdrop-blur-md border border-gold/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-cream mb-2">ورود به حساب کاربری</h1>
          <p className="text-cream/70 text-sm">لطفا اطلاعات ورود خود را وارد کنید</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cream/90 mb-2">
              شماره موبایل
            </label>
            <input
              type="text"
              required
              placeholder="09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-navy-dark/60 border border-gold/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition duration-200 dir-ltr text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cream/90 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-navy-dark/60 border border-gold/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition duration-200 dir-ltr text-right"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-navy font-semibold rounded-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-gold/50 transition duration-200 disabled:opacity-50 shadow-lg shadow-gold/20"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-cream/70">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="text-gold hover:underline font-medium">
            ثبت‌نام کنید
          </Link>
        </div>
      </div>
    </div>
  );
}
