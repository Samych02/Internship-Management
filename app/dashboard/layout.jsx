"use server"
import React from "react";
import {auth, signOut} from "@/auth";
import {IconGauge, IconList, IconTextPlus, IconUserPlus, IconUsersGroup} from "@tabler/icons-react";
import AppLayout from "@/app/dashboard/appLayout";

export async function logout() {
  "use server"
  await signOut({redirectTo: "/login"});
}

export default async function Layout({children}) {
  const session = await auth()
  const adminNav = [
    {
      icon: <IconUsersGroup size="1rem" stroke={1.5}/>,
      label: 'Liste des utilisateurs',
      href: "/dashboard/admin",
    },
    {
      icon: <IconUserPlus size="1rem" stroke={1.5}/>,
      label: 'Ajouter un nouveau utilisateur',
      href: "/dashboard/admin/register"
    },
  ]
  const supervisorNav = [
    {
      icon: <IconList size="1rem" stroke={1.5}/>,
      label: 'Mes sujets',
      href: "/dashboard/supervisor",
    },
    {
      icon: <IconTextPlus size="1rem" stroke={1.5}/>,
      label: 'Ajouter un nouveau sujet',
      href: "/dashboard/supervisor/add-subject"
    },
  ]

  const managerNav = [
    {
      icon: <IconGauge size="1rem" stroke={1.5}/>,
      label: 'Liste des sujets',
      href: "/dashboard/manager",
    },
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
    case "SUPERVISOR": {
      data = supervisorNav
      break
    }
  }

  return (
      <AppLayout data={data} session={session}>{children}</AppLayout>

  )
}
