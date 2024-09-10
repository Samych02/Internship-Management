"use server"
import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchResumes() {
  let response = await fetch(`${process.env.API_URL}/resumes`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function addResumeAction(formData) {
  formData.append("posterID", await getCurrentUserID())
  let response = await fetch(`${process.env.API_URL}/resumes`, {
    method: "POST",
    body: formData
  })
  return response.ok
}

export async function checkProfileExisting(firstName, lastName) {
  let response = await fetch(`${process.env.API_URL}/resumes/check-profile-existing?firstName=${firstName}&lastName=${lastName}`, {
    method: "GET"
  })
  response = await response.json()
  return response.body.isProfileExisting
}

export async function fetchAssignableSubjects(resumeID){
  let response = await fetch(`${process.env.API_URL}/subjects/assignable?resumeID=${resumeID}`, {
    method: "GET"
  })
  response = await response.json()
  return response.body
}
export async function addCandidature(subjectID, resumeID) {
  let response = await fetch(`${process.env.API_URL}/candidatures`, {
    method: "POST",
    body: JSON.stringify({
      supervisorID: await getCurrentUserID(),
      subjectID: parseInt(subjectID),
      resumeID: resumeID,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
