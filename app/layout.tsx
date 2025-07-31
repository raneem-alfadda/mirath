import localFont from "next/font/local";
import "./globals.css";

const neoSans = localFont({
  src: "../public/fonts/NeoSansArabic.ttf",
  variable: "--font-neo",
});

export const metadata = {
  title: "ميراث",
  description: "منصة استشارية لتوزيع الإرث التجاري",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${neoSans.variable} font-neo`}>
        {children}
      </body>
    </html>
  );
}



