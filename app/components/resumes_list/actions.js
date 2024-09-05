"use server"
import {auth} from "@/auth";

export async function fetchResumes(sendId = false) {
  if (!sendId) {
    let response = await fetch(`${process.env.API_URL}/resumes`, {
      method: "get"
    })
    response = await response.json()
    return response.body
  }
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/resumes?posterID=${parseInt(session?.user.id)}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addResumeAction(formData) {
  const session = await auth()
  formData.append("posterID", parseInt(session?.user.id))
  let response = await fetch(`${process.env.API_URL}/resumes`, {
    method: "POST",
    body: formData
  })
  return response.ok
}
