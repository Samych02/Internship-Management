"use server"
import {signIn} from "@/auth";
import {redirect} from "next/navigation";


export default async function handleLoginSubmit(data: { email: string, password: string }) {
  try {

    await signIn('credentials', {
      redirectTo: "/",
      email: data.email,
      password: data.password,
    })
  } catch (error: any) {
    redirect("/login?error=" + error.cause.err.code)
  }

}
