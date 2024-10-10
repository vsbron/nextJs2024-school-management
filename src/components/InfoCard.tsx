import Link from "next/link";

import prisma from "@/lib/prisma";
import { InfoCardTypes } from "@/lib/types";

async function InfoCard({ type }: InfoCardTypes) {
  // Creating the map for fetching the correct table
  const modelMap: Record<typeof type, any> = {
    admins: prisma.admin,
    teachers: prisma.teacher,
    students: prisma.student,
    parents: prisma.parent,
  };

  const needLink = type === "admins" ? false : true;

  // Getting the data from correct table
  const data = await modelMap[type].count();

  // Returned JSX
  return (
    <div
      className={`rounded-2xl odd:bg-schoolSky even:bg-schoolOrange p-3 xs:p-4 flex-1 min-w-[130px]`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-semibold bg-white px-2 py-1 rounded-full text-schoolGreenDark">
          2024/25
        </span>
        <span className="text-xs text-gray-500">
          {needLink && <Link href={`/list/${type}`}>View All</Link>}
        </span>
      </div>
      <h3 className="text-2xl font-semibold my-1 xs:my-4">{data}</h3>
      <h4 className="capitalize text-sm font-medium text-gray-500">{type}</h4>
    </div>
  );
}

export default InfoCard;
