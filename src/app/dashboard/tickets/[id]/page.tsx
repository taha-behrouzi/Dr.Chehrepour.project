import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TicketMessageForm from "./TicketMessageForm";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as { id?: string; role?: string };

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, phone: true },
      },
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: { id: true, name: true, role: true },
          },
        },
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  if (ticket.userId !== user.id && user.role !== "ADMIN") {
    redirect("/dashboard/tickets");
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <Link
            href="/dashboard/tickets"
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-2 inline-block"
          >
            &rarr; بازگشت به لیست تیکت‌ها
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {ticket.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {ticket.status}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {ticket.priority}
          </span>
        </div>
      </div>

      {/* Main Ticket Info / Description */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            فرستنده: {ticket.user.name || ticket.user.phone}
          </span>
          <time dateTime={ticket.createdAt.toISOString()}>
            {new Date(ticket.createdAt).toLocaleString("fa-IR")}
          </time>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
          {ticket.description}
        </div>
      </div>

      {/* Message Thread */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          پاسخ‌ها ({ticket.messages.length})
        </h2>

        {ticket.messages.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            هنوز پاسخی برای این تیکت ثبت نشده است.
          </p>
        ) : (
          <div className="space-y-3">
            {ticket.messages.map((msg) => {
              const isAdmin = msg.user.role === "ADMIN";
              return (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border shadow-sm ${
                    isAdmin
                      ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      {msg.user.name || "کاربر"}
                      {isAdmin && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-indigo-600 text-white rounded font-normal">
                          پشتیبان
                        </span>
                      )}
                    </span>
                    <time dateTime={msg.createdAt.toISOString()}>
                      {new Date(msg.createdAt).toLocaleString("fa-IR")}
                    </time>
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Form to submit reply */}
        <TicketMessageForm ticketId={ticket.id} />
      </div>
    </div>
  );
}
