import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returned JSX
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[12%] md:w-[8%] lg:w-[19%] xl:w-[15%] p-2 xs:p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.svg" alt="Logo" width={48} height={48} />
          <span className="hidden lg:block font-bold text-lg">SchoolMgmt</span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll flex flex-col">
        <Header />
        <main className="px-2 py-1 xs:p-4 flex gap-4 flex-col xl:flex-row">
          {children}
        </main>
      </div>
    </div>
  );
}
