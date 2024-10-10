"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ActiveLinkProps } from "@/lib/types";

// Special component that gets "active" class to a current link path
function ActiveLink({ href, children }: ActiveLinkProps) {
  // Getting the pathname
  const pathname = usePathname();

  // Comparing the pathname to link's href
  const isActive = pathname === href;

  // Returned JSX
  return (
    <Link
      href={href ? href : ""}
      className={`rounded-md hover:bg-schoolSkyLight  ${
        isActive ? "active-menu" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
