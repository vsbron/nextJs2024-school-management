"use client";
import { useState } from "react";
import { addDays, subDays } from "date-fns";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";

import { BigCalendarType } from "@/lib/types";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Getting the localizer from Moment library
const localizer = momentLocalizer(moment);

function BigCalendar({ data }: BigCalendarType) {
  // Creating a state for the calendar view mode and current date
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Change calendar view handler
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
    setCurrentDate(new Date());
  };

  // Function to handle switching weeks and days
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setCurrentDate(subDays(currentDate, view === Views.DAY ? 1 : 7)); // Go back 1 day/week
    } else if (action === "NEXT") {
      setCurrentDate(addDays(currentDate, view === Views.DAY ? 1 : 7)); // Go forward 1 day/week
    } else {
      setCurrentDate(new Date()); // Reset to today
    }
  };

  // Returned JSX
  return (
    <div>
      {/* Week Switcher Buttons */}
      <div className="flex gap-2 justify-end mt-2 mb-2">
        <button
          className="bg-schoolGreenDark hover:bg-schoolGreen text-white px-1 py-0.5 text-sm rounded-md"
          onClick={() => handleNavigate("PREV")}
        >
          Previous {view === Views.DAY ? "Day" : "Week"}
        </button>
        <button
          className="bg-schoolGreenDark hover:bg-schoolGreen text-white px-1 py-0.5 text-sm rounded-md"
          onClick={() => handleNavigate("TODAY")}
        >
          {view === Views.DAY ? "Today" : "This Week"}
        </button>
        <button
          className="bg-schoolGreenDark hover:bg-schoolGreen text-white px-1 py-0.5 text-sm rounded-md"
          onClick={() => handleNavigate("NEXT")}
        >
          Next {view === Views.DAY ? "Day" : "Week"}
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
        style={{ height: "75vh" }}
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
