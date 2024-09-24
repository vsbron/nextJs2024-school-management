import Link from "next/link";
import Image from "next/image";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import PerformanceChart from "@/components/PerformanceChart";

// Temp student data
const tempData = {
  id: 1,
  username: "janedoe",
  email: "janedoe@gmail.com",
  password: "password",
  firstName: "Jane",
  lastName: "Doe",
  grade: "5",
  cass: "1A",
  phone: "+1 234 567 89",
  address: "2345 Main St, Anycity, USA",
  bloodType: "B+",
  birthday: "2001-01-01",
  sex: "female",
  avatar:
    "https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a750d45d3eb7b8e754a48c_Jessie%20Meyton-p-500.jpg",
};

function SingleStudentPage() {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-schoolSky py-6 px-4 rounded-xl flex-1 flex flex-col xs:flex-row gap-4">
            <div className="basis-1/3">
              <Image
                src="https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a750d45d3eb7b8e754a48c_Jessie%20Meyton-p-500.jpg"
                className="rounded-full object-cover"
                alt="Student name"
                width={144}
                height={144}
              />
            </div>
            <div className="basis-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Jane Doe</h1>
                <FormModal table="student" type="update" data={tempData} />
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-y-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/blood.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/date.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/mail.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/phone.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>+1 234 5674</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-xl flex gap-4">
              <Image
                src="/singleAttendance.png"
                className="w-6 h-6"
                width={24}
                height={24}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">90%</h3>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-xl flex gap-4">
              <Image
                src="/singleBranch.png"
                className="w-6 h-6"
                width={24}
                height={24}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">6th</h3>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-xl flex gap-4">
              <Image
                src="/singleLesson.png"
                className="w-6 h-6"
                width={24}
                height={24}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">18</h3>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-xl flex gap-4">
              <Image
                src="/singleClass.png"
                className="w-6 h-6"
                width={24}
                height={24}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">6</h3>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h2>Student&apos;s schedule</h2>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Shortcuts</h2>
          <div className="flex gap-2 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/lessons?classId=${"2"}`}
              className="p-2 rounded-md bg-schoolYellowLight"
            >
              Student&apos;s lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${"2"}`}
              className="p-2 rounded-md bg-schoolPurpleLight"
            >
              Student&apos;s teachers
            </Link>
            <Link
              href={`/list/parents?parentId=${"parentId1"}`}
              className="p-2 rounded-md bg-pink-50"
            >
              Student&apos;s parents
            </Link>
            <Link href="" className="p-2 rounded-md bg-pink-50">
              Student&apos;s exams
            </Link>
            <Link href="" className="p-2 rounded-md bg-schoolSkyLight">
              Student&apos;s assignments
            </Link>
            <Link href="" className="p-2 rounded-md bg-schoolYellowLight">
              Student&apos;s results
            </Link>
          </div>
        </div>

        {/* PERFORMANCE */}
        <PerformanceChart />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
}

export default SingleStudentPage;
