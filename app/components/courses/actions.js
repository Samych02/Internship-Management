"use server"
import {auth} from "@/auth";

export async function fetchCourses(type) {
  "use server"
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/courses/${type}?internID=${session?.user.id}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function updateCourseStatus(courseID, status) {
  "use server"
  let response = await fetch(`${process.env.API_URL}/courses/${courseID}/${status}`, {
    method: "PATCH",
  })
  return response.ok
}

export async function addCourse(data) {
  const session = await auth()
  let response = await fetch(`${process.env.API_URL}/courses`, {
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
