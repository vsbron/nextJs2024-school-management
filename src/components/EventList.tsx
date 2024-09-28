import prisma from "@/lib/prisma";

async function EventList({ dateParam }: { dateParam: string | undefined }) {
  // Creating the date bases on the passed date parameter
  const date = dateParam ? new Date(dateParam) : new Date();

  // Fetching the data for the calculated day
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  // Display "No events" message if there's no data
  if (data.length === 0)
    return (
      <div>
        No events for{" "}
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    );

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-color-gray-100 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-600">{event.title}</h3>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
}

export default EventList;
