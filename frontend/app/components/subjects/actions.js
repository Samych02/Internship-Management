"use server"

import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchSubjects(sendID = false, subjectStatus = null) {
  let posterID = null
  if (sendID) posterID = await getCurrentUserID()
  let response = await fetch(`${process.env.API_URL}/subjects?${sendID ? `posterID=${posterID}` : ""}&${subjectStatus !== null ? `subjectStatus=${subjectStatus}` : ""}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}


export async function addSubjectAction(data) {
  let response = await fetch(`${process.env.API_URL}/subjects`, {
    method: "POST",
    body: JSON.stringify({
      posterID: await getCurrentUserID(),
      title: data.title,
      tasks: data.tasks.map(t => t.task),
      internType: data.internType,
      targetSchools: data.targetSchools,
      targetSpecialities: data.targetSpecialities,
      competenciesRequired: data.competenciesRequired,
      supervisor: data.supervisor,
      internNumber: data.internNumber,
      internshipType: data.internshipType,
      studyField: data.studyField,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function editSubjectAction(subjectID, data) {
  let response = await fetch(`${process.env.API_URL}/subjects/${subjectID}`, {
    method: "PATCH",
    body: JSON.stringify({
      posterID: await getCurrentUserID(),
      title: data.title,
      tasks: data.tasks.map(t => t.task),
      internType: data.internType,
      targetSchools: data.targetSchools,
      targetSpecialities: data.targetSpecialities,
      competenciesRequired: data.competenciesRequired,
      supervisor: data.supervisor,
      internNumber: data.internNumber,
      internshipType: data.internshipType,
      studyField: data.studyField,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function checkTitleUsedAction(title) {
  let response = await fetch(`${process.env.API_URL}/subjects/check-title-used?title=${title}`, {
    method: "GET",
  })
  response = await response.json()
  return response.body?.isTitleUsed
}

export async function getSubjectById(subjectID) {
  let response = await fetch(`${process.env.API_URL}/subjects/${subjectID}`, {
    method: "GET",
  })
  response = await response.json()
  response.body.tasks = response.body.tasks.map(task => ({task}))
  return response.body
}

export async function editSubjectStatus(subjectID, subjectStatus, specialistComment = null) {
  let response = await fetch(`${process.env.API_URL}/subjects/${parseInt(subjectID)}/${subjectStatus}`, {
    method: "PATCH",
    body: specialistComment ?? ""
  })
  return response.ok
}
