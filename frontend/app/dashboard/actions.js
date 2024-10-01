"use server"

import {signOut} from "@/auth";

export async function getNumberOfPendingSubjects() {
  let response = await fetch(`${process.env.API_URL}/subjects/count-pending`)
  response = await response.json()
  return response.body.numberOfPendingSubjects
}

export async function logout(){
  await signOut({redirectTo: "/login"})
}
