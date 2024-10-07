import { auth } from "@clerk/nextjs/server";

import { SearchParamsType } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

function TeacherPage({ searchParams }: { searchParams: SearchParamsType }) {
  // Getting the user ID
  const { userId } = auth();

  // Returned JSX
  return (
    <div className=" flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      {/* RIGHT */}
      <aside className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <AnnouncementsContainer />
      </aside>
    </div>
  );
}

export default TeacherPage;
