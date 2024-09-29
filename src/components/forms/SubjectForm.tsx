"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSubject } from "@/lib/actions";
import { SubjectInputs, subjectSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function SubjectForm({
  setOpen,
  type,
  data,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
}) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>({ resolver: zodResolver(subjectSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(createSubject, {
    success: false,
    error: false,
  });

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success) {
      toast(
        `Subject has been successfully ${
          type === "create" ? "created" : "updated"
        }`
      );
      // Close the modal
      setOpen(false);

      // Refresh the page
      router.refresh();
    } else {
      toast(
        `There was some kind of error while ${
          type === "create" ? "creating" : "updating"
        } the subject`
      );
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((data) => {
    formAction(data);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      {/* Header */}
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Subject
      </h2>

      {/* Inputs */}
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
      </div>

      {/* Error message */}
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}

      {/* Submit button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default SubjectForm;
