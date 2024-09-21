"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

// Zod schema
const schema = z.object({
  title: z.string().min(1, { message: "Event name is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});
type Inputs = z.infer<typeof schema>;

function EventForm({ type, data }: { type: "create" | "update"; data?: any }) {
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
        {type === "create" ? "Create a new" : "Update the"} Event
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Event name"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors?.title}
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
          label="Start time"
          register={register}
          name="startTime"
          defaultValue={data?.startTime}
          error={errors?.startTime}
        />
        <InputField
          label="End time"
          register={register}
          name="endTime"
          defaultValue={data?.endTime}
          error={errors?.endTime}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default EventForm;
