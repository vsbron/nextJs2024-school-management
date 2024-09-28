import Image from "next/image";

import prisma from "@/lib/prisma";

import AttendanceChart from "./AttendanceChart";

async function AttendanceChartContainer() {
  // Getting the current date, day of week and days number since monday
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Creating a date for the start of the current week
  const lastMonday = new Date(today);
  // Set the correct date for last monday and reset the hours
  lastMonday.setDate(today.getDate() - daysSinceMonday);
  lastMonday.setHours(0, 0, 0, 0);

  //  Getting all the days within wanted week
  const responseData = await prisma.attendance.findMany({
    where: { date: { gte: lastMonday } },
    select: { date: true, present: true },
  });

  // Creating an array with all the weekdays labels
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Creating attendance map that we will fill with fetched data
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  // Assigning fetched data to the corresponding day in our attendanceMap object
  responseData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    // If the item date falls within working days
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Creating the correct day name index
      const dayName = daysOfWeek[dayOfWeek - 1];

      // Assigning to the map under present or absent category
      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  // Setting the data object for the chart
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  // Returned JSX
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <Image src="/moreDark.png" width={20} height={20} alt="More" />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
}

export default AttendanceChartContainer;
