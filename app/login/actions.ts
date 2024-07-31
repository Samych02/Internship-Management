"use server"
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

export async function loginAction(data: { email: string, password: string }) {
  "use server"
  try {
    await signIn('credentials', {
      redirectTo: "/",
      email: data.email,
      password: data.password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return "loginError"
    } else {
      throw error;
    }
  }
}
