"use client"
import {useState} from 'react';
import {
  ActionIcon,
  Alert,
  Button,
  Group,
  Loader,
  NativeSelect,
  NumberInput,
  Radio,
  Stepper,
  TagsInput,
  Text,
  TextInput
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {randomId, useDisclosure} from "@mantine/hooks";
import {IconAlertCircle, IconTrash} from "@tabler/icons-react";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";
import {addSubjectAction, checkTitleUsedAction, editSubjectAction} from "@/app/components/subjects_list/actions";

export default function AddSubjectForm({existingSubject = null, setRefresh}) {
  const [active, setActive] = useState(0);
  let titleUsed = false
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);


  const form = useForm({
        mode: 'uncontrolled',
    initialValues: existingSubject ?? {
          title: '',
          tasks: [{task: ''}],
          internType: '',
          targetSchools: [],
          targetSpecialities: [],
          competenciesRequired: [{category: "", details: []}],
      internshipType: "",
      studyField: "",
          supervisor: '',
          internNumber: null
        },

        validate: {
          title: (value) => active === 0 && value.length < 1 ? "Champ requis"
              : titleUsed ? "Sujet déjà existant" : null,
          tasks: {
            task: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          },
          internType: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
          targetSchools: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
          targetSpecialities: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
          competenciesRequired: {
            details: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
            category: (value) => active === 1 && value.length < 1 ? "Champ requis" : null,
          },
          internshipType: (value) => active === 2 && value.length < 1 ? "Champ requis" : null,
          studyField: (value) => active === 2 && value.length < 1 ? "Champ requis" : null,
          supervisor: (value) => active === 2 && value.length < 1 ? "Champ requis" : null,
          internNumber: (value) => active === 2 && value < 1 && value == null ? "Champ requis" : null,

        }
      }
  )

  const nextStep = () => setActive((current) => (form.validate().hasErrors ? current : current + 1))

  const prevStep = () => setActive((current) => (current - 1));

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      if (existingSubject == null && await addSubjectAction(data)) {
        open()
        setLoading(false)
        form.reset()
        setActive(0);
      }
      if (existingSubject && await editSubjectAction(existingSubject.id, data)) {
        open()
        setLoading(false)
        form.reset()
        setActive(0);
      }
    })()
    setRefresh((refresh) => !refresh)
  }

  const tasksField = form.getValues().tasks.map((item, index) => (
      <Group key={randomId()} mt="xs">
        <TextInput
            placeholder="Tâche"
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
  const competenciesRequiredField = form.getValues().competenciesRequired.map((item, index) => (
      <Group key={randomId()} mt="xs">
        <TextInput
            placeholder="Catégorie"
            key={form.key(`competenciesRequired.${index}.category`)}
            {...form.getInputProps(`competenciesRequired.${index}.category`)}
            className="flex-3 self-start"
        />
        <TagsInput placeholder="Saisissez le nom d'une compétence puis appuyer sur entrer"
                   {...form.getInputProps(`competenciesRequired.${index}.details`)}
                   key={form.key(`competenciesRequired.${index}.details`)}
                   className="flex-1 self-start"
        />

        <ActionIcon color="red" onClick={() => {
          if (form.getValues().competenciesRequired.length > 1) form.removeListItem('competenciesRequired', index)
        }} size="lg" className="self-start" opacity={form.getValues().competenciesRequired.length > 1 ? 1 : 0}>
          <IconTrash size="1.5rem"/>
        </ActionIcon>
      </Group>
  ));

  return (<div className="">

        <form onSubmit={submit}>
          {opened && <Alert
              color="green"
              mb="1rem"
              title={`Sujet ${existingSubject === null ? "ajouté" : "modifié"} avec succès`}
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
                  disabled={existingSubject != null}
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

            <Stepper.Step label="Identification du profil">
              <Radio.Group
                  label="Type du profil"
                  {...form.getInputProps('internType')}
                  key={form.key('internType')}
                  className="mb-5"
              >
                <Group mt="xs" mb="xs">
                  <Radio value="TECHNICIAN" label="Technicien"/>
                  <Radio value="ENGINEER" label="Ingénieur"/>
                </Group>
              </Radio.Group>

              <TagsInput label="Ecoles cibles"
                         placeholder="Saisissez le nom d'une école puis appuyer sur entrer"
                         {...form.getInputProps('targetSchools')}
                         key={form.key('targetSchools')}
                         className="mb-5"/>
              <TagsInput label="Spécialités cibles"
                         placeholder="Saisissez le nom d'une spécialité puis appuyer sur entrer"
                         {...form.getInputProps('targetSpecialities')}
                         key={form.key('targetSpecialities')}
                         className="mb-5"/>
              <Text fw={500} size="sm" style={{flex: 1}}>Compétences recherchées</Text>
              {competenciesRequiredField}

              <Group justify="center" mt="md">
                <Button
                    onClick={() =>
                        form.insertListItem('competenciesRequired', {category: "", details: []})
                    }
                    color="cb.3"
                >
                  Ajouter une nouvelle catégorie
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Step label="Informations sur le stage">
              <Radio.Group
                  label="Type du stage"
                  {...form.getInputProps('internshipType')}
                  key={form.key('internshipType')}
                  className="mb-5"
              >
                <Group mt="xs" mb="xs">
                  <Radio value="PFE" label="PFE"/>
                  <Radio value="PFA" label="PFA"/>
                </Group>
              </Radio.Group>
              <NativeSelect
                  label="Catégorie du stage"
                  data={[
                    {label: "Choisissez une option", value: ""},
                    ...Object.entries(STUDY_FIELD).map(([key, value]) => ({label: value, value: key}))
                  ]}
                  {...form.getInputProps('studyField')}
                  key={form.key('studyField')}
                  className="mb-5"
              />
              <TextInput
                  {...form.getInputProps('supervisor')}
                  key={form.key('supervisor')}
                  label="Nom de l'encadrant"
                  placeholder="Nom de l'encadrant"
                  className="mb-5"
              />
              <NumberInput
                  {...form.getInputProps('internNumber')}
                  key={form.key('internNumber')}
                  label="Nombre de stagiaires à mettre sur le sujet"
                  placeholder="Nombre de stagiaires à mettre sur le sujet"
                  min={1}
                  max={1000}
                  className="mb-8"
              />

            </Stepper.Step>
          </Stepper>

          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
                <Button variant="default" onClick={prevStep} disabled={loading}>
                  Précédent
                </Button>
            )}
            {active < 2 &&
                <Button onClick={async () => {
                  if (active === 0 && existingSubject === null) {
                    close()
                    titleUsed = await checkTitleUsedAction(form.getValues().title)
                  }
                  nextStep()
                }}>Suivant</Button>}
            {active === 2 &&
                <Button type="submit"
                        disabled={loading}
                >
                  {loading
                      ? <Loader color="white" type="bars" size="20"/>
                      : existingSubject === null ? "Ajouter" : "Modifier"}
                </Button>}
          </Group>
        </form>
      </div>
  );
}
