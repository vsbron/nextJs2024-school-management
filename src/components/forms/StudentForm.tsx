"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";

import { createStudent, updateStudent } from "@/lib/actions";
import { StudentInputs, studentSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function StudentForm({ setOpen, type, data, relatedData }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentInputs>({ resolver: zodResolver(studentSchema) });

  // Setting the state for uploaded avatar
  const [img, setImg] = useState<any>();

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Student has been successfully ${
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
          } the student. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction({ ...formData, img: img?.secure_url });
  });

  // Getting the grades & classes from the related data object
  const { grades, classes } = relatedData;

  // Returned JSX
  return (
    <FormWrapper onSubmit={submitHandler}>
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Student
      </h2>
      <FormTitle>Authentication Information</FormTitle>
      <InputFieldsWrapper>
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
      <FormTitle>Personal Information</FormTitle>
      <InputFieldsWrapper>
        <InputField
          label="First Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Last Name"
          register={register}
          name="surname"
          defaultValue={data?.surname}
          error={errors?.surname}
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
          label="Description"
          register={register}
          name="description"
          defaultValue={data?.description}
          error={errors?.description}
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
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          error={errors?.birthday}
        />
        <InputField
          label="Parent Id"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors?.parentId}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>

        {/* Select field for the Grades */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            {...register("gradeId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId?.message.toString()}
            </p>
          )}
        </div>

        {/* Select field for the Classes */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            {...register("classId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.classId}
          >
            {classes.map(
              (classItem: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option value={classItem.id} key={classItem.id}>
                  {classItem.name} (Capacity:{" "}
                  {classItem._count.students + "/" + classItem.capacity})
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

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <CldUploadWidget
            uploadPreset="school_management"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image
                    src="/upload.svg"
                    width={28}
                    height={28}
                    alt="Upload an avatar"
                  />
                  <span>Upload a photo</span>
                </div>
              );
            }}
          </CldUploadWidget>
          {img && (
            <Image src={img.secure_url} width={100} height={100} alt="" />
          )}
        </div>
      </InputFieldsWrapper>

      {/* Error message */}
      {state.error && <span className="text-red-500">There was an error</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </FormWrapper>
  );
}

export default StudentForm;
