"use server";
import prisma from "./prisma";

import { SubjectInputs } from "./formSchemas";

type CurrentStateType = { success: boolean; error: boolean };

// Server action for the Subject form
export const createSubject = async (
  currentState: CurrentStateType,
  data: SubjectInputs
) => {
  try {
    // Adding the new data to the database
    await prisma.subject.create({
      data: { name: data.name },
    });

    // Return success state
    return { success: true, error: false };
  } catch (e) {
    console.error(e);

    // Return error state
    return { success: false, error: true };
  }
};
