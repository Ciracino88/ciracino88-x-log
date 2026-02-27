import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 탭 상에 표시되는 택스트
export const metadata: Metadata = {
  title: "나누리",
  description: "나누리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar/>
        <main style={{ paddingTop: "4rem" }}>
          {children}
          <div id="datepicker-portal" />
          <div id="preacher-portal" />
        </main>
      </body>
    </html>
  );
}
