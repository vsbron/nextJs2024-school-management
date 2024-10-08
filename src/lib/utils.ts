import { ErrorType } from "./types";

// Helper function that returns the first day of the work week
const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Setting the start of the week
  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  switch (dayOfWeek) {
    // Leaving this here in case I'll need to move all lessons to next week when data is loaded during weekend
    case 0:
      startOfWeek.setDate(today.getDate() + 1);
      break;
    case 6:
      startOfWeek.setDate(today.getDate() + 2);
      break;
    default:
      startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
  }

  // Setting the end of the week
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  // Getting the start and the end of the week from helper function
  const { startOfWeek } = currentWorkWeek();

  // Return the new lessons array with updated dates
  return lessons.map((lesson) => {
    // Get the current lesson date
    const lessonDayOfWeek = lesson.start.getDay();

    // Calculate the amount of days from monday
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    // Adjust start day for a current work week
    const adjustedStartDate = new Date(startOfWeek);
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getUTCHours(),
      lesson.start.getUTCMinutes(),
      lesson.start.getUTCSeconds()
    );

    // Adjust end day for a current work week
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getUTCHours(),
      lesson.end.getUTCMinutes(),
      lesson.end.getUTCSeconds()
    );

    // Return the lesson with updated dates
    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

// Helper function to get the correct suffix for number
export function getOrdinalSuffix(num: string) {
  const numInt = parseInt(num, 10); // Convert the string to a number

  let suffix = "th";
  if (numInt % 100 >= 11 && numInt % 100 <= 13) {
    suffix = "th";
  } else {
    switch (numInt % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
    }
  }
  return suffix;
}

// Helper functions that format date/time ignoring the timezones
export function formatDate(date: Date) {
  const stringDate = date.toISOString();
  const [datePart] = stringDate.split("T");
  const [year, month, day] = datePart.split("-");
  return `${month}/${day}/${year}`;
}
export function formatDateTime(date: Date) {
  const stringDate = date.toISOString();
  const [datePart, timePart] = stringDate.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");
  return `${month}/${day}/${year} ${hour}:${minute}`;
}
export function formFormatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function formFormatDateTime(date: Date) {
  return date.toISOString().slice(0, 16);
}
export function adjustToTimezone(date: Date) {
  return new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
}

// Helper function that returns random color name
export function randomColor() {
  // Array with color suffixes
  const colors = ["Sky", "Green", "Orange", "Purple", "Red"];

  // Randomly choose color index
  const chosenColorIndex = Math.floor(Math.random() * colors.length);

  // Return the color suffix
  return colors[chosenColorIndex];
}

// Helper function that is called in catch block when dealing with server actions
export const handleError = ({ e }: ErrorType): string => {
  console.error(e);

  // Getting the actual error message
  let errorMessage = "An unknown error occurred";

  // Check if the error is from Clerk or other service and has a specific structure
  if (e && typeof e === "object" && "errors" in e) {
    const errorArray = (e as { errors: { message: string }[] }).errors;

    if (errorArray.length > 0) {
      errorMessage = `${errorArray[0].message}`; // Use the first error message
    }
  } else {
    // Generic error handler
    errorMessage = `${handleError({ e })}`;
  }

  return errorMessage;
};
