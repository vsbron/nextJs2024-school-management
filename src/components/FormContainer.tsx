import { FormContainerProps } from "@/lib/types";

import FormModal from "./FormModal";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function FormContainer<T>({
  table,
  type,
  data,
  id,
}: FormContainerProps<T>) {
  // Creating empty object for optional related data
  let relatedData = {};

  // Getting the userId and the role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Execute only if the type is any other from Delete
  if (type !== "delete") {
    switch (table) {
      case "announcement":
        const announcementClasses = await prisma.class.findMany({
          where: { ...(role === "teacher" ? { supervisorId: userId! } : {}) },
          select: { id: true, name: true },
        });
        relatedData = { classes: announcementClasses };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: { ...(role === "teacher" ? { teacherId: userId! } : {}) },
          select: { id: true, name: true, class: true, subject: true },
        });
        relatedData = { lessons: assignmentLessons };
        break;
      case "attendance":
        const attendanceClasses = await prisma.class.findMany({
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        });
        const attendanceStudents = await prisma.student.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
            class: { select: { id: true } },
          },
          orderBy: { name: "asc" },
        });
        const attendanceLessons = await prisma.lesson.findMany({
          select: {
            id: true,
            startTime: true,
            subject: { select: { id: true, name: true } },
            class: { select: { id: true, name: true } },
          },
          orderBy: [
            { subject: { name: "asc" } },
            { class: { name: "asc" } },
            { startTime: "asc" },
          ],
        });
        relatedData = {
          students: attendanceStudents,
          lessons: attendanceLessons,
          classes: attendanceClasses,
        };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { grades: classGrades, teachers: classTeachers };
        break;
      case "event":
        const eventClasses = await prisma.class.findMany({
          where: { ...(role === "teacher" ? { supervisorId: userId! } : {}) },
          select: { id: true, name: true },
        });
        relatedData = { classes: eventClasses };
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: { ...(role === "teacher" ? { teacherId: userId! } : {}) },
          select: { id: true, name: true, class: true, subject: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "lesson":
        const lessonTeachers = await prisma.teacher.findMany({
          where: { ...(role === "teacher" ? { id: userId! } : {}) },
          select: { id: true, name: true, surname: true },
        });
        const lessonSubjects = await prisma.subject.findMany({
          where: {
            ...(role === "teacher"
              ? { lessons: { some: { teacherId: userId! } } }
              : {}),
          },
          select: { id: true, name: true },
        });
        const lessonClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = {
          subjects: lessonSubjects,
          classes: lessonClasses,
          teachers: lessonTeachers,
        };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
        break;
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
        relatedData = { lessons: examLessons };
        break;
    }
  }
  // Returned JSX
  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
}

export default FormContainer;
