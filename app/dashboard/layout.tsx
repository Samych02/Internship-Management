"use client"
import {AppShell, NavLink, Text} from "@mantine/core";
import Image from "next/image";
import {IconFingerprint, IconGauge} from "@tabler/icons-react";
import React from "react";
import {usePathname} from "next/navigation";


export default function Layout({children}: { children: React.ReactNode }) {
  const data = [
    {icon: IconGauge, label: 'Liste des utilisateurs', href: "/dashboard/admin",},
    {icon: IconFingerprint, label: 'Ajouter un nouveau utilisateur', href: "/dashboard/admin/add"},
  ];
  const pathname = usePathname();

  const items = data.map((item, index) => (
      <NavLink
          autoContrast={true}
          color="cb.9"
          href={item.href}
          key={item.label}
          active={pathname === item.href}
          label={item.label}
          leftSection={<item.icon size="1rem" stroke={1.5}/>}
          styles={{
            root: {
              marginBottom: "1rem", borderRadius: 5, "&:hover": {color: "red"}
            },
          }}
      />
  ));


  return (
      <AppShell
          header={{height: 80}}
          navbar={{
            width: 300,
            breakpoint: 0
          }}
          padding="md"
      >
        <AppShell.Header className="flex h-full items-center">
          <Image
              src="/capgemini logo.svg"
              alt="none"
              width="50"
              height="50"
              className="mx-5"
          />
          <Text>Internship Management</Text>
        </AppShell.Header>

        <AppShell.Navbar p="md">{
          <div className="flex flex-col h-full justify-between">
            <div>
              {items}
            </div>
            <h1 className="">test</h1>
          </div>

        }</AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
  )
}
