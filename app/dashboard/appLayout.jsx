"use client"
import {AppShell, Avatar, Box, Divider, Group, Menu, NavLink, rem, Stack, Text} from "@mantine/core";
import Image from "next/image";
import React from "react";
import {usePathname} from "next/navigation";
import {IconChevronRight, IconLock, IconPower, IconUserCircle} from "@tabler/icons-react";
import {logout} from "@/app/dashboard/layout";
import ROLES from "@/app/constants/ROLES";
import {useDisclosure} from "@mantine/hooks";
import ChangePasswordModal from "@/app/components/user/ChangePasswordModal";

export default function AppLayout({children, data, session,}) {
  const [changePasswordModalOpened, toggleChangePasswordModal] = useDisclosure(false);

  function NavItem({item}) {
    const pathname = usePathname()
    return (
        <NavLink
            href={item.href}
            key={item.label}
            active={pathname === item.href}
            label={item.label}
            leftSection={item.icon}
            rightSection={item.badge}
            styles={{
              root: {
                borderRadius: 5,
              },
            }}/>
    )
  }

  return (
      <>
        <ChangePasswordModal
            opened={changePasswordModalOpened}
            toggle={toggleChangePasswordModal}
        />
        <AppShell
            header={{height: 80}}
            navbar={{
              width: 300,
              breakpoint: 0
            }}
            padding="1rem"
        >
          <AppShell.Header>
            <Group
                align="center"
                h="100%"
                mx="1rem"
            >

              <Image
                  src="/capgemini logo.svg"
                  alt="none"
                  width="50"
                  height="50"
              />

              <Text
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{from: 'cb', to: 'cb.3', deg: 90}}
              >
                Smart Internship
              </Text>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar
              py="1rem"
              px="0.5rem"
          >
            <Stack
                h="100%"
                justify="space-between"
                align="center"
            >
              <Stack
                  w="100%"
              >
                {data?.map((item, key) => (
                    <NavItem
                        item={item}
                        key={key}
                    />
                ))}
              </Stack>

              <Menu
                  shadow="md"
                  position="right-end"
              >
                <Menu.Target>
                  <Stack
                      w="100%"
                  >
                    <Divider/>

                    <Group
                        align="center"
                        justify="space-between"
                        style={{cursor: "pointer"}}
                        gap="10px"
                    >
                      <Avatar
                          radius="xl"
                          src={session?.user.image === null ? '' : `http://localhost/profile-pictures/${session?.user.image}`}
                          alt="image profile"
                      />

                      <Stack
                          justify="center"
                          gap="5px"
                      >
                        <Group
                            align="center"
                            justify="space-between"
                        >
                          <Text
                              size="sm"
                              fw={500}
                          >
                            {session?.user.name}
                          </Text>
                          <Box
                              bg="cb.5"
                              p="2px"
                              c="white"
                              style={{
                                borderRadius: "4px"
                              }}
                          >
                            <Text
                                size="xs"
                            >
                              {ROLES[session?.user.userRole]}
                            </Text>
                          </Box>
                        </Group>

                        <Text
                            c="dimmed"
                            size="xs"
                        >
                          {session?.user.email}
                        </Text>
                      </Stack>

                      <IconChevronRight
                          stroke={1.5}
                      />
                    </Group>
                  </Stack>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                      leftSection={<IconLock style={{width: rem(14), height: rem(14)}}/>}
                      color="black"
                      onClick={toggleChangePasswordModal.open}
                  >
                    Modifier votre mot de passe
                  </Menu.Item>

                  <Menu.Item
                      leftSection={<IconUserCircle style={{width: rem(14), height: rem(14)}}/>}
                      color="black"
                      onClick
                  >
                    Modifier votre image de profile
                  </Menu.Item>

                  <Menu.Divider/>

                  <Menu.Item
                      leftSection={<IconPower style={{width: rem(14), height: rem(14)}}/>}
                      color="red"
                      onClick={async () => {
                        await logout()
                      }}
                  >
                    Se déconnecter
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Stack>

          </AppShell.Navbar>
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </>
  )
}
