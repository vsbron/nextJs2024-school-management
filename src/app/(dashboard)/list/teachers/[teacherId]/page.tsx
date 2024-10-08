import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { Teacher } from "@prisma/client";

import BigCalendarContainer from "@/components/BigCalendarContainer";
import PerformanceChart from "@/components/charts/PerformanceChart";
import InfoCard from "@/components/InfoCard";
import ShortcutLink from "@/components/ShortcutLink";

async function SingleTeacherPage({
  params: { teacherId },
}: {
  params: { teacherId: string };
}) {
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
          <InfoCard person={teacher} />
          {/* SMALL CARDS */}
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-xl flex gap-4">
              <Image
                src="/singleAttendance.png"
                className="w-10 h-10"
                width={40}
                height={40}
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
                className="w-10 h-10"
                width={40}
                height={40}
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
                className="w-10 h-10"
                width={40}
                height={40}
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
                className="w-10 h-10"
                width={40}
                height={40}
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
            <ShortcutLink href={`/list/classes?teacherId=${teacher.id}`}>
              Teacher&apos;s classes
            </ShortcutLink>
            <ShortcutLink href={`/list/students?teacherId=${teacher.id}`}>
              Teacher&apos;s students
            </ShortcutLink>
            <ShortcutLink href={`/list/lessons?teacherId=${teacher.id}`}>
              Teacher&apos;s lessons
            </ShortcutLink>
            <ShortcutLink href={`/list/lessons?teacherId=${teacher.id}`}>
              Teacher&apos;s exams
            </ShortcutLink>
            <ShortcutLink href={`/list/assignments?teacherId=${teacher.id}`}>
              Teacher&apos;s assignments
            </ShortcutLink>
            <ShortcutLink href={`/list/subjects?teacherId=${teacher.id}`}>
              Teacher&apos;s subjects
            </ShortcutLink>
          </div>
        </div>
        {/* PERFORMANCE */}
        <PerformanceChart />
      </div>
    </div>
  );
}

export default SingleTeacherPage;
