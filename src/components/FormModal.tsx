"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { FormModalProps } from "@/lib/types";
import {
  deleteAnnouncement,
  deleteAssignment,
  deleteAttendance,
  deleteClass,
  deleteEvent,
  deleteExam,
  deleteLesson,
  deleteParent,
  deleteResult,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";

// Creating a map with all delete server actions
const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  parent: deleteParent,
  lesson: deleteLesson,
  exam: deleteExam,
  assignment: deleteAssignment,
  result: deleteResult,
  attendance: deleteAttendance,
  event: deleteEvent,
  announcement: deleteAnnouncement,
};

// Dynamic imports
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h4>Loading form...</h4>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h4>Loading form...</h4>,
});

// Declaring the types for the various forms
const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  announcement: (setOpenModal, type, data, relatedData) => (
    <AnnouncementForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  assignment: (setOpenModal, type, data, relatedData) => (
    <AssignmentForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  attendance: (setOpenModal, type, data, relatedData) => (
    <AttendanceForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  class: (setOpenModal, type, data, relatedData) => (
    <ClassForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  event: (setOpenModal, type, data, relatedData) => (
    <EventForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  exam: (setOpenModal, type, data, relatedData) => (
    <ExamForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  lesson: (setOpenModal, type, data, relatedData) => (
    <LessonForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  parent: (setOpenModal, type, data, relatedData) => (
    <ParentForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  result: (setOpenModal, type, data, relatedData) => (
    <ResultForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  student: (setOpenModal, type, data, relatedData) => (
    <StudentForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  subject: (setOpenModal, type, data, relatedData) => (
    <SubjectForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpenModal, type, data, relatedData) => (
    <TeacherForm
      setOpen={setOpenModal}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
};

function FormModal<T>({
  table,
  type,
  data,
  id,
  relatedData,
}: FormModalProps<T> & { relatedData?: any }) {
  // Creating a state for the Modal window
  const [openModal, setOpenModal] = useState(false);

  // Defining size and bg color for the buttons
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-schoolOrange"
      : type === "update"
      ? "bg-schoolSky"
      : "bg-schoolPurple";

  const [state, formAction] = useFormState(deleteActionMap[table], {
    success: false,
    error: false,
    message: "",
  });

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `${
            table.charAt(0).toUpperCase() + table.slice(1)
          } has been successfully deleted`
        ); // Close the modal
        setOpenModal(false);

        // Refresh the page
        router.refresh();
      } else {
        toast(
          `There was an error while deleting the ${table}. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpenModal, table]);

  // Returned JSX
  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpenModal(true)}
      >
        <Image src={`/${type}.svg`} width={18} height={18} alt="Icon" />
      </button>
      {openModal && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white px-8 pt-6 pb-8 rounded-xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              <Image
                src="/close.svg"
                width={14}
                height={14}
                alt="Close modal"
              />
            </div>

            {type === "delete" && id ? (
              <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="text | number" name="id" value={id} hidden />
                <div className="text-center font-medium">
                  All data will be lost. Are you sure you want to delete this{" "}
                  {table}
                </div>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                  Delete
                </button>
              </form>
            ) : (
              (type === "create" || type === "update") &&
              forms[table](setOpenModal, type, data, relatedData)
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
