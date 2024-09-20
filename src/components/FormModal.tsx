"use client"
import Image from "next/image";

type FormModalProps = {
  table: "teacher" | "student";
  type: "create" | "update" | "delete";
  data?: string[];
  id: number;
};

function FormModal({table, type, data, id}: FormModalProps){

  // Defining size and bg color for the buttons
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create" ? "bg-schoolYellow" : type==="update" ? "bg-schoolSky" : "bg-schoolPurple";

  // Returned JSX
  return <>
  <button className={`${size} ${bgColor} flex items-center justify-center rounded-full`}>
    <Image src={`/${type}.png`} width={16} height={16} alt="Icon" />
  </button>
  </>
}

export default FormModal
