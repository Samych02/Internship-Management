"use server"

export async function fetchInternships() {
  let response = await fetch(`http://localhost:8081/api/internships`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addInternshipAction(formData) {
  let response = await fetch(`http://localhost:8081/api/internships`, {
    method: "POST",
    body: formData

  })
  return response.ok
}
