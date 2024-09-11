"use client"
import {Grid, Group, Image, Stack, Text} from "@mantine/core";
import React from "react";
import LoginForm from "@/app/components/login/loginForm";

export default function LoginPage() {
  return (
      <Grid
          overflow="hidden"
          h="100vh"
          gutter="0"
      >
        <Grid.Col
            span={8}
        >
          <Image
              src="/img.jpg"
              alt="image"
          />
        </Grid.Col>

        <Grid.Col
            span={4}
        >
          <Stack
              align="center"
              justify="center"
              bg="#F4F6F9"
              w="100%"
              h="100vh"
          >
            <Image
                src="/capgemini-engineering.svg"
                alt="Capgemini logo"
                w="70%"
                mb="2rem"
            />

            <Group
              gap="xs"
            >
              <Text
                  ta="center"
                  size="xl"
              >
                Se connecter à
              </Text>

              <Text
                  ta="center"
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{from: 'blue.9', to: 'blue.3', deg: 90}}
              >
                Smart Internship
              </Text>
            </Group>

            <LoginForm/>
          </Stack>
        </Grid.Col>
      </Grid>
  )

}
