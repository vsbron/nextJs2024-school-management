import { TableHeaderProps } from "@/lib/types";
import TableSearch from "./TableSearch";
import FormContainer from "./FormContainer";
import Image from "next/image";

function TableHeader({ title, role, table }: TableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <h2 className="text-md md:text-lg font-semibold mb-2 sm:m-0">{title}</h2>
      <div className="p-0 flex items-center gap-2 w-full sm:w-auto">
        <TableSearch />
        <div className="flex items-center gap-2 xs:gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolOrange">
            <Image src="/sort.svg" width={14} height={14} alt="" />
          </button>
          {role === "admin" && <FormContainer table={table} type="create" />}
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
