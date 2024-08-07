"use server"
import {auth} from "@/auth";

export async function fetchSubjects(sendId = false, subjectStatus = null) {
  "use server"
  const session = await auth()
  let posterId = null
  if (sendId) posterId = parseInt(session?.user.id)
  let response = await fetch(`http://localhost:8081/api/subjects?posterId=${posterId}&${subjectStatus !== null && `subjectStatus=${subjectStatus}`}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}
