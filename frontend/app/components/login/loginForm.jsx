"use client"

import {hasLength, isEmail, useForm} from "@mantine/form";
import {Button, Loader, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import ErrorAlert from "@/app/components/feedback/ErrorAlert";
import {loginAction} from "@/app/components/login/actions";

export default function LoginForm() {
  const [alertOpened, toggleAlert] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {email: "", password: ""},
    validate: {
      email: isEmail("Email invalid"),
      password: hasLength({min: 1}, "Mot de passe requis"),
    },
  })

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      if (await loginAction(data) === "loginError") {
        setLoading(false)
        toggleAlert.open()
      }
    })()
  }


  return (
      <form
          onSubmit={submit}
      >
        <Stack
            align="center"
            bg="white"
            w="25rem"
            bd="1.5px solid cb"
            py="1rem"
            justify="center"
            style={{
              borderRadius: "8px"
            }}
        >
          <ErrorAlert
              opened={alertOpened}
              close={toggleAlert.close}
              title="Email et/ou mot de passe incorrect"
          />

          <TextInput
              {...form.getInputProps('email')}
              key={form.key('email')}
              label="Email"
              placeholder="Email"
              w="80%"
              mb="0.5rem"
          />

          <PasswordInput
              {...form.getInputProps('password')}
              key={form.key('password')}
              label="Mot de passe"
              placeholder="Mot de passe"
              w="80%"
              mb="1rem"
          />

          <Button
              type="submit"
          >
            {loading ? <Loader
                color="white"
                type="bars"
                size="20"
            /> : "Se connecter"}
          </Button>
        </Stack>
      </form>
  );
}
