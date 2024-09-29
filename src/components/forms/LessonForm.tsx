"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LessonInputs, lessonSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function LessonForm({ type, data }: { type: "create" | "update"; data?: any }) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonInputs>({ resolver: zodResolver(lessonSchema) });

  // Submit handler
  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Lesson
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject"
          register={register}
          name="subject"
          defaultValue={data?.subject}
          error={errors?.subject}
        />
        <InputField
          label="Class"
          register={register}
          name="class"
          defaultValue={data?.class}
          error={errors?.class}
        />
        <InputField
          label="Teacher"
          register={register}
          name="teacher"
          defaultValue={data?.teacher}
          error={errors?.teacher}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default LessonForm;
