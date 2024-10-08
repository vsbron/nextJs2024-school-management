import Link from "next/link";

import prisma from "@/lib/prisma";

import CountChart from "./CountChart";

async function CountChartContainer() {
  // Getting the student data grouped to MALE and FEMALE
  const data = await prisma.student.groupBy({ by: ["sex"], _count: true });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  // Returned JSX
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Students</h2>
        <span className="text-xs text-gray-500">
          <Link href={`/list/students`}>View All</Link>
        </span>
      </div>

      {/* CHART */}
      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schoolSky rounded-full" />
          <h3 className="font-bold">{boys}</h3>
          <h4 className="text-xs text-gray-400">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schoolOrange rounded-full" />
          <h3 className="font-bold">{girls}</h3>
          <h4 className="text-xs text-gray-400">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h4>
        </div>
      </div>
    </div>
  );
}

export default CountChartContainer;
