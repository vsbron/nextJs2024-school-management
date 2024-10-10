import Image from "next/image";

import { SmallCardProps } from "@/lib/types";

function SmallCard({ type, children }: SmallCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl flex gap-4">
      <Image
        src={`/single${type}.svg`}
        className="w-12 h-12"
        width={48}
        height={48}
        alt=""
      />
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default SmallCard;
