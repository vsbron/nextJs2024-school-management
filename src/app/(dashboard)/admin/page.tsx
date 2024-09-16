import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";

function AdminPage() {
  // Returned JSX
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="students" />
          <UserCard type="teachers" />
          <UserCard type="parents" />
          <UserCard type="staff" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:1/3 h-[450px]">
            <CountChart />
          </div>

          {/* ATTENDANCE CHART */}
          <div className="w-full lg:2/3 h-[450px]"></div>
        </div>

        {/* BOTTOM CHARTS */}
        <div className=""></div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3">Right</div>
    </div>
  );
}

export default AdminPage;
