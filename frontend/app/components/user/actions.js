"use server"

import getCurrentUserID from "@/app/api/auth/[...nextauth]/actions";

export async function fetchUsers() {
  let response = await fetch(`${process.env.API_URL}/users`, {
    method: "get"
  })
  response = await response.json()
  return response.body
}

export async function registerAction(data) {
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

export async function resetPassword(newPassword, userID) {
  let response = await fetch(`${process.env.API_URL}/users/reset-password`, {
    method: "PATCH",
    body: JSON.stringify({
      userID: userID,
      newPassword: newPassword,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function updatePassword(data) {
  let response = await fetch(`${process.env.API_URL}/users/update-password`, {
    method: "PATCH",
    body: JSON.stringify({
      userID: await getCurrentUserID(),
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}

export async function updateProfilePicture(formData){
  formData.append("userID", await getCurrentUserID())
  let response = await fetch(`${process.env.API_URL}/users/update-profile-picture`, {
    method: "PATCH",
    body: formData
  })
  response = await response.json()
  return response.body.path
}

export async function deleteAccount(userID){
  let response = await fetch(`${process.env.API_URL}/users/${userID}`, {
    method: "DELETE",
  })
  return response.ok
}

export async function editUserRole(userID, newUserRole) {
  let response = await fetch(`${process.env.API_URL}/users/update-role`, {
    method: "PATCH",
    body: JSON.stringify({
      userID: userID,
      newUserRole: newUserRole,
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
