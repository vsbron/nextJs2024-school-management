"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

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
  // Creating a state for the calendar view mode
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  // Change calendar view handler
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // Returned JSX
  return (
    // Calendar component
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "80vh" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
}

export default BigCalendar;
