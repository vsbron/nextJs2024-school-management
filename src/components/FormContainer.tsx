import { FormContainerProps } from "@/lib/types";

import FormModal from "./FormModal";
import prisma from "@/lib/prisma";

async function FormContainer<T>({
  table,
  type,
  data,
  id,
}: FormContainerProps<T>) {
  // Creating empty object for optional related data
  let relatedData = {};

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
        const teacherClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects, classes: teacherClasses };
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
