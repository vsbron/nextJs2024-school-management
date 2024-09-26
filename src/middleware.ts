import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { routeAccessMap } from "./lib/settings";

// Creating the object with all the routes and the roles that can access it
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

// Defining a middleware
export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) auth().protect();

  // Extracting the session claims (user's session data) from the auth object
  const { sessionClaims } = auth();

  // If user is not logged in, prevent infinite redirect by skipping the redirect if already on "/"
  if (!sessionClaims) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.next(); // Allow access to the homepage if already on "/"
    }
    // Redirect unauthenticated users to the home page or a login page
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login page or any other relevant page
  }

  // Extracting the user's role from session metadata
  const role = (sessionClaims?.metadata as { role?: string }).role;

  // Getting through the matchers
  for (const { matcher, allowedRoles } of matchers) {
    // If current role is not fitting the path's role - redirect user to main page
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
