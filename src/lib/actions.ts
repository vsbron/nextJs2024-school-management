"use server";
import prisma from "./prisma";
import { ClassInputs, SubjectInputs } from "./formSchemas";

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

// Delete server actions placeholder for different forms
export const deleteTeacher = async () => ({ success: true, error: false });
export const deleteStudent = async () => ({ success: true, error: false });
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
