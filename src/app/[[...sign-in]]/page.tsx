"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-schoolSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1>School Management</h1>
          <h2>Sign-In to your account</h2>
          {/* Error message field */}
          <Clerk.GlobalError />
          {/* Username field */}
          <Clerk.Field name="identifier">
            <Clerk.Label>Username</Clerk.Label>
            <Clerk.Input type="text" required />
            <Clerk.FieldError />
          </Clerk.Field>
          {/* Password field */}
          <Clerk.Field name="password">
            <Clerk.Label>Password</Clerk.Label>
            <Clerk.Input type="password" required />
            <Clerk.FieldError />
          </Clerk.Field>
          {/* Submit button */}
          <SignIn.Action submit>Sign In</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}

export default SignInPage;
