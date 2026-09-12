import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { CartProvider } from "@/context/CartContext";
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
      <body className={`${vazirmatn.className} min-h-screen flex flex-col antialiased bg-navy text-cream`}>
        <Providers>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#0A192F",
                  color: "#F8F9FA",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "12px",
                  fontFamily: "inherit",
                  direction: "rtl",
                },
              }}
            />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
