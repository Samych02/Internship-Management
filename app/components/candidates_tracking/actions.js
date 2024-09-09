"use server"
import {auth} from "@/auth";

export async function fetchCandidates() {
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/candidates?supervisorID=${parseInt(session.user?.id)}`, {
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
