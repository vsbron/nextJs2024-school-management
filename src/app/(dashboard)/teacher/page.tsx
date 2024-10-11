import { auth } from "@clerk/nextjs/server";

import { SearchParamsProp } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { HomePageLeft, HomePageRight } from "@/components/HomePageLayout";
import prisma from "@/lib/prisma";

async function TeacherPage({ searchParams }: SearchParamsProp) {
  // Getting the user ID
  const { userId } = auth();

  // Fetching the class ID using user ID
  const teacherId = await prisma.teacher.findMany({
    where: { id: userId! },
  });

  // Returned JSX
  return (
    <>
      <HomePageLeft>
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">
            Schedule ({teacherId[0].name} {teacherId[0].surname})
          </h2>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </HomePageLeft>

      <HomePageRight>
        <EventCalendarContainer searchParams={searchParams} />
        <AnnouncementsContainer />
      </HomePageRight>
    </>
  );
}

export default TeacherPage;
