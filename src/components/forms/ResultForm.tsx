"use client";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResultInputs, resultSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function ResultForm({
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
  } = useForm<ResultInputs>({ resolver: zodResolver(resultSchema) });

  // Submit handler
  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Result
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
          label="Student"
          register={register}
          name="student"
          defaultValue={data?.student}
          error={errors?.student}
        />
        <InputField
          label="Score"
          register={register}
          name="score"
          defaultValue={data?.score}
          error={errors?.score}
        />
        <InputField
          label="Teacher"
          register={register}
          name="teacher"
          defaultValue={data?.teacher}
          error={errors?.teacher}
        />
        <InputField
          label="Class"
          register={register}
          name="class"
          defaultValue={data?.class}
          error={errors?.class}
        />
        <InputField
          label="Date"
          register={register}
          name="date"
          defaultValue={data?.date}
          error={errors?.date}
        />
        <InputField
          label="Type"
          register={register}
          name="type"
          defaultValue={data?.type}
          error={errors?.type}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default ResultForm;
