"use server"

import {auth} from "@/auth";

export async function fetchInternReports() {
  const session = await auth()
  let response = await fetch(`http://localhost:8081/api/reports?internID=${session?.user.id}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}


export async function addReport(formData) {
  const session = await auth()
  formData.append("internID", parseInt(session?.user.id))
  formData.append("fullName", session?.user.name)
  let response = await fetch(`http://localhost:8081/api/reports`, {
    method: "POST",
    body: formData
  })
  return response.ok
}
