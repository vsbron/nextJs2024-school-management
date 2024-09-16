function Announcements() {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <span className="text-xs text-gray-400 cursor-pointer">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-schoolSkyLight rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Lorem ipsum dolor sit</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            voluptatum velit autem nisi?
          </p>
        </div>
        <div className="bg-schoolPurpleLight rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Lorem ipsum dolor sit</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            voluptatum velit autem nisi?
          </p>
        </div>
        <div className="bg-schoolYellowLight rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Lorem ipsum dolor sit</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            voluptatum velit autem nisi?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
