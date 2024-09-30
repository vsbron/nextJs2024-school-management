import prisma from "@/lib/prisma";

async function StudentAttendanceCard({ id }: { id: string }) {
  // Getting the attendance data
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: { gte: new Date(new Date().getFullYear(), 0, 1) },
    },
  });

  // Getting the total days, percentage days and calculating percentage
  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const percentage = (presentDays / totalDays) * 100;

  // Returned JSX
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold">{percentage || "-"}%</h3>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
}

export default StudentAttendanceCard;
