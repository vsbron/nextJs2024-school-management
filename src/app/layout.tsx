import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";

import { Open_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import BackspaceHandler from "@/components/BackspaceHandler";

// Importing font
const openSans = Open_Sans({ subsets: ["latin"] });

// Meta data for the page
export const metadata: Metadata = {
  title: "Management Dashboard",
  description: "Next.js School Management System",
  icons: {
    icon: "/site-favicon.ico",
    shortcut: "/site-favicon.png",
    apple: "/site-apple-touch-icon.png",
  },
  manifest: "/manifest.json", // Include the manifest file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={openSans.className}>
          {children}
          <BackspaceHandler />
          <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
