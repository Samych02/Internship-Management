"use server"
import SubjectsList from "@/app/dashboard/supervisor/SubjectsList";

export default async function Users() {


  return (
      <SubjectsList listType="SUPERVISOR"/>
  )


}

