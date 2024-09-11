"use client"
import {Grid, Image, Stack, Text} from "@mantine/core";
import React from "react";
import LoginForm from "@/app/components/login/loginForm";

export default function LoginPage() {
  return (
      <Grid>
        <Grid.Col
            span={6}
        >
          <Stack
              align="center"
              mt="5rem"
          >
            <Image
                src="/capgemini logo.svg"
                alt="Capgemini logo"
                w="50"
                h="100"
            />

            <Text
                ta="center"
                size="xl"
                mb="1rem"
            >
              Se connecter à Smart Internship
            </Text>

            <LoginForm/>
          </Stack>
        </Grid.Col>
        <Grid.Col
            span={6}
        >
          <Image
              src="/img.jpg"
              alt="image"
              w="100%"
              h="100vh"
              fit="object-fit"
          />
        </Grid.Col>
      </Grid>
  )

}
