"use server"

import {auth} from "@/auth";

export async function addSubjectAction(data) {
  const session = await auth()
  let response = await fetch('http://localhost:8081/api/subjects', {
    method: "POST",
    body: JSON.stringify({
      posterId: parseInt(session?.user.id),
      title: data.title,
      tasks: data.tasks.map(t => t.task),
      internType: data.internType,
      targetSchools: data.targetSchools,
      targetSpecialities: data.targetSpecialities,
      competenciesRequired: data.competenciesRequired,
      supervisor: data.supervisor,
      internNumber: data.internNumber,
      internshipType: data.internshipType,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function editSubjectAction(subjectId, data) {
  const session = await auth()
  let response = await fetch(`http://localhost:8081/api/subjects/${subjectId}`, {
    method: "PATCH",
    body: JSON.stringify({
      posterId: parseInt(session?.user.id),
      title: data.title,
      tasks: data.tasks.map(t => t.task),
      internType: data.internType,
      targetSchools: data.targetSchools,
      targetSpecialities: data.targetSpecialities,
      competenciesRequired: data.competenciesRequired,
      supervisor: data.supervisor,
      internNumber: data.internNumber,
      internshipType: data.internshipType,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function checkTitleUsedAction(title) {
  let response = await fetch(`http://localhost:8081/api/subjects/check-title-used?title=${title}`, {
    method: "GET",
  })
  response = await response.json()
  return response.body?.isTitleUsed
}

export async function getSubjectById(subjectId) {
  let response = await fetch(`http://localhost:8081/api/subjects/${subjectId}`, {
    method: "GET",
  })
  response = await response.json()
  response.body.tasks = response.body.tasks.map(task => ({task}))
  return response.body
}

export async function editSubjectStatus(subjectId, subjectStatus, specialistComment = null) {
  let response = await fetch(`http://localhost:8081/api/subjects/${subjectId}/${subjectStatus}`, {
    method: "PATCH",
    body: specialistComment ?? ""
  })

}
