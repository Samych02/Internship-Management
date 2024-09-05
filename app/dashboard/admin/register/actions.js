"use server"

export async function registerAction(data) {
  "use server"
  let response = await fetch(`${process.env.API_URL}/users/register`, {
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

export async function checkEmailUsedAction(email) {
  let response = await fetch(`${process.env.API_URL}/users/check-email-used?email=${email}`, {
    method: "GET",
  })
  response = await response.json()
  // @ts-ignore
  return response.body?.isEmailUsed
}
