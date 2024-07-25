"use client"
import {AppShell, NavLink, Text} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {usePathname} from "next/navigation";

export default function TTT({children, data}) {
  function NavItem({item}: { item: any }) {
    const pathname = usePathname()
    return (
        <NavLink
            autoContrast={true}
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
              {data?.map((item, key) => (<NavItem item={item} key={key}/>))}
            </div>
          </div>

        }</AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
  )
}
