"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createResult, updateResult } from "@/lib/actions";
import { ResultInputs, resultSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";
import { Class, Exam, Student } from "@prisma/client";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function ResultForm({ setOpen, type, data, relatedData }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultInputs>({
    resolver: zodResolver(resultSchema),
  });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createResult : updateResult,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Track the selected exam
  const [selectedExam, setSelectedExam] = useState<any>(null);

  // Use effect to set the selected exam based on the data provided
  useEffect(() => {
    // Get the initial selected exam ID from the examId field
    const initialExamId = data?.examId || exams[0]?.id; // Fallback to first exam if no data

    // Find the selected exam based on the ID
    const selectedFormExam = exams.find(
      (exam: Exam) => exam.id === initialExamId
    );

    // Set the selected exam in the state
    setSelectedExam(selectedFormExam);
  }, []); // Keeping the dependency array empty to run only on mount

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Result has been successfully ${
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
          } the result. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Getting the students & exams from the related data object
  const { students, exams } = relatedData;

  // Filter students based on selected exam
  const filteredStudents = selectedExam
    ? students.filter(
        (student: Student & { class: Class }) =>
          student.classId === selectedExam.lesson.classId
      )
    : students;

  // Returned JSX
  return (
    <FormWrapper onSubmit={submitHandler}>
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Result
      </h2>
      <FormTitle>Information</FormTitle>
      <InputFieldsWrapper>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Exam</label>
          <select
            {...register("examId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.examId}
            onChange={(e) => {
              setSelectedExam(
                exams.find(
                  (exam: { id: number }) => exam.id === Number(e.target.value)
                )
              );
            }}
          >
            {exams.map((exam: { id: string; title: string }) => (
              <option value={exam.id} key={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
          {errors.examId?.message && (
            <p className="text-xs text-red-400">
              {errors.examId?.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select
            {...register("studentId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.studentId}
          >
            {filteredStudents.map(
              (student: { id: string; name: string; surname: true }) => (
                <option value={student.id} key={student.id}>
                  {student.name[0]}. {student.surname}
                </option>
              )
            )}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId?.message.toString()}
            </p>
          )}
        </div>

        <InputField
          label="Score"
          register={register}
          name="score"
          defaultValue={data?.score}
          error={errors?.score}
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

export default ResultForm;
