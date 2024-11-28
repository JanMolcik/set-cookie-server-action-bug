"use server";

import { cookies } from "next/headers";

export type FormState = {
  successMessage: string;
  errorMessage: string;
  message?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const mockLoginFetch = (email: string, password: string) =>
  new Promise<LoginResponse | undefined>((resolve) =>
    setTimeout(() => {
      resolve({
        accessToken: "xyz",
        refreshToken: "abc",
      });
    }, 1000)
  );

export async function loginAction(
  state: FormState,
  data: FormData
): Promise<any> {
  const formData = Object.fromEntries(data);

  const variables = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const loginResult = await mockLoginFetch(variables.email, variables.password);

  if (loginResult?.accessToken) {
    cookies().set({
      name: "accessToken",
      value: loginResult.accessToken,
      path: "/",
    });
    cookies().set({
      name: "refreshToken",
      value: loginResult.refreshToken,
      path: "/",
    });
    const cookieAccess = cookies().get("accessToken");
    const cookieRefresh = cookies().get("accessToken");
    console.log(cookieAccess);
    console.log(cookieRefresh);
  }

  console.log(loginResult);

  return { successMessage: "Successfuly logged in!" };
}
