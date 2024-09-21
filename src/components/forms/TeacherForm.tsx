"use client";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

// Zod schema
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  avatar: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

function TeacherForm({
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
      <h2 className="text-lg font-semibold">Create a new Teacher</h2>
      <span className="text-sm text-gray-400 font-medium">
        Authentication Information
      </span>
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
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>
      <InputField
        label="First Name"
        register={register}
        name="firstName"
        defaultValue={data?.firstName}
        error={errors?.firstName}
      />
      <InputField
        label="Last Name"
        register={register}
        name="lastName"
        defaultValue={data?.lastName}
        error={errors?.lastName}
      />
      <InputField
        label="Phone"
        register={register}
        name="phone"
        defaultValue={data?.phone}
        error={errors?.phone}
      />
      <InputField
        label="Address"
        register={register}
        name="address"
        defaultValue={data?.address}
        error={errors?.address}
      />
      <InputField
        label="Blood Type"
        register={register}
        name="bloodType"
        defaultValue={data?.bloodType}
        error={errors?.bloodType}
      />
      <InputField
        label="Date of Birth"
        register={register}
        name="birthday"
        type="date"
        defaultValue={data?.birthday}
        error={errors?.birthday}
      />
      {/* <label>Sex</label>
      <select {...register("sex")}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.sex?.message && <p>{errors.sex?.message.toString()}</p>}
      <label></label>
      <input type="file" {...register("avatar")} />
      {errors.avatar?.message && <p>{errors.avatar?.message.toString()}</p>} */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default TeacherForm;
