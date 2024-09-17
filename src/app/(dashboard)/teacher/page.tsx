import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";

function TeacherPage() {
  // Returned JSX
  return (
    <div className=" flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}

export default TeacherPage;
