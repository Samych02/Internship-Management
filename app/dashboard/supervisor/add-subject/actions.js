"use server"

import {auth} from "@/auth";

export async function addSubjectAction(data) {
  "use server"
  const session = await auth()
  console.log(1)
  let response = await fetch('http://localhost:8081/api/subjects', {
    method: "POST",
    body: JSON.stringify({
      id: parseInt(session?.user.id),
      title: data.title,
      tasks: data.tasks.map(t => t.task),
      internType: data.internType,
      targetSchools: data.targetSchools,
      targetSpecialities: data.targetSpecialities,
      competenciesRequired: data.competenciesRequired,
      supervisor: data.supervisor,
      internNumber: data.internNumber,
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
  // @ts-ignore
  return response.body?.isTitleUsed
}
