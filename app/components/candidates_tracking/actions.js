"use server"
import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchCandidates() {
  let response = await fetch(`${process.env.API_URL}/candidates?supervisorID=${await getCurrentUserID()}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function updateCandidate(candidateID, key, value) {
  let response = await fetch(`${process.env.API_URL}/candidates/${candidateID}`, {
    method: "PATCH",
    body: JSON.stringify({
      [key]: value,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
