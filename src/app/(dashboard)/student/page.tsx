import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { SearchParamsType } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

async function StudentPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  // Getting the user ID
  const { userId } = auth();

  // Fetching the class ID using user ID
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  // Returned JSX
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Schedule (4a)</h2>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <AnnouncementsContainer />
      </div>
    </div>
  );
}

export default StudentPage;
