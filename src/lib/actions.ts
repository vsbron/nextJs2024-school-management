"use server";
import prisma from "./prisma";
import {
  ClassInputs,
  StudentInputs,
  SubjectInputs,
  TeacherInputs,
} from "./formSchemas";
import { clerkClient } from "@clerk/nextjs/server";

// Type for the current state
type CurrentStateType = { success: boolean; error: boolean };

/*** SUBJECTS ***/
// Server action for creating a new Subject
export const createSubject = async (
  currentState: CurrentStateType,
  data: SubjectInputs
) => {
  try {
    // Adding the new data to the database
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for updating existing Subject
export const updateSubject = async (
  currentState: CurrentStateType,
  data: SubjectInputs
) => {
  try {
    // Updating the data in the database
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for deleting a Subject
export const deleteSubject = async (
  currentState: CurrentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Deleting the data from the database
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};

/*** CLASSES ***/
// Server action for creating a new Class
export const createClass = async (
  currentState: CurrentStateType,
  data: ClassInputs
) => {
  try {
    await prisma.class.create({
      data,
    });
    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for updating existing Class
export const updateClass = async (
  currentState: CurrentStateType,
  data: ClassInputs
) => {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for deleting a Class
export const deleteClass = async (
  currentState: CurrentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Deleting the data from the database
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};

/*** TEACHERS ***/
// Server action for creating a new Teacher
export const createTeacher = async (
  currentState: CurrentStateType,
  data: TeacherInputs
) => {
  try {
    // Creating user at Clerk service
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true, message: e };
  }
};
// Server action for updating existing Teacher
export const updateTeacher = async (
  currentState: CurrentStateType,
  data: TeacherInputs
) => {
  // Guard clause
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for deleting a Teacher
export const deleteTeacher = async (
  currentState: CurrentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Deleting user from clerk
    await clerkClient.users.deleteUser(id);

    // Deleting the data from the database
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};

/*** STUDENTS ***/
// Server action for creating a new Student
export const createStudent = async (
  currentState: CurrentStateType,
  data: StudentInputs
) => {
  try {
    // Getting the class item to check its capacity
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });
    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }
    // Creating user at Clerk service
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true, message: e };
  }
};
// Server action for updating existing Student
export const updateStudent = async (
  currentState: CurrentStateType,
  data: StudentInputs
) => {
  // Guard clause
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.update({
      where: { id: data.id },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
// Server action for deleting a Student
export const deleteStudent = async (
  currentState: CurrentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Deleting user from clerk
    await clerkClient.users.deleteUser(id);

    // Deleting the data from the database
    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};

// Delete server actions placeholder for different forms
export const deleteParent = async () => ({ success: true, error: false });
export const deleteLesson = async () => ({ success: true, error: false });
export const deleteExam = async () => ({ success: true, error: false });
export const deleteAssignment = async () => ({ success: true, error: false });
export const deleteResult = async () => ({ success: true, error: false });
export const deleteAttendance = async () => ({ success: true, error: false });
export const deleteEvent = async () => ({ success: true, error: false });
export const deleteAnnouncement = async () => ({ success: true, error: false });

// TEMPLATE
// // Server action for creating a new Class
// export const createClass = async (
//   currentState: CurrentStateType,
//   data: ClassInputs
// ) => {
//   try {
//     await prisma.class.create({
//       data: {},
//     });
//     // Return success state
//     return { success: true, error: false };
//   } catch (e) {
//     console.error(e);

//     // Return error state
//     return { success: false, error: true };
//   }
// };
// // Server action for updating existing Class
// export const updateClass = async (
//   currentState: CurrentStateType,
//   data: ClassInputs
// ) => {
//   try {
//     await prisma.class.update({
//       where: { id: data.id },
//       data: {},
//     });
//     // Return success state
//     return { success: true, error: false };
//   } catch (e) {
//     console.error(e);

//     // Return error state
//     return { success: false, error: true };
//   }
// };
// // Server action for deleting a Class
// export const deleteClass = async (
//   currentState: CurrentStateType,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     // Deleting the data from the database
//     await prisma.class.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // Return success state
//     return { success: true, error: false };
//   } catch (e) {
//     console.error(e);

//     // Return error state
//     return { success: false, error: true };
//   }
// };
