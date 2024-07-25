import React from "react";
import {auth} from "@/auth";
import TTT from "@/app/dashboard/test";
import {IconGauge, IconUserPlus, IconUsersGroup} from "@tabler/icons-react";

export default async function Layout({children}: { children: React.ReactNode }) {
  const session = await auth()
  const adminNav = [
    {icon: <IconUsersGroup size="1rem" stroke={1.5}/>, label: 'Liste des utilisateurs', href: "/dashboard/admin",},
    {
      icon: <IconUserPlus size="1rem" stroke={1.5}/>,
      label: 'Ajouter un nouveau utilisateur',
      href: "/dashboard/admin/add"
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
      <TTT data={data}>{children}</TTT>

  )
}
