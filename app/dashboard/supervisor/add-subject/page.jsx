"use server"
import AddSubjectForm from "@/app/dashboard/supervisor/add-subject/AddSubjectForm";

export default async function RegisterPage() {
  return (
      <div className="flex flex-col items-center">
        <AddSubjectForm/>
      </div>
  )
}
