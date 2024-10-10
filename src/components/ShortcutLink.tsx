import Link from "next/link";

import { ShortcutLinkProps } from "@/lib/types";
import { randomColor } from "@/lib/utils";

function ShortcutLink({ href, children }: ShortcutLinkProps) {
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
