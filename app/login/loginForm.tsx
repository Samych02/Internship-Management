"use client"

import {useSearchParams} from "next/navigation";
import {hasLength, isEmail, useForm} from "@mantine/form";
import {Alert, Button, PasswordInput, TextInput} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import {loginAction} from "@/app/login/page";

export default function LoginForm() {
  const searchParams = useSearchParams()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {email: "", password: ""},
    validate: {
      email: isEmail("Email Invalid"),
      password: hasLength({min: 1}, "Mot de passe requis"),
    },
  });

  const submit = form.onSubmit((data) => {
    loginAction(data)
  })

  return (<div className="flex flex-col items-center w-full mt-[10rem]">
        <div className="w-[25rem]">
          {(searchParams.get("error") != null) ?
              <Alert
                  styles={{
                    root: {
                      backgroundColor: "var(--mantine-color-red-2)"
                    },
                    label: {
                      color: "var(--mantine-color-red-9)"
                    }, icon: {
                      color: "var(--mantine-color-red-9)"
                    }
                  }}
                  title={searchParams.get("error")}
                  icon={<IconAlertCircle/>}
                  // className="opacity-1 rounded-lg justify-end w-full"
              /> :
              <Alert
                  // did this so the form wont move down when the alert appears
                  title="no error"
                  className="opacity-0"/>
          }

          <form
              onSubmit={submit}
              className="flex flex-col justify-items-center border-2 p-5 rounded-lg mt-3 border-[var(--mantine-color-cb-9)]"
          >

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
      </div>
  );
}
