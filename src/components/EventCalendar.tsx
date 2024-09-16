"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

// Types for the state
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMP DATA
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

function EventCalendar() {
  // Creating the state for the Calendar date
  const [date, setDate] = useState<Value>(new Date());

  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-xl">
      <Calendar onChange={setDate} value={date} />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-4">Events</h2>
        <Image src="/moreDark.png" width={20} height={20} alt="More" />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-color-gray-100 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600">{event.title}</h2>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCalendar;
