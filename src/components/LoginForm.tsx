"use client";

import { FormState, loginAction } from "@/app/actions";
import { FC } from "react";
import { useFormState } from "react-dom";

export type LoginFormProps = {
  formHeading: string;
};

export const LoginForm: FC<LoginFormProps> = ({ formHeading }) => {
  const initialFormState: FormState = {
    errorMessage: "",
    successMessage: "",
  };

  const [state, formAction] = useFormState(loginAction, initialFormState);
  console.log(state);
  // const handleActionsAfterLogin = useHandleActionsAfterLogin();

  if (state.successMessage && state.successMessage !== "") {
    alert("🧪 state -> success: " + state.successMessage);

    state.successMessage = "";
  }

  if (state.errorMessage && state.errorMessage !== "") {
    alert("🔥 -> state -> error: " + state.errorMessage);

    state.errorMessage = "";
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <h1>{formHeading}</h1>

      <input className="border text-black" name="email" type="email" />

      <input className="border text-black" name="password" type="password" />

      <button type="submit">Login</button>
    </form>
  );
};
