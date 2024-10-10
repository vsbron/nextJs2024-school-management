import { FormTitleProps } from "@/lib/types";

function FormTitle({ children }: FormTitleProps) {
  return (
    <span className="-mb-2 xs:m-0 text-sm text-gray-400 font-medium">
      {children}
    </span>
  );
}

export default FormTitle;
