import Link from "next/link";

import { SearchParamsProp } from "@/lib/types";

import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

async function EventCalendarContainer({ searchParams }: SearchParamsProp) {
  // Getting the date from search params
  const { date } = searchParams;

  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-xl">
      <EventCalendar />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-4">Events</h2>
        <span className="text-xs text-gray-500">
          <Link href={`/list/events`}>View All</Link>
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
}

export default EventCalendarContainer;
