"use server"

import {auth} from "@/auth";

export async function fetchCourses(type) {
  "use server"
  const session = await auth()
  let response = await fetch(`http://localhost:8081/api/courses/${type}?internID=${session?.user.id}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function updateCourseStatus(courseID, status) {
  "use server"
  let response = await fetch(`http://localhost:8081/api/courses/${courseID}/${status}`, {
    method: "PATCH",
  })
  return response.ok
}

export async function addCourse(data) {
  const session = await auth()
  let response = await fetch('http://localhost:8081/api/courses', {
    method: "POST",
    body: JSON.stringify({
      internID: parseInt(session?.user.id),
      title: data.title,
      link: data.link,
      organism: data.organism,
      courseStatus: data.courseStatus,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
