"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { addDays, subDays } from "date-fns";

// Getting the localizer from Moment library
const localizer = momentLocalizer(moment);

function BigCalendar({
  data,
}: {
  data: {
    title: string;
    start: Date;
    end: Date;
  }[];
}) {
  // Creating a state for the calendar view mode and current date
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Change calendar view handler
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // Function to handle switching weeks
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setCurrentDate(subDays(currentDate, 7)); // Go back 7 days
    } else if (action === "NEXT") {
      setCurrentDate(addDays(currentDate, 7)); // Go forward 7 days
    } else {
      setCurrentDate(new Date()); // Reset to today
    }
  };

  // Returned JSX
  return (
    <div>
      {/* Week Switcher Buttons */}
      <div className="flex gap-2 justify-end mb-2">
        <button
          className="bg-blue-400 text-white px-1 py-0.5 text-sm rounded-md"
          onClick={() => handleNavigate("PREV")}
        >
          Previous Week
        </button>
        <button
          className="bg-blue-400 text-white px-1 py-0.5  text-sm rounded-md"
          onClick={() => handleNavigate("TODAY")}
        >
          Today
        </button>
        <button
          className="bg-blue-400 text-white px-1 py-0.5  text-sm rounded-md"
          onClick={() => handleNavigate("NEXT")}
        >
          Next Week
        </button>
      </div>
      {/* Calendar component */}
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "79vh" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
      />
    </div>
  );
}

export default BigCalendar;
