import { FormWrapperProps } from "@/lib/types";

function FormWrapper({ onSubmit, children }: FormWrapperProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 xs:gap-6">
      {children}
    </form>
  );
}

export default FormWrapper;
