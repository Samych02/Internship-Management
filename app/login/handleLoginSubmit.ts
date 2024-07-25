"use server"
import {signIn} from "@/auth";
import {redirect} from "next/navigation";
import {AuthError} from "next-auth";

export default async function handleLoginSubmit(data: { email: string, password: string }) {
  try {
    await signIn('credentials', {
      redirectTo: "/",
      email: data.email,
      password: data.password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=credentials")
    } else {
      throw error;
    }
  }
  // redirect("/")


}
