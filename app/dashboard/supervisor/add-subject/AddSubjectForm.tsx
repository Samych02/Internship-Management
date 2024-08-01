"use client"
import {FormEvent, useState} from 'react';
import {ActionIcon, Alert, Button, Group, Loader, Stepper, Text, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {registerAction} from "@/app/dashboard/admin/register/actions";
import {useDisclosure} from "@mantine/hooks";
import {IconAlertCircle, IconTrash} from "@tabler/icons-react";
import {checkTitleUsedAction} from "@/app/dashboard/supervisor/add-subject/actions";

export default function AddSubjectForm() {
  const [active, setActive] = useState(0);
  let titleUsed = true
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [targetSchools, setTargetSchools] = useState<string[]>([]);
  const [targetSpecialities, setTargetSpecialities] = useState<string[]>([]);


  const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          title: '',
          tasks: [{task: ''}],
          internType: '',
          targetSchools: targetSchools,
          targetSpecialities: targetSpecialities,
          competenciesRequired: {},
          supervisor: '',
          internNumber: 0
        },

        validate: {
          title: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          tasks: {
            task: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          }
        }
      }
  )

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

  const tasksField = form.getValues().tasks.map((item, index) => (
      <Group key={index} mt="xs">
        <TextInput
            placeholder="Tâche"
            withAsterisk
            key={form.key(`tasks.${index}.task`)}
            {...form.getInputProps(`tasks.${index}.task`)}
            className="flex-1 self-start"
        />

        <ActionIcon color="red" onClick={() => {
          if (form.getValues().tasks.length > 1) form.removeListItem('tasks', index)
        }} size="lg" className="self-start" opacity={form.getValues().tasks.length > 1 ? 1 : 0}>
          <IconTrash size="1.5rem"/>
        </ActionIcon>
      </Group>
  ));

  return (<div className="w-[50%]">

        <form onSubmit={submit}>
          {opened && <Alert
              color="green"
              mb="1rem"
              title={"Sujet ajouté avec succès"}
              icon={<IconAlertCircle/>}
              withCloseButton
              onClose={close}
          />}
          <Stepper active={active}>
            <Stepper.Step label="Identification du sujet">
              <TextInput
                  {...form.getInputProps('title')}
                  key={form.key('title')}
                  label="Sujet et contexte du stage"
                  placeholder="Sujet et contexte du stage"
                  className="mb-5"
              />

              <Text fw={500} size="sm" style={{flex: 1}}>Description des tâches qui seront assignées au stagiaire</Text>
              {tasksField}

              <Group justify="center" mt="md">
                <Button
                    onClick={() =>
                        form.insertListItem('tasks', {task: ''})
                    }
                    color="cb.3"
                >
                  Ajouter une nouvelle tâche
                </Button>
              </Group>


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
                  titleUsed = await checkTitleUsedAction(form.getValues().title)
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
