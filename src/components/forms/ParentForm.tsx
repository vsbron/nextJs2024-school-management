"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { createParent, updateParent } from "@/lib/actions";
import { ParentInputs, parentSchema } from "@/lib/formSchemas";
import { FormProps } from "@/lib/types";

import FormTitle from "./FormTitle";
import FormWrapper from "./FormWrapper";
import InputField from "./InputField";
import InputFieldsWrapper from "./InputFieldsWrapper";

function ParentForm({ setOpen, type, data }: FormProps) {
  // Getting the form functions from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentInputs>({ resolver: zodResolver(parentSchema) });

  // Getting the state and action from the useFormState
  const [state, formAction] = useFormState(
    type === "create" ? createParent : updateParent,
    { success: false, error: false, message: "" }
  );

  // Getting the router
  const router = useRouter();

  // Use effect to trigger the toast message
  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast(
          `Parent has been successfully ${
            type === "create" ? "created" : "updated"
          }`
        );
        // Close the modal
        setOpen(false);

        // Refresh the page
        router.refresh();
      } else {
        toast(
          `There was an error while ${
            type === "create" ? "creating" : "updating"
          } the parent. ${state.message}`
        );
      }
    }
  }, [state, type, router, setOpen]);

  // Submit handler
  const submitHandler = handleSubmit((formData) => {
    formAction(formData);
  });

  // Returned JSX
  return (
    <FormWrapper onSubmit={submitHandler}>
      {/* Header */}
      <h2 className="text-lg font-semibold">
        {type === "create" ? "Create a new" : "Update the"} Parent
      </h2>

      {/* Inputs */}
      <FormTitle>Authentication Information</FormTitle>
      <InputFieldsWrapper>
        <InputField
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          register={register}
          type="password"
          name="password"
          defaultValue={data?.password}
          error={errors?.password}
        />
      </InputFieldsWrapper>
      <FormTitle>Personal Information</FormTitle>

      <InputFieldsWrapper>
        <InputField
          label="First Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Family Name"
          register={register}
          name="surname"
          defaultValue={data?.surname}
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors?.address}
        />{" "}
        {data && (
          <InputField
            label="ID"
            name="id"
            register={register}
            defaultValue={data?.id}
            error={errors?.id}
            hidden
          />
        )}
      </InputFieldsWrapper>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </FormWrapper>
  );
}

export default ParentForm;
