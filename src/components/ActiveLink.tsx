"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Special component that gets "active" class to a current link path
function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // Getting the pathname
  const pathname = usePathname();

  // Comparing the pathname to link's href
  const isActive = pathname === href;

  // Returned JSX
  return (
    <Link href={href} className={`${isActive ? "active-menu" : ""}`}>
      {children}
    </Link>
  );
}

export default ActiveLink;
