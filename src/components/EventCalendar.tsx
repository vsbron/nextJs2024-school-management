"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

// Types for the state
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendar() {
  // Creating the state for the Calendar date
  const [date, setDate] = useState<Value>(new Date());

  // Getting the router from the hook
  const router = useRouter();

  // Each time when the date updates we change the URL state
  useEffect(() => {
    if (date instanceof Date)
      router.push(
        `?date=${date.toLocaleDateString("en-US").replace(/\//g, ".")}`
      );
  }, [date, router]);

  // Returned JSX
  return <Calendar onChange={setDate} value={date} />;
}

export default EventCalendar;
