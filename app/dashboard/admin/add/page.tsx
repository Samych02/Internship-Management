"use server"
import AddingUserForm from "@/app/dashboard/admin/add/addingUserForm";
import {redirect} from "next/navigation";

export async function addingUserAction(data: {
  email: string,
  password: string,
  userRole: string,
  firstName: string,
  lastName: string
}) {
  "use server"
  let response = await fetch('http://localhost:8081/users/register', {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      userRole: data.userRole,
      firstName: data.firstName,
      lastName: data.lastName
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  if (response.ok) {
    redirect("/dashboard/admin/add?success=true")
  }
}

export async function isEmailUsed(email: string) {
  let response = await fetch(`http://localhost:8081/users/isEmailUsed?email=${email}`, {
    method: "GET",
  })
  response = await response.json()
  // @ts-ignore
  return response.body?.isEmailUsed
}

export default async function AddingPage() {
  return (
      <div className="flex flex-col items-center">
        <AddingUserForm/>
      </div>
  )
}
