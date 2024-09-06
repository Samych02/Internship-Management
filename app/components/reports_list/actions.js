"use server"
import {auth} from "@/auth";

export async function fetchReports(sendId) {
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/reports?internID=${sendId ? session?.user.id : ""}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addReport(formData) {
  const session = await auth()
  formData.append("internID", parseInt(session?.user.id))
  formData.append("fullName", session?.user.name)
  let response = await fetch(`${process.env.API_URL}/reports`, {
    method: "POST",
    body: formData
  })
  return response.ok
}
