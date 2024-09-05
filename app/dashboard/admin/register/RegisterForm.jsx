"use client"
import {useState} from 'react';
import {Button, Group, Loader, NativeSelect, PasswordInput, Stack, Stepper, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import ROLES from "@/app/constants/ROLES";
import {checkEmailUsedAction, registerAction} from "@/app/dashboard/admin/register/actions";
import {useDisclosure} from "@mantine/hooks";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function RegisterForm() {
  const [active, setActive] = useState(0);
  let mailUsed = true
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
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

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      if (await registerAction(data)) {
        toggleSuccess.open()
        setLoading(false)
        form.reset()
        setActive(0);
      }
    })()
  }

  return (
      <form
          onSubmit={submit}
      >
        <SuccessAlert
            title="Utilisateur ajouté avec succès"
            close={toggleSuccess.close}
            opened={openedSuccess}
        />

        <Stepper active={active}>
          <Stepper.Step label="Identifiants">
            <Stack
                gap="xl"
            >
              <TextInput
                  {...form.getInputProps('email')}
                  key={form.key('email')}
                  label="Email"
                  placeholder="Email"
              />

              <PasswordInput
                  {...form.getInputProps('password')}
                  key={form.key('password')}
                  label="Mot de passe"
                  placeholder="Mot de passe"
              />
              <NativeSelect
                  label="Role"
                  data={[
                    {label: "Choisissez une option", value: ""},
                    ...Object.entries(ROLES).map(([key, value]) => ({label: value, value: key}))
                  ]}
                  {...form.getInputProps('userRole')}
                  key={form.key('userRole')}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Informations personnelles">
            <Stack
                gap="xl"
            >
              <TextInput
                  label="Prénom"
                  placeholder="Prénom"
                  key={form.key('firstName')}
                  {...form.getInputProps('firstName')}
              />
              <TextInput
                  label="Nom"
                  placeholder="Nom"
                  key={form.key('lastName')}
                  {...form.getInputProps('lastName')}
              />
            </Stack>
          </Stepper.Step>
        </Stepper>

        <Group
            justify="flex-end"
        >
          {active !== 0 &&
              <Button
                  onClick={prevStep}
              >
                Précédent
              </Button>
          }

          {active === 0
              ? <Button
                  onClick={async () => {
                    mailUsed = await checkEmailUsedAction(form.getValues().email)
                    nextStep()
                  }}
              >
                Suivant
              </Button>
              : <Button
                  type="submit"
                  disabled={loading}
              >
                {loading
                    ? <Loader color="white" type="bars" size="20"/>
                    : "Ajouter"}
              </Button>
          }
        </Group>
      </form>
  );
}
