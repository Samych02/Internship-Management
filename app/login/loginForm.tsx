"use client"

import {hasLength, isEmail, useForm} from "@mantine/form";
import {Alert, Button, PasswordInput, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {FormEvent} from "react";
import {loginAction} from "@/app/login/actions";
import {IconAlertCircle} from "@tabler/icons-react";

export default function LoginForm() {
  const [opened, {open, close}] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {email: "", password: ""},
    validate: {
      email: isEmail("Email invalid"),
      password: hasLength({min: 1}, "Mot de passe requis"),
    },
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      if (!await loginAction(data)) open()
    })()
  }


  return (<>
        <div className="flex flex-col items-center w-full mt-[10rem]">
          <form
              onSubmit={submit}
              className="flex flex-col w-[25rem] justify-items-center border-2 p-5 rounded-lg mt-3 border-[var(--mantine-color-cb-9)]"
          >
            {opened && <Alert
                styles={{
                  root: {
                    backgroundColor: "var(--mantine-color-red-2)",
                    marginBottom: "1rem"
                  },
                  label: {
                    color: "var(--mantine-color-red-9)"
                  },
                  icon: {
                    color: "var(--mantine-color-red-9)"
                  },
                  closeButton: {
                    color: "var(--mantine-color-red-9)"
                  }
                }}
                title={"Email et/ou mot de passe incorrect"}
                icon={<IconAlertCircle/>}
                withCloseButton
                onClose={close}
            />}

            <TextInput
                {...form.getInputProps('email')}
                key={form.key('email')}
                label="Email"
                placeholder="Email"
                className="mb-5"
            />

            <PasswordInput
                {...form.getInputProps('password')}
                key={form.key('password')}
                label="Mot de passe"
                placeholder="Mot de passe"
                className="mb-8"
            />

            <Button
                type="submit"
            >
              Se connecter
            </Button>
          </form>
        </div>
      </>
  );
}
