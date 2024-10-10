import { auth } from "@clerk/nextjs/server";

import { SearchParamsProp } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { HomePageLeft, HomePageRight } from "@/components/HomePageLayout";

function TeacherPage({ searchParams }: SearchParamsProp) {
  // Getting the user ID
  const { userId } = auth();

  // Returned JSX
  return (
    <>
      <HomePageLeft>
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Schedule</h2>
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
