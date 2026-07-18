import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "★☆★ 대한신뢰은행 ★☆★ 인터넷뱅킹",
  description: "대한신뢰은행 인터넷뱅킹 - 연구용 데모 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
