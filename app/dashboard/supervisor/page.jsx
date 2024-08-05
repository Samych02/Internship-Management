"use server"
import SubjectsList from "@/app/dashboard/supervisor/SubjectsList";
import {getUserSubject} from "@/app/dashboard/supervisor/actions";

export default async function Users() {
  const data = await getUserSubject()
  const elements = data.content
  const numberOfPage = data.totalPages

  return (
      <SubjectsList withEditButton={true}/>
  )


}
