"use server"

export async function getNumberOfPendingSubjects() {
  "use server"
  let response = await fetch("http://localhost:8081/api/subjects/count-pending")
  response = await response.json()
  return response.body.numberOfPendingSubjects
}
