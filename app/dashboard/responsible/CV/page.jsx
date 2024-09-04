"use server"
import ResumeList from "@/app/components/resumes_list/ResumeList";

export default async function Resume() {
  return (
      <ResumeList listType="RESPONSIBLE"/>
  )
}
