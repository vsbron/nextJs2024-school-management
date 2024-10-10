"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAnnouncement, updateAnnouncement } from "@/lib/actions";
import { AnnouncementInputs, announcementSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";
import { formFormatDate } from "@/lib/utils";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function AnnouncementForm({ setOpen, type, data, relatedData }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementInputs>({
    resolver: zodResolver(announcementSchema),
  });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createAnnouncement : updateAnnouncement,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Announcement has been successfully ${
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
          } the announcement. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Getting the classes from the related data object
  const { classes } = relatedData;

  // Returned JSX
  return (
    <FormWrapper onSubmit={submitHandler}>
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Announcement
      </h2>
      <FormTitle>Information</FormTitle>
      <InputFieldsWrapper>
        <InputField
          label="Title"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          register={register}
          name="date"
          defaultValue={data?.date && formFormatDate(data.date)}
          error={errors?.date}
          type="date"
        />
        <InputField
          label="Description"
          register={register}
          name="description"
          defaultValue={data?.description}
          error={errors?.description}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            {...register("classId")}
            className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
            defaultValue={data?.classId}
          >
            <option value={0}>None</option>
            {classes.map((classItem: { id: string; name: string }) => (
              <option value={classItem.id} key={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId?.message.toString()}
            </p>
          )}
        </div>

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

      {/* Error message */}
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}

      {/* Submit button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </FormWrapper>
  );
}

export default AnnouncementForm;
