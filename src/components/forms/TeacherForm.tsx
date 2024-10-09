"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTeacher, updateTeacher } from "@/lib/actions";
import { TeacherInputs, teacherSchema } from "@/lib/formSchemas";

import InputField from "../InputField";
import Image from "next/image";

function TeacherForm({
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
  } = useForm<TeacherInputs>({ resolver: zodResolver(teacherSchema) });

  // Setting the state for uploaded avatar
  const [img, setImg] = useState<any>();

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Teacher has been successfully ${
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
          } the teacher. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction({ ...formData, img: img?.secure_url });
  });

  // Getting the teachers from the related data object
  const { subjects } = relatedData;

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Teacher
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
      </div>
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
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

        {/* Select field for the Subjects */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            {...register("subjects")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects?.message.toString()}
            </p>
          )}
        </div>

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
      </div>

      {/* Error message */}
      {state.error && <span className="text-red-500">There was an error</span>}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default TeacherForm;
