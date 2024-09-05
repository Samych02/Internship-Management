"use server"
import {auth} from "@/auth";

export async function getNumberOfPendingSubjects() {
  let response = await fetch(`${process.env.API_URL}/subjects/count-pending`)
  response = await response.json()
  return response.body.numberOfPendingSubjects
}

export async function updatePassword(data) {
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/users/update-password`, {
    method: "PATCH",
    body: JSON.stringify({
      userID: parseInt(session?.user.id),
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
