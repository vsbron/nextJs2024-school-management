"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createResult, updateResult } from "@/lib/actions";
import { ResultInputs, resultSchema } from "@/lib/formSchemas";

import InputField from "../InputField";
import { Assignment, Class, Exam, Student } from "@prisma/client";
import { formatDate } from "@/lib/utils";

function ResultForm({
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
  } = useForm<ResultInputs>({ resolver: zodResolver(resultSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createResult : updateResult,
    { success: false, error: false }
  );

  // Getting the router
  const router = useRouter();

  // Track the selected class
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // Getting the assignments, exams, students, and classes from related data
  const { assignments, exams, students, classes } = relatedData;

  // Use effect to set the selected class based on the data provided
  useEffect(() => {
    // Get the initial selected lesson ID from the lessonId field
    const initialClassId =
      data?.exam?.lesson?.classId ||
      data?.assignment?.lesson?.classId ||
      classes[0]?.id;

    // Find the selected class based on the ID
    const selectedFormClass = classes.find(
      (classItem: Class) => classItem.id === initialClassId
    );

    // Set the selected class in the state
    setSelectedClass(selectedFormClass);
  }, [data, classes]); // Update when data or classes change

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
          `There was some kind of error while ${
            type === "create" ? "creating" : "updating"
          } the result`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Filter students based on selected lesson's class (if a lesson is selected)
  const filteredStudents = selectedClass
    ? students.filter(
        (student: Student & { classId: number }) =>
          student.classId === selectedClass.id
      )
    : students;

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    // Call the form action with modified formData
    formAction(formData);
  });

  // Returned JSX
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Result
      </h2>
      <span className="text-sm text-gray-400 font-medium">Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Select field for Exams and Assignments */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Task</label>
          <select
            {...register("examId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.examId || ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selectedExam = exams.find(
                (exam: Exam) => exam.id === selectedId
              );
              const selectedAssignment = assignments.find(
                (assignment: Assignment) => assignment.id === selectedId
              );

              // Get classId from the selected task (exam or assignment)
              const classId =
                selectedExam?.lesson?.classId ||
                selectedAssignment?.lesson?.classId;

              // Update selectedClass state
              const selectedFormClass = classes.find(
                (classItem: Class) => classItem.id === classId
              );
              setSelectedClass(selectedFormClass);
            }}
          >
            {/* Mapping over exams */}
            {exams.map(
              (exam: Exam & { lesson: { subject: { name: string } } }) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title} | {exam.lesson?.subject?.name} (
                  {formatDate(exam.startTime)})
                </option>
              )
            )}
            {/* Mapping over assignments */}
            {assignments.map(
              (
                assignment: Assignment & {
                  lesson: { subject: { name: string } };
                }
              ) => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title} | {assignment.lesson?.subject?.name} (
                  {formatDate(assignment.startDate)})
                </option>
              )
            )}
          </select>
          {errors?.examId && (
            <p className="text-xs text-red-400">
              {errors.examId?.message?.toString()}
            </p>
          )}
        </div>

        {/* Disabled field showing the current class */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Current Class</label>
          <input
            type="text"
            value={selectedClass?.name || "No class selected"}
            className="bg-gray-100 ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            disabled
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select
            {...register("studentId")}
            className="bg-white ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.studentId || ""}
          >
            {/* Mapping over filtered students */}
            {filteredStudents.map((student: Student) => (
              <option key={student.id} value={student.id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
          {errors?.studentId && (
            <p className="text-xs text-red-400">
              {errors.studentId?.message?.toString()}
            </p>
          )}
        </div>

        <InputField
          label="Score (0-100)"
          register={register}
          name="score"
          defaultValue={data?.score}
          error={errors?.score}
          type="number"
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

      {/* Error message */}
      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}

      {/* Submit button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}

export default ResultForm;
