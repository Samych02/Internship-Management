"use server"
import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchCourses(type) {
  let response = await fetch(`${process.env.API_URL}/courses/${type}?internID=${await getCurrentUserID()}`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function updateCourseStatus(courseID, status) {
  let response = await fetch(`${process.env.API_URL}/courses/${courseID}/${status}`, {
    method: "PATCH",
  })
  return response.ok
}

export async function addCourse(data) {
  let response = await fetch(`${process.env.API_URL}/courses`, {
    method: "POST",
    body: JSON.stringify({
      internID: await getCurrentUserID(),
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
