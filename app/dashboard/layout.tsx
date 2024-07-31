"use server"
import React from "react";
import {auth, signOut} from "@/auth";
import {IconGauge, IconUserPlus, IconUsersGroup} from "@tabler/icons-react";
import AppLayout from "@/app/dashboard/appLayout";

export async function logout() {
  "use server"
  await signOut({redirectTo: "/login"});
}

export default async function Layout({children}: { children: React.ReactNode }) {
  const session = await auth()
  const adminNav = [
    {icon: <IconUsersGroup size="1rem" stroke={1.5}/>, label: 'Liste des utilisateurs', href: "/dashboard/admin",},
    {
      icon: <IconUserPlus size="1rem" stroke={1.5}/>,
      label: 'Ajouter un nouveau utilisateur',
      href: "/dashboard/admin/register"
    },
  ]
  const managerNav = [
    {icon: <IconGauge size="1rem" stroke={1.5}/>, label: 'Liste des sujets', href: "/dashboard/manager",},
  ]

  let data
  switch (session?.user.userRole) {
    case "ADMIN": {
      data = adminNav
      break
    }
    case "MANAGER": {
      data = managerNav
      break
    }
  }

  return (
      <AppLayout data={data}>{children}</AppLayout>

  )
}
