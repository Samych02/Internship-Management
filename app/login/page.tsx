"use client"
import {Alert, Button, TextInput} from "@mantine/core";
import {hasLength, isEmail, useForm} from "@mantine/form";
import handleLoginSubmit from "@/app/login/handleLoginSubmit";
import {useSearchParams} from "next/navigation"
import {IconAlertCircle} from "@tabler/icons-react";

export default function Login() {
  const searchParams = useSearchParams()

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

  return (<div className="flex flex-col items-center w-full mt-[10rem]">
        <div className="w-[25rem]">
          {(searchParams.get("error") == "credentials") ?
              <Alert
                  color="red"
                  title="Email et/ou mot de passe incorrect!"
                  icon={<IconAlertCircle/>}
                  className="opacity-1 rounded-lg"
              /> :
              <Alert
                  title="deed"
                  className="opacity-0"/>
          }

          <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-items-center border-2 p-5 rounded-lg mt-3"
          >

            <TextInput
                {...form.getInputProps('email')}
                key={form.key('email')}
                label="Email"
                placeholder="Email"
                className="mb-5"
            />

            <TextInput
                {...form.getInputProps('password')}
                key={form.key('password')}
                label="Mot de passe"
                placeholder="Mot de passe"
                type="password"
                className="mb-8"
            />

            <Button
                type="submit"
                className=""
            >
              Se connecter
            </Button>

          </form>
        </div>
      </div>
  );
}
