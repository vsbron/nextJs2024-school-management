"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLesson, updateLesson } from "@/lib/actions";
import { LessonInputs, lessonSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";
import { formFormatDateTime } from "@/lib/utils";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function LessonForm({ setOpen, type, data, relatedData }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonInputs>({ resolver: zodResolver(lessonSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Lesson has been successfully ${
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
          } the lesson. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Getting the lessons from the related data object
  const { subjects, classes, teachers } = relatedData;

  // Returned JSX
  return (
    <FormWrapper onSubmit={submitHandler}>
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Lesson
      </h2>
      <FormTitle>Information</FormTitle>
      <InputFieldsWrapper>
        <InputField
          label="Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        {/* Select field for the Subjects */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject</label>
          <select
            {...register("subjectId")}
            className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
            defaultValue={data?.subjectId}
          >
            {subjects.map((subject: { id: string; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId?.message.toString()}
            </p>
          )}
        </div>

        {/* Select field for the Classes */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            {...register("classId")}
            className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
            defaultValue={data?.classId}
          >
            {classes.map((classItem: { id: string; name: string }) => (
              <option value={classItem.id} key={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId?.message.toString()}
            </p>
          )}
        </div>

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

        {/* Select field for the Teachers */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teacher</label>
          <select
            {...register("teacherId")}
            className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
            defaultValue={data?.teacherId}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name[0]}. {teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId?.message.toString()}
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

export default LessonForm;
