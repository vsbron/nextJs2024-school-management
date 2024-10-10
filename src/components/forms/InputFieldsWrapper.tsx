import { InputFieldWrapperProps } from "@/lib/types";

function InputFieldsWrapper({ children }: InputFieldWrapperProps) {
  return (
    <div className="flex justify-between flex-wrap gap-2 xs:gap-4">
      {children}
    </div>
  );
}

export default InputFieldsWrapper;
