import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// Importing font
const openSans = Open_Sans({ subsets: ["latin"] });

// Meta data for the page
export const metadata: Metadata = {
  title: "Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
