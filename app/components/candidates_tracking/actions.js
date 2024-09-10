"use server"
import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchCandidates() {
  let response = await fetch(`${process.env.API_URL}/candidatures?supervisorID=${await getCurrentUserID()}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function updateCandidate(candidateID, key, value) {
  let response = await fetch(`${process.env.API_URL}/candidatures/${candidateID}`, {
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
