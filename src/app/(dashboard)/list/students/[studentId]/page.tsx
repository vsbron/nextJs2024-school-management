import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";

import BigCalendarContainer from "@/components/BigCalendarContainer";
import InfoCard from "@/components/InfoCard";
import PerformanceChart from "@/components/charts/PerformanceChart";
import ShortcutLink from "@/components/ShortcutLink";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import { getOrdinalSuffix } from "@/lib/utils";

async function SingleStudentPage({
  params: { studentId },
}: {
  params: { studentId: string };
}) {
  // Fetching the student data from database
  const student:
    | (Student & { class: Class & { _count: { lessons: number } } })
    | null = await prisma.student.findUnique({
    where: { id: studentId },
    include: { class: { include: { _count: { select: { lessons: true } } } } },
  });

  // Guard clause
  if (!student) return notFound;

  // Returned JSX
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <InfoCard person={student} />
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
              <Suspense fallback="Loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
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
                  {student.class.name.charAt(0)}
                  {getOrdinalSuffix(student.class.name.charAt(0))}
                </h3>
                <span className="text-sm text-gray-400">Grade</span>
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
                  {student.class._count.lessons}
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
                <h3 className="text-xl font-semibold">{student.class.name}</h3>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h2>Student&apos;s schedule</h2>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Shortcuts</h2>
          <div className="flex gap-2 flex-wrap text-xs text-gray-500">
            <ShortcutLink href={`/list/lessons?classId=${student.classId}`}>
              Student&apos;s lessons
            </ShortcutLink>
            <ShortcutLink href={`/list/teachers?classId=${student.classId}`}>
              Student&apos;s teachers
            </ShortcutLink>
            <ShortcutLink href={`/list/parents?parentId=${student.parentId}`}>
              Student&apos;s parents
            </ShortcutLink>
            <ShortcutLink href={`/list/exams?classId=${student.classId}`}>
              Student&apos;s exams
            </ShortcutLink>
            <ShortcutLink href={`/list/lessons?classId=${student.classId}`}>
              Student&apos;s assignments
            </ShortcutLink>
            <ShortcutLink href={`/list/results?studentId=${student.id}`}>
              Student&apos;s results
            </ShortcutLink>
            <ShortcutLink href={`/list/events?classId=${student.classId}`}>
              Student&apos;s events
            </ShortcutLink>
            <ShortcutLink
              href={`/list/announcements?classId=${student.classId}`}
            >
              Student&apos;s announcements
            </ShortcutLink>
            <ShortcutLink href={`/list/attendance?studentId=${student.id}`}>
              Student&apos;s attendance
            </ShortcutLink>
          </div>
        </div>

        {/* PERFORMANCE */}
        <PerformanceChart />
      </div>
    </div>
  );
}

export default SingleStudentPage;
