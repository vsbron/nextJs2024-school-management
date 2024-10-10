import prisma from "@/lib/prisma";
import { BigCalendarContainerProps } from "@/lib/types";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

import BigCalendar from "./BigCalendar";

async function BigCalendarContainer({ type, id }: BigCalendarContainerProps) {
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
