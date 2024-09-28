import Announcements from "./Announcements";

function AnnouncementsContainer() {
  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <span className="text-xs text-gray-400 cursor-pointer">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Announcements />
      </div>
    </div>
  );
}

export default AnnouncementsContainer;
