import { auth } from "@clerk/nextjs/server";

// Getting the role and the ID of the logged in user
const { userId, sessionClaims } = auth();
export const role = (sessionClaims?.metadata as { role?: string })?.role;
export const currentUserId = userId;
