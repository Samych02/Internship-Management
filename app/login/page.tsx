"use client"
import {Button, TextInput, useMantineTheme} from "@mantine/core";
import {hasLength, isEmail, useForm} from "@mantine/form";
import handleLoginSubmit from "@/app/login/handleLoginSubmit";
import {useSearchParams} from "next/navigation"


export default function Login() {
  const theme = useMantineTheme();

  const searchParams = useSearchParams()

  console.log(searchParams.get("error") == "credentials")
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {email: "", password: ""},
    validate: {
      email: isEmail("Email incorrect"),
      password: hasLength({min: 1}, "Mot de passe requis"),
    },
  });

  const handleSubmit = form.onSubmit((data) => {
    handleLoginSubmit(data)
  })

  return (
      <form onSubmit={handleSubmit}>
        <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            mt="md"
            label="Email"
            placeholder="Email"
        />
        <TextInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            mt="md"
            label="Mot de passe"
            placeholder="Mot de passe"
            type="password"
        />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
  );
}
