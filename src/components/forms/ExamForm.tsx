"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { formFormatDateTime } from "@/lib/utils";
import { createExam, updateExam } from "@/lib/actions";
import { ExamInputs, examSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";
import { Class, Subject } from "@prisma/client";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function ExamForm({ setOpen, type, data, relatedData }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamInputs>({ resolver: zodResolver(examSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
    { success: false, error: false, message: "" }
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
          `There was an error while ${
            type === "create" ? "creating" : "updating"
          } the exam. ${state.message}`
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
    <FormWrapper onSubmit={submitHandler}>
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Exam
      </h2>
      <FormTitle>Information</FormTitle>
      <InputFieldsWrapper>
        <InputField
          label="Title"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors?.title}
        />
        <InputField
          label="Start Time"
          register={register}
          name="startTime"
          defaultValue={data?.startTime && formFormatDateTime(data.startTime)}
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          register={register}
          name="endTime"
          defaultValue={data?.endTime && formFormatDateTime(data.endTime)}
          error={errors?.endTime}
          type="datetime-local"
        />
        {/* Select field for the Classes */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Lesson</label>
          <select
            {...register("lessonId")}
            className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
            defaultValue={data?.lessonId}
          >
            {lessons.map(
              (lesson: {
                id: string;
                name: string;
                subject: Subject;
                class: Class;
              }) => (
                <option value={lesson.id} key={lesson.id}>
                  {lesson.subject.name} ({lesson.class.name})
                </option>
              )
            )}
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
      </InputFieldsWrapper>

      {/* Error message */}
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}

      {/* Submit button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </FormWrapper>
  );
}

export default ExamForm;
