"use client"
import {useState} from 'react';
import {Button, Center, Group, Loader, PasswordInput, Select, Stack, Stepper, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import ROLES from "@/app/constants/ROLES";
import {checkEmailUsedAction, registerAction} from "@/app/components/user/actions";
import {useDisclosure} from "@mantine/hooks";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function RegisterUserForm({setRefresh}) {
  const [active, setActive] = useState(0);
  let mailUsed = false
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          userRole: '',
        },
        validate: {
          firstName: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          lastName: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          email: (value) => active === 1 && (value.length < 1 ? "Champ requis"
              : !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) ? "Email invalid"
                  : mailUsed ? "Email déjà utilisé" : null),
          password: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
          userRole: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
        },
      })
  ;

  const nextStep = () => setActive((current) => (form.validate().hasErrors ? current : current + 1))

  const prevStep = () => setActive((current) => (current - 1));

  const submit = async (event) => {
    event.preventDefault()
    mailUsed = await checkEmailUsedAction(form.getValues().email)
    if (form.validate().hasErrors) {
      return
    }
    form.onSubmit(async (data) => {
      setLoading(true)
      if (await registerAction(data)) {
        toggleSuccess.open()
        setLoading(false)
        form.reset()
        setActive(0);
        setRefresh((refresh) => !refresh)
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
                  defaultVisible={true}
              />
              <Select
                  label="Role"
                  placeholder="Choisissez une option"
                  data={[...Object.entries(ROLES).map(([key, value]) => ({label: value, value: key}))]}
                  {...form.getInputProps('userRole')}
                  key={form.key('userRole')}
              />

              <Center>Veuillez noter l&apos;email et le mot de passe ci-dessus</Center>
            </Stack>
          </Stepper.Step>
        </Stepper>

        <Group
            justify="flex-end"
            mt="xl"
        >
          {active !== 0 &&
              <Button
                  onClick={prevStep}
                  disabled={loading}
              >
                Précédent
              </Button>
          }

          {active === 0 &&
              <Button
                  onClick={() => {
                    form.getValues().email = `${form.getValues().firstName.replace(" ", "-")}.${form.getValues().lastName.replace(" ", "-")}@capgemini.com`;
                    form.getValues().password = Math.floor(100000 + Math.random() * 900000)
                    nextStep()
                  }}
              >
                Suivant
              </Button>
          }

          {active === 1 &&
              <Button
                  type="submit"
                  disabled={loading}
              >
                {loading
                    ? <Loader color="white" type="bars" size="20"/>
                    : "Ajouter"
                }
              </Button>
          }
        </Group>
      </form>
  );
}
