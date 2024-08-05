"use server"
import {auth} from "@/auth";

export async function getUserSubject(page = 0, title = "") {
  "use server"
  const session = await auth()
  let response = await fetch(`http://localhost:8081/api/subjects?id=${parseInt(session?.user.id)}&page=${page}&title=${title}`, {
    method: "get"
  })
  response = await response.json()
  return response
}
