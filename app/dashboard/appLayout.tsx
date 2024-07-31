"use client"
import {AppShell, Avatar, Menu, NavLink, rem, Text} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {usePathname} from "next/navigation";
import {IconChevronRight, IconPower} from "@tabler/icons-react";
import {Session} from "next-auth";
import {logout} from "@/app/dashboard/layout";

export default function AppLayout({children, data, session,}: {
  children: React.ReactNode,
  data: any,
  session: Session | null
}) {
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
            {/*<NavLink*/}
            {/*    onClick={() => {*/}
            {/*      logout()*/}
            {/*    }}*/}
            {/*    active={true}*/}
            {/*    color="red"*/}
            {/*    label="Se déconnecter"*/}
            {/*    leftSection={<IconPower size="1rem" stroke={1.5}/>}*/}
            {/*    styles={{*/}
            {/*      root: {*/}
            {/*        marginBottom: "1rem", borderRadius: 5,*/}
            {/*      },*/}
            {/*    }}/>*/}
            <Menu shadow="md" position="right-end">
              <Menu.Target>
                <div className="flex justify-between cursor-pointer items-center border-t-2 pt-3">
                  <Avatar radius="xl" src={session?.user.image} alt="image profile"/>
                  <div className="flex flex-col justify-center">
                    <Text size="sm" fw={500}>{session?.user.name}</Text>
                    <Text c="dimmed" size="xs">{session?.user.email}</Text>
                  </div>
                  <IconChevronRight stroke={1.5}/>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconPower style={{width: rem(14), height: rem(14)}}/>} color="red"
                           onClick={() => {
                             logout()
                           }}>
                  Se déconnecter
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

        }</AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
  )
}
