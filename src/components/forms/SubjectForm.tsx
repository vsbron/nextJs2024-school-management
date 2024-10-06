"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSubject, updateSubject } from "@/lib/actions";
import { SubjectInputs, subjectSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function SubjectForm({
  setOpen,
  type,
  data,
  relatedData,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>({ resolver: zodResolver(subjectSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    { success: false, error: false }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
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
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Getting the teachers from the related data object
  const { teachers } = relatedData;

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
        {data && (
          <InputField
            label="ID"
            name="id"
            register={register}
            defaultValue={data?.id}
            error={errors?.id}
            hidden
          />
        )}

        {/* Select field for the Teachers */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            {...register("teachers")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name[0]}. {teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers?.message.toString()}
            </p>
          )}
        </div>
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
