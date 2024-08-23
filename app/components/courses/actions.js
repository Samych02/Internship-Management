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
