"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { Teacher } from "@/lib/types";

type TeacherFormInputs = {
  example: string;
  exampleRequired: string;
};

function TeacherForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Teacher;
}) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<TeacherFormInputs>();

  // Submit handler
  const onSubmit: SubmitHandler<TeacherFormInputs> = (data) =>
    console.log(data);

  // DELETE LATER
  console.log(type);
  console.log(data);

  // Returned JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

export default TeacherForm;
