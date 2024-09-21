"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

// Zod schema
const schema = z.object({
  class: z.string().min(1, { message: "Class is required!" }),
  capacity: z.number().min(1, { message: "Capacity is required!" }),
  grade: z.number().min(1, { message: "Grade is required!" }),
  supervisor: z.string().min(1, { message: "Supervisor name is required!" }),
});

type Inputs = z.infer<typeof schema>;

function ClassForm({ type, data }: { type: "create" | "update"; data?: any }) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  // Submit handler
  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Class
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class"
          register={register}
          name="class"
          defaultValue={data?.class}
          error={errors?.class}
        />
        <InputField
          label="Capacity"
          register={register}
          name="capacity"
          defaultValue={data?.capacity}
          error={errors?.capacity}
        />
        <InputField
          label="Grade"
          register={register}
          name="grade"
          defaultValue={data?.grade}
          error={errors?.grade}
        />
        <InputField
          label="Supervisor"
          register={register}
          name="supervisor"
          defaultValue={data?.supervisor}
          error={errors?.supervisor}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default ClassForm;
