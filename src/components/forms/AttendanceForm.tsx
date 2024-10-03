"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAttendance, updateAttendance } from "@/lib/actions";
import { AttendanceInputs, attendanceSchema } from "@/lib/formSchemas";
import { formFormatDate } from "@/lib/utils";

import InputField from "../InputField";

function ClassForm({
  setOpen,
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
  } = useForm<AttendanceInputs>({ resolver: zodResolver(attendanceSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createAttendance : updateAttendance,
    {
      success: false,
      error: false,
    }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Attendance has been successfully ${
            type === "create" ? "created" : "updated"
          }`
        );
        // Close the modal
        setOpen(false);

        // Refresh the page
        router.refresh();
      } else {
        toast(
          `There was some kind of error while ${
            type === "create" ? "creating" : "updating"
          } the attendance`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // // Getting the teachers from the related data object
  // const { teachers, grades } = relatedData;

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Attendance
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Date"
          register={register}
          name="date"
          defaultValue={data?.date && formFormatDate(data.date)}
          error={errors?.date}
          type="date"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Present</label>
          <select
            {...register("present")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.present}
          >
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
          {errors.present?.message && (
            <p className="text-xs text-red-400">
              {errors.present?.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Student"
          register={register}
          name="studentId"
          defaultValue={data?.studentId}
          error={errors?.studentId}
        />
        <InputField
          label="Lesson"
          register={register}
          name="lessonId"
          defaultValue={data?.lessonId}
          error={errors?.lessonId}
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
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default ClassForm;
