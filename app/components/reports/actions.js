"use server"
import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchReports(sendId) {
  let response = await fetch(`${process.env.API_URL}/reports?internID=${sendId ? await getCurrentUserID() : ""}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addReport(formData) {
  formData.append("internID", await getCurrentUserID())
  formData.append("fullName", session?.user.name)
  let response = await fetch(`${process.env.API_URL}/reports`, {
    method: "POST",
    body: formData
  })
  return response.ok
}
