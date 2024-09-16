"use client";
import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

// Types for the state
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendar() {
  // Creating the state for the Calendar date
  const [date, setDate] = useState<Value>(new Date());

  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-xl">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}

export default EventCalendar;
