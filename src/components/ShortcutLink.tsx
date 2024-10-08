import Link from "next/link";

import { randomColor } from "@/lib/utils";

function ShortcutLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className={`p-2 rounded-md bg-school${randomColor()}Light`}
    >
      {children}
    </Link>
  );
}

export default ShortcutLink;
