"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createExam, updateExam } from "@/lib/actions";
import { ExamInputs, examSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function ExamForm({
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
  } = useForm<ExamInputs>({ resolver: zodResolver(examSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Exam has been successfully ${
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
          } the exam`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Getting the lessons from the related data object
  const { lessons } = relatedData;

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Exam
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors?.title}
        />
        <InputField
          label="Start Time"
          register={register}
          name="startTime"
          defaultValue={
            data?.startTime &&
            new Date(data.startTime).toISOString().slice(0, 16)
          }
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          register={register}
          name="endTime"
          defaultValue={
            data?.endTime && new Date(data.endTime).toISOString().slice(0, 16)
          }
          error={errors?.endTime}
          type="datetime-local"
        />
        {/* Select field for the Teachers */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            {...register("lessonId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.teachers}
          >
            {lessons.map((lesson: { id: string; name: string }) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId?.message.toString()}
            </p>
          )}
        </div>
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

export default ExamForm;
