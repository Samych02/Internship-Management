"use server"
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";
import LoginForm from "@/app/login/loginForm";


export async function loginAction(data: { email: string, password: string }) {
  "use server"
  try {
    await signIn('credentials', {
      redirectTo: "/dashboard",
      email: data.email,
      password: data.password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=Email et/ou mot de passe incorrect!");
    } else {
      throw error;
    }
  }
}

export default async function LoginPage() {
  return (<LoginForm/>)
}
