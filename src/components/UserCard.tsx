import Image from "next/image";

import { UserCardType } from "@/lib/types";
import prisma from "@/lib/prisma";

async function UserCard({ type }: { type: UserCardType }) {
  // Creating the map for fetching the correct table
  const modelMap: Record<typeof type, any> = {
    admins: prisma.admin,
    teachers: prisma.teacher,
    students: prisma.student,
    parents: prisma.parent,
  };

  // Getting the data from correct table
  const data = await modelMap[type].count();

  // Returned JSX
  return (
    <div className="rounded-2xl odd:bg-schoolPurple even:bg-schoolYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" width={20} height={20} alt="More" />
      </div>
      <h3 className="text-2xl font-semibold my-4">{data}</h3>
      <h4 className="capitalize text-sm font-medium text-gray-500">{type}</h4>
    </div>
  );
}

export default UserCard;
