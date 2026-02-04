import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "نيزك - سوق السيارات في ليبيا",
  description: "أكبر سوق للسيارات الجديدة والمستعملة في ليبيا. ابحث عن سيارتك المثالية الآن.",
  keywords: ["سيارات", "ليبيا", "بيع سيارات", "شراء سيارات", "سيارات مستعملة", "سيارات جديدة"],
  openGraph: {
    title: "نيزك - سوق السيارات في ليبيا",
    description: "أكبر سوق للسيارات الجديدة والمستعملة في ليبيا",
    locale: "ar_LY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
