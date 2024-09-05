"use server"
import LoginForm from "@/app/login/loginForm";
import Image from "next/image";
import React from "react";
import {Stack, Text} from "@mantine/core";

export default async function LoginPage() {
  return (
      <Stack
          align="center"
          mt="5rem"
      >
        <Image
            src="/capgemini logo.svg"
            alt="Capgemini logo"
            width="50"
            height="100"
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
  )
}
