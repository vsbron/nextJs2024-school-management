"use client";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParentInputs, parentSchema } from "@/lib/formSchemas";

import InputField from "../InputField";

function ParentForm({
  // setOpen,
  type,
  data,
}: // relatedData,
{
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
  } = useForm<ParentInputs>({ resolver: zodResolver(parentSchema) });

  // Submit handler
  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Parent
      </h2>
      <span className="text-sm text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          register={register}
          type="password"
          name="password"
          defaultValue={data?.password}
          error={errors?.password}
        />
      </div>
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Students"
          register={register}
          name="students"
          defaultValue={data?.students}
          error={errors?.students}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors?.address}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default ParentForm;
