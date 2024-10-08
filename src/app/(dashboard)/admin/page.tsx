import { SearchParamsType } from "@/lib/types";

import AnnouncementsContainer from "@/components/AnnouncementsContainer";
import AttendanceChartContainer from "@/components/charts/AttendanceChartContainer";
import CountChartContainer from "@/components/charts/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/charts/FinanceChart";
import { HomePageLeft, HomePageRight } from "@/components/HomePageLayout";
import UserCard from "@/components/UserCard";

function AdminPage({ searchParams }: { searchParams: SearchParamsType }) {
  // Returned JSX
  return (
    <>
      <HomePageLeft>
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="students" />
          <UserCard type="teachers" />
          <UserCard type="parents" />
          <UserCard type="admins" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </HomePageLeft>

      <HomePageRight>
        <EventCalendarContainer searchParams={searchParams} />
        <AnnouncementsContainer />
      </HomePageRight>
    </>
  );
}

export default AdminPage;
