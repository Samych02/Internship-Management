"use server"

export async function fetchResumes() {
  let response = await fetch(`http://localhost:8081/api/resumes`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addResumeAction(formData) {
  let response = await fetch(`http://localhost:8081/api/resumes`, {
    method: "POST",
    body: formData

  })
  return response.ok
}
