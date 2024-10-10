import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { SingleTeacherPageProps } from "@/lib/types";
import { Teacher } from "@prisma/client";

import BigCalendarContainer from "@/components/BigCalendarContainer";
import PerformanceChart from "@/components/charts/PerformanceChart";
import UserCard from "@/components/UserCard";
import ShortcutLink from "@/components/ShortcutLink";
import SmallCard from "@/components/SmallCard";

async function SingleTeacherPage({
  params: { teacherId },
}: SingleTeacherPageProps) {
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
          <UserCard person={teacher} />
          {/* SMALL CARDS */}
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 justify-between flex-wrap">
            {/* CARD */}
            <SmallCard type="Attendance">
              <h3 className="text-xl font-semibold">90%</h3>
              <span className="text-sm text-gray-400">Attendance</span>
            </SmallCard>
            {/* CARD */}
            <SmallCard type="Branch">
              <h3 className="text-xl font-semibold">
                {teacher._count.subjects}
              </h3>
              <span className="text-sm text-gray-400">Branches</span>
            </SmallCard>
            {/* CARD */}
            <SmallCard type="Lesson">
              <h3 className="text-xl font-semibold">
                {teacher._count.lessons}
              </h3>
              <span className="text-sm text-gray-400">Lessons</span>
            </SmallCard>
            {/* CARD */}
            <SmallCard type="Class">
              <h3 className="text-xl font-semibold">
                {teacher._count.classes}
              </h3>
              <span className="text-sm text-gray-400">Classes</span>
            </SmallCard>
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
