"use server"
import LoginForm from "@/app/login/loginForm";
import Image from "next/image";
import React from "react";
import {Text} from "@mantine/core";

export default async function LoginPage() {
  return (<div className="flex flex-col items-center mt-24">
        <Image
            src="/capgemini logo.svg"
            alt="none"
            width="50"
            height="100"
            className="mb-5"
        />
        <Text ta="center" size="xl" mb={25}>Se connecter à Smart Internship</Text>
        <LoginForm/>
      </div>
  )
}
