"use server"
import React from "react";
import {auth, signOut} from "@/auth";
import {
  IconArchive,
  IconBrowserCheck,
  IconCertificate,
  IconChecklist,
  IconFileCv,
  IconHourglassLow,
  IconList,
  IconListSearch,
  IconSchool,
  IconThumbUp,
  IconUserPlus,
  IconUsersGroup
} from "@tabler/icons-react";
import AppLayout from "@/app/dashboard/appLayout";
import {Badge} from "@mantine/core";
import {getNumberOfPendingSubjects} from "@/app/dashboard/actions";

export async function logout() {
  "use server"
  await signOut({redirectTo: "/login"});
}

export default async function Layout({children}) {
  const session = await auth()
  let numberOfPendingSubjects = 0
  if (session.user.userRole === "SPECIALIST") numberOfPendingSubjects = await getNumberOfPendingSubjects()
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
      label: 'Liste des sujets',
      href: "/dashboard/supervisor",
    }, {
      icon: <IconListSearch size="1rem" stroke={1.5}/>,
      label: 'Mes sujets',
      href: "/dashboard/supervisor/mes-sujets",
    }, {
      icon: <IconFileCv size="1rem" stroke={1.5}/>,
      label: 'CVs recommandés',
      href: "/dashboard/supervisor/CV",
    },
  ]

  const specialistNav = [
    {
      icon: <IconList size="1rem" stroke={1.5}/>,
      label: 'Liste des sujets',
      href: "/dashboard/specialist",
    },
    {
      icon: <IconHourglassLow size="1rem" stroke={1.5}/>,
      label: 'Approbation des sujets',
      href: "/dashboard/specialist/approbation",
      badge: <Badge size="sm" circle>{numberOfPendingSubjects}</Badge>
    }, {
      icon: <IconArchive size="1rem" stroke={1.5}/>,
      label: 'Archive des stages',
      href: "/dashboard/specialist/archive-des-stages",
    },
  ]

  const responsibleNav = [
    {
      icon: <IconFileCv size="1rem" stroke={1.5}/>,
      label: 'CVs recommandés',
      href: "/dashboard/responsible/CV",
    },
  ]

  const internNav = [
    {
      icon: <IconSchool size="1rem" stroke={1.5}/>,
      label: 'Formations obligatoires',
      href: "/dashboard/intern",
    }, {
      icon: <IconCertificate size="1rem" stroke={1.5}/>,
      label: 'Formations personnelles',
      href: "/dashboard/intern/formations-personnelles",
    }, {
      icon: <IconChecklist size="1rem" stroke={1.5}/>,
      label: 'Mes comptes Rendus',
      href: "/dashboard/intern/comptes-rendus",
    }, {
      icon: <IconBrowserCheck size="1rem" stroke={1.5}/>,
      label: 'Liens utiles',
      href: "/dashboard/intern/liens-utiles",
    }, {
      icon: <IconThumbUp size="1rem" stroke={1.5}/>,
      label: 'Les bonnes pratiques',
      href: "/dashboard/intern/bonnes-pratiques",
    },
  ]

  let data
  switch (session?.user.userRole) {
    case "ADMIN": {
      data = adminNav
      break
    }
    case "SPECIALIST": {
      data = specialistNav
      break
    }
    case "SUPERVISOR": {
      data = supervisorNav
      break
    }
    case "RESPONSIBLE": {
      data = responsibleNav
      break
    }
    case "INTERN": {
      data = internNav
      break
    }
  }

  return (
      <AppLayout data={data} session={session}>{children}</AppLayout>

  )
}
