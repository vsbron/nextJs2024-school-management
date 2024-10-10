import { InputProps } from "@/lib/types";

function InputField({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputAttrs,
}: InputProps) {
  // Returned JSX
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="bg-white ring-[1.5px] ring-gray-300 px-2 py-1 xs:p-2 rounded-md text-sm w-full"
        {...inputAttrs}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error?.message.toString()}</p>
      )}
    </div>
  );
}

export default InputField;
