import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "وب‌سایت آموزشی | صفحه اصلی",
  description: "پلتفرم جامع آموزشی و فروشگاه آنلاین با طراحی فاخر و مدرن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
