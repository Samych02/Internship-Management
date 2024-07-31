"use client"
import {FormEvent, useState} from 'react';
import {Alert, Button, Group, Loader, NativeSelect, PasswordInput, Stepper, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import ROLES from "@/app/lib/roles";
import {checkEmailUsedAction, registerAction} from "@/app/dashboard/admin/register/actions";
import {useDisclosure} from "@mantine/hooks";
import {IconAlertCircle} from "@tabler/icons-react";

export default function RegisterForm() {
  const stepNumber = 2
  const [active, setActive] = useState(0);
  let mailUsed = true
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      userRole: '',
      firstName: '',
      lastName: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          email:
              !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)
                  ? "Email invalid"
                  : mailUsed
                      ? "Email déjà utilisé"
                      : null,

          password:
              values.password.length < 1
                  ? "Mot de passe requis"
                  : null,
          userRole:
              Object.entries(ROLES).map(([key]) => (key)).includes(values.userRole)
                  ? null
                  : "Role requis",
        };
      }

      if (active === 1) {
        return {
          firstName: values.firstName.length < 1
              ? 'Prénom requis'
              : null,

          lastName: values.lastName.length < 1
              ? 'Nom requis'
              : null,
        };
      }
      return {}
    },
  });

  const nextStep = () => setActive((current) => (form.validate().hasErrors ? current : current + 1))

  const prevStep = () => setActive((current) => (current - 1));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      if (await registerAction(data)) {
        open()
        setLoading(false)
        form.reset()
        setActive(0);
      }
    })()
  }

  return (<div className="w-[50%]">

        <form onSubmit={submit}>
          {opened && <Alert
              color="green"
              mb="1rem"
              title={"Utilisateur ajouté avec succès"}
              icon={<IconAlertCircle/>}
              withCloseButton
              onClose={close}
          />}
          <Stepper active={active}>
            <Stepper.Step label="Identifiants">
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
                  className="mb-5"
              />
              <NativeSelect
                  label="Role"
                  data={[
                    {label: "Choisissez une option", value: ""},
                    ...Object.entries(ROLES).map(([key, value]) => ({label: value, value: key}))
                  ]}
                  {...form.getInputProps('userRole')}
                  key={form.key('userRole')}
                  className="mb-8"
              />

            </Stepper.Step>

            <Stepper.Step label="Informations personnelles">
              <TextInput
                  label="Prénom"
                  placeholder="Prénom"
                  key={form.key('firstName')}
                  {...form.getInputProps('firstName')}
                  className="mb-5"
              />
              <TextInput
                  label="Nom"
                  placeholder="Nom"
                  key={form.key('lastName')}
                  {...form.getInputProps('lastName')}
                  className="mb-8"
              />
            </Stepper.Step>
          </Stepper>

          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Précédent
                </Button>
            )}
            {active === 0
                ? <Button onClick={async () => {
                  mailUsed = await checkEmailUsedAction(form.getValues().email)
                  close()
                  nextStep()
                }}>Suivant</Button>
                : <Button
                    type="submit"
                >
                  {loading
                      ? <Loader color="white" type="bars" size="20"/>
                      : "Ajouter"}
                </Button>}
          </Group>
        </form>
      </div>
  );
}
