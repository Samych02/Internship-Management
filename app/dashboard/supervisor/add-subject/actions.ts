"use server"

export async function registerAction(data: {
  email: string,
  password: string,
  userRole: string,
  firstName: string,
  lastName: string
}) {
  "use server"
  let response = await fetch('http://localhost:8081/api/users/register', {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      userRole: data.userRole,
      firstName: data.firstName,
      lastName: data.lastName
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function checkTitleUsedAction(title: string) {
  let response = await fetch(`http://localhost:8081/api/subjects/check-title-used?title=${title}`, {
    method: "GET",
  })
  response = await response.json()
  // @ts-ignore
  return response.body?.isTitleUsed
}
