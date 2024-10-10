import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { SearchParamsProp } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { HomePageLeft, HomePageRight } from "@/components/HomePageLayout";

async function ParentPage({ searchParams }: SearchParamsProp) {
  // Getting the user ID
  const { userId } = auth();

  // Fetching the class ID using user ID
  const classItem = await prisma.class.findMany({
    where: { students: { some: { parentId: userId! } } },
  });

  // Returned JSX
  return (
    <>
      <HomePageLeft>
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Schedule (John Doe)</h2>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </HomePageLeft>

      <HomePageRight>
        <EventCalendarContainer searchParams={searchParams} />
        <AnnouncementsContainer />
      </HomePageRight>
    </>
  );
}

export default ParentPage;
