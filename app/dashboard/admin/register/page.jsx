"use server"
import RegisterForm from "@/app/dashboard/admin/register/RegisterForm";

export default async function RegisterPage() {
  return (
      <div className="flex flex-col items-center">
        <RegisterForm/>
      </div>
  )
}
