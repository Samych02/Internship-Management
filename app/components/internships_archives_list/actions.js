"use server"

export async function fetchInternships() {
  let response = await fetch(`${process.env.API_URL}/internships`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addInternshipAction(formData) {
  let response = await fetch(`${process.env.API_URL}/internships`, {
    method: "POST",
    body: formData
  })
  return response.ok
}
