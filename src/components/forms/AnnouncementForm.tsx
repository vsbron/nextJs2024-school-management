"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

// Zod schema
const schema = z.object({
  title: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Due date is required!" }),
});

type Inputs = z.infer<typeof schema>;

function AnnouncementForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
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
        {type === "create" ? "Create a new" : "Update the"} Announcement
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
          label="Class"
          register={register}
          name="class"
          defaultValue={data?.class}
          error={errors?.class}
        />
        <InputField
          label="Due date"
          register={register}
          name="date"
          defaultValue={data?.date}
          error={errors?.date}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default AnnouncementForm;
