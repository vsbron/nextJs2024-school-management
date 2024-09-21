"use client";
import Image from "next/image";
import { useState } from "react";

import { FormModalProps } from "@/lib/types";
import TeacherForm from "./forms/TeacherForm";

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
              <TeacherForm type={type} data={data} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
