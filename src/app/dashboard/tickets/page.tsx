import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as { id?: string }).id;

  const tickets = await prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "OPEN":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            تیکت باز (OPEN)
          </span>
        );
      case "CLOSED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            بسته شده (CLOSED)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            اولویت بالا
          </span>
        );
      case "LOW":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            اولویت پایین
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            اولویت متوسط
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            تیکت‌های پشتیبانی
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            لیست درخواست‌ها و تیکت‌های پشتیبانی شما
          </p>
        </div>
        <Link
          href="/dashboard/tickets/new"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition-colors"
        >
          ثبت تیکت جدید
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
            تیکتی یافت نشد
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            شما هنوز هیچ تیکت پشتیبانی ارسال نکرده‌اید.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/tickets/new"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition-colors"
            >
              ایجاد اولین تیکت
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/dashboard/tickets/${ticket.id}`}
              className="block p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {ticket.title}
                </h2>
                {getStatusBadge(ticket.status)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {ticket.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                {getPriorityBadge(ticket.priority)}
                <time dateTime={ticket.createdAt.toISOString()}>
                  {new Date(ticket.createdAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
