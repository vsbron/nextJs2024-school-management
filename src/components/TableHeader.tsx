import { TableHeaderProps } from "@/lib/types";

function TableHeader({ children }: TableHeaderProps) {
  return (
    <div className="p-0 flex items-center gap-2 w-full sm:w-auto">
      {children}
    </div>
  );
}

export default TableHeader;
