import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { Teacher } from "@prisma/client";

import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import PerformanceChart from "@/components/PerformanceChart";

async function SingleTeacherPage({
  params: { teacherId },
}: {
  params: { teacherId: string };
}) {
  // Getting the role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Fetching the teacher data from database
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  // Guard clause
  if (!teacher) return notFound;

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
                src={teacher.img || "/noAvatar.png"}
                className="rounded-full object-cover"
                alt="Teacher name"
                width={144}
                height={144}
              />
            </div>
            <div className="basis-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
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
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/date.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>
                    {new Intl.DateTimeFormat("en-US").format(teacher.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/mail.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>{teacher.email}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/phone.png"
                    width={14}
                    height={14}
                    alt="Phone number"
                  />
                  <span>{teacher.phone}</span>
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
                <h3 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h3>
                <span className="text-sm text-gray-400">Branches</span>
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
                <h3 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h3>
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
                <h3 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h3>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h2>Teacher&apos;s schedule</h2>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Shortcuts</h2>
          <div className="flex gap-2 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/classes?teacherId=${"teacher12"}`}
              className="p-2 rounded-md bg-schoolSkyLight"
            >
              Teacher&apos;s classes
            </Link>
            <Link
              href={`/list/students?teacherId=${"teacher2"}`}
              className="p-2 rounded-md bg-schoolPurpleLight"
            >
              Teacher&apos;s students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher2"}`}
              className="p-2 rounded-md bg-schoolYellowLight"
            >
              Teacher&apos;s lessons
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher2"}`}
              className="p-2 rounded-md bg-pink-50"
            >
              Teacher&apos;s exams
            </Link>
            <Link
              href={`/list/assignments?teacherId=${"teacher2"}`}
              className="p-2 rounded-md bg-schoolSkyLight"
            >
              Teacher&apos;s assignments
            </Link>
            <Link
              href={`/list/subjects?teacherId=${"teacher2"}`}
              className="p-2 rounded-md bg-schoolPurpleLight"
            >
              Teacher&apos;s subjects
            </Link>
          </div>
        </div>
        {/* PERFORMANCE */}
        <PerformanceChart />
      </div>
    </div>
  );
}

export default SingleTeacherPage;
