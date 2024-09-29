import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function Announcements() {
  // Getting the user ID and the Role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining the user roles for the fetch
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  // Fetching the appropriate data for the calculated day
  const data = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  // Guard clause
  if (data.length === 0) return <div>No announcements for this date</div>;

  // Returned JSX
  return data.map((announcement) => (
    <div className="bg-schoolSkyLight rounded-xl p-4" key={announcement.id}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{announcement.title}</h2>
        <span className="text-sm text-gray-400 bg-white rounded-md p-1">
          {new Intl.DateTimeFormat("en-US").format(announcement.date)}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
    </div>
  ));
}

export default Announcements;
