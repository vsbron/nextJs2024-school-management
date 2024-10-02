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
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
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
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: { ...(role === "teacher" ? { teacherId: userId! } : {}) },
          select: { id: true, name: true, class: true, subject: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: { ...(role === "teacher" ? { teacherId: userId! } : {}) },
          select: { id: true, name: true, class: true, subject: true },
        });
        relatedData = { lessons: assignmentLessons };
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
