"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useEffect } from "react";

function SignInPage() {
  // Getting the user info from Clerk
  const { user } = useUser();
  // const { isLoaded, isSignedIn, user } = useUser();

  // Getting the router object
  const router = useRouter();

  // useEffect function that redirects logged in user to the correct dashboard
  useEffect(() => {
    // Check the role of the user
    const role = user?.publicMetadata.role;

    // If role exists, push the user to the respective path
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-schoolSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image
                src="/logo.svg"
                width={24}
                height={24}
                alt="School Management logo"
              />
              School Management
            </h1>
            <h2 className="text-gray-400">Sign-In to your account</h2>
          </div>
          {/* Error message field */}
          <Clerk.GlobalError className="text-sm text-red-400" />
          {/* Username field */}
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              className="rounded-md p-2 ring-1 ring-gray-300"
              required
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          {/* Password field */}
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              className="rounded-md p-2 ring-1 ring-gray-300"
              required
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          {/* Submit button */}
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}

export default SignInPage;
