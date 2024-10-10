import { TableHeadingProps } from "@/lib/types";

function TableHeading({ children }: TableHeadingProps) {
  return (
    <h2 className="text-md md:text-lg font-semibold mb-2 sm:m-0">{children}</h2>
  );
}

export default TableHeading;
