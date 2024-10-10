import Image from "next/image";

import { TableButtonsProps } from "@/lib/types";

import FormContainer from "./FormContainer";

function TableButtons({ role, table }: TableButtonsProps) {
  return (
    <div className="flex items-center gap-2 xs:gap-4 self-end">
      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolOrange">
        <Image src="/sort.svg" width={14} height={14} alt="" />
      </button>
      {role === "admin" && <FormContainer table={table} type="create" />}
    </div>
  );
}

export default TableButtons;
