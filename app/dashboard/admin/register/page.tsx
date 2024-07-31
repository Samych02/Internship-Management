"use server"
import AddingUserForm from "@/app/dashboard/admin/register/RegisterForm";

export default async function RegisterPage() {
  return (
      <div className="flex flex-col items-center">
        <AddingUserForm/>
      </div>
  )
}
