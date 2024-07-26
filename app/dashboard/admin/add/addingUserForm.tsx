"use client"
import {useState} from 'react';
import {Button, Group, NativeSelect, Notification, PasswordInput, Stepper, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {addingUserAction, isEmailUsed} from "@/app/dashboard/admin/add/page";
import {IconCheck} from "@tabler/icons-react";
import {useSearchParams} from "next/navigation";

export default function AddingUserForm() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState(0);
  const [opacity, setOpacity] = useState(0);
  let mailUsed = true

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
              ["ADMIN", "MANAGER"].includes(values.userRole)
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

  const nextStep = () => {
    setOpacity(0)
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });
  }

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const submit = form.onSubmit(async (data) => {
    if (await addingUserAction(data)) setOpacity(1)
    setActive(0)
    form.reset()
  })

  return (<div className="w-[50%]">
        <Notification color="green" title="Utilisateur ajouté avec succes"
                      className="w-full border-[2px] mb-5 border-green-600"
                      style={{opacity: opacity}}
                      icon={<IconCheck width={20} height={20}/>}
                      onClose={
                        () => setOpacity(0)
                      }/>
        <form onSubmit={submit}>
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
                    {label: 'Administrateur', value: 'ADMIN'},
                    {label: 'Manager', value: 'MANAGER'},
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
            {active !== 1 ?
                <Button onClick={async () => {
                  if (active === 0) {
                    mailUsed = await isEmailUsed(form.getValues().email)
                  }
                  nextStep()
                }}>Suivant</Button> :
                <Button type="submit">Ajouter</Button>}
          </Group>
        </form>
      </div>
  );
}
