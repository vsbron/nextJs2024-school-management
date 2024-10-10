import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { EventListProps } from "@/lib/types";

async function EventList({ dateParam }: EventListProps) {
  // Getting the user ID and the Role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining the user roles for the fetch
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  // Creating the date based on the passed date parameter
  const date = dateParam ? new Date(dateParam) : new Date();

  // Fetching the data for the calculated day and role-based conditions
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
      ...(role !== "admin" && {
        OR: [
          { classId: null }, // Events without specific class
          { class: roleConditions[role as keyof typeof roleConditions] || {} }, // Role-based conditions
        ],
      }),
    },
  });

  // Guard clause
  if (data.length === 0) return <div>No events for this date</div>;

  return data.map((event) => (
    <div
      className="px-4 py-2 xs:p-5 rounded-md border-2 border-color-gray-100 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-600">{event.title}</h3>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-1 xs:mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
}

export default EventList;
