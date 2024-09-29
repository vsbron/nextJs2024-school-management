"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";

import { FormModalProps } from "@/lib/types";

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
    data?: any
  ) => JSX.Element;
} = {
  teacher: (setOpenModal, type, data) => (
    <TeacherForm setOpen={setOpenModal} type={type} data={data} />
  ),
  student: (setOpenModal, type, data) => (
    <StudentForm setOpen={setOpenModal} type={type} data={data} />
  ),
  announcement: (setOpenModal, type, data) => (
    <AnnouncementForm setOpen={setOpenModal} type={type} data={data} />
  ),
  assignment: (setOpenModal, type, data) => (
    <AssignmentForm setOpen={setOpenModal} type={type} data={data} />
  ),
  class: (setOpenModal, type, data) => (
    <ClassForm setOpen={setOpenModal} type={type} data={data} />
  ),
  event: (setOpenModal, type, data) => (
    <EventForm setOpen={setOpenModal} type={type} data={data} />
  ),
  exam: (setOpenModal, type, data) => (
    <ExamForm setOpen={setOpenModal} type={type} data={data} />
  ),
  lesson: (setOpenModal, type, data) => (
    <LessonForm setOpen={setOpenModal} type={type} data={data} />
  ),
  parent: (setOpenModal, type, data) => (
    <ParentForm setOpen={setOpenModal} type={type} data={data} />
  ),
  result: (setOpenModal, type, data) => (
    <ResultForm setOpen={setOpenModal} type={type} data={data} />
  ),
  subject: (setOpenModal, type, data) => (
    <SubjectForm setOpen={setOpenModal} type={type} data={data} />
  ),
};

function FormModal<T>({ table, type, data, id }: FormModalProps<T>) {
  // Creating a state for the Modal window
  const [openModal, setOpenModal] = useState(false);

  // Defining size and bg color for the buttons
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-schoolYellow"
      : type === "update"
      ? "bg-schoolSky"
      : "bg-schoolPurple";

  // Returned JSX
  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpenModal(true)}
      >
        <Image src={`/${type}.png`} width={16} height={16} alt="Icon" />
      </button>
      {openModal && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white px-8 pt-6 pb-8 rounded-xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              <Image
                src="/close.png"
                width={14}
                height={14}
                alt="Close modal"
              />
            </div>

            {type === "delete" && id ? (
              <form action="" className="p-4 flex flex-col gap-4">
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
              forms[table](setOpenModal, type, data)
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
