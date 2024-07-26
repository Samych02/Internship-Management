"use client"
import {AppShell, NavLink, Text} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {usePathname} from "next/navigation";
import {IconPower} from "@tabler/icons-react";
import {logout} from "@/app/dashboard/layout";

export default function AppLayout({children, data}: { children: React.ReactNode, data: any }) {
  function NavItem({item}: { item: any }) {
    const pathname = usePathname()
    return (
        <NavLink
            href={item.href}
            key={item.label}
            active={pathname === item.href}
            label={item.label}
            leftSection={item.icon}
            styles={{
              root: {
                marginBottom: "1rem", borderRadius: 5,
              },
            }}/>
    )
  }

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
              {data?.map((item: any, key: React.Key | null | undefined) => (<NavItem item={item} key={key}/>))}
            </div>
            <NavLink
                onClick={() => {
                  logout()
                }}
                active={true}
                color="red"
                label="Se déconnecter"
                leftSection={<IconPower size="1rem" stroke={1.5}/>}
                styles={{
                  root: {
                    marginBottom: "1rem", borderRadius: 5,
                  },
                }}/>
          </div>

        }</AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
  )
}
