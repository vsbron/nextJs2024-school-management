import { BigCalendarType } from "@/lib/types";

import BigCalendar from "./BigCalendar";
import prisma from "@/lib/prisma";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

async function BigCalendarContainer({ type, id }: BigCalendarType) {
  // Fetching the data bases on a type
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  // Formatting the data for the BigCalendar component
  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  // Get the updated schedule
  const schedule = adjustScheduleToCurrentWeek(data);

  // Returned JSX
  return <BigCalendar data={schedule} />;
}

export default BigCalendarContainer;
