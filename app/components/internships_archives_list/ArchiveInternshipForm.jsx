"use client"
import {useForm} from "@mantine/form";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, FileInput, Group, Loader, Radio, Stack, Stepper, TextInput} from "@mantine/core";
import {YearPickerInput} from "@mantine/dates";
import {addInternshipAction} from "@/app/components/internships_archives_list/actions";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function ArchiveInternshipForm({setRefresh}) {
  const [active, setActive] = useState(0);
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
  const [loading, setLoading] = useState(false);


  const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          title: '',
          year: null, //hehe
          internshipType: "",
          team: "",
          managerFullName: "",
          supervisorFullName: "",
          internFullName: "",
          schoolName: "",
          reportFile: null,
          presentationFile: null
        },
        validate: {
          title: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          year: (value) => active === 0 && value === null ? "Champ requis" : null,
          internshipType: (value) => active === 0 && value.length < 1 ? "Champ requis" : null,
          reportFile: (value) => active === 3 && value === null ? "Champ requis" : value?.size > 10240000 ? "Fichier très volumineux" : null,
          presentationFile: (value) => active === 3 && value !== null && value?.size > 10240000 ? "Fichier très volumineux" : null,
        }
      }
  )

  const nextStep = () => setActive((current) => (form.validate().hasErrors ? current : current + 1))

  const prevStep = () => setActive((current) => (current - 1));

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      const formData = new FormData();
      for (let dataKey in data) {
        formData.append("year", data.year.getFullYear())
        if (data[dataKey] !== "" && data[dataKey] !== null && dataKey !== "year") formData.append(dataKey, data[dataKey]);
      }
      if (await addInternshipAction(formData)) {
        toggleSuccess.open()
        setLoading(false)
        form.reset()
        setActive(0);
      }
    })()
    setRefresh((refresh) => !refresh)
  }

  return (
      <form
          onSubmit={submit}
      >
        <SuccessAlert
            title="Stage archivé avec succès"
            close={toggleSuccess.close}
            opened={openedSuccess}
        />

        <Stepper
            active={active}
        >
          <Stepper.Step
              label="Identification sur le sujet"
          >
            <Stack
                gap="xl"
            >

              <TextInput
                  {...form.getInputProps('title')}
                  key={form.key('title')}
                  label="Sujet du stage"
                  placeholder="Sujet du stage"
              />

              <YearPickerInput
                  {...form.getInputProps('year')}
                  key={form.key('year')}
                  label="Année"
                  placeholder="Année"
                  maxDate={new Date()}

              />

              <Radio.Group
                  label="Type du stage"
                  {...form.getInputProps('internshipType')}
                  key={form.key('internshipType')}
              >
                <Group mt="xs">
                  <Radio value="PFE" label="PFE"/>
                  <Radio value="PFA" label="PFA"/>
                </Group>
              </Radio.Group>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Informations sur l'équipe">
            <Stack
                gap="xl"
            >
              <TextInput
                  {...form.getInputProps('team')}
                  key={form.key('team')}
                  label="Équipe"
                  placeholder="Équipe"
              />

              <TextInput
                  {...form.getInputProps('managerFullName')}
                  key={form.key('managerFullName')}
                  label="Nom complet du manager"
                  placeholder="Nom complet du manager"
              />

              <TextInput
                  {...form.getInputProps('supervisorFullName')}
                  key={form.key('supervisorFullName')}
                  label="Nom complet de l'encadrant"
                  placeholder="Nom complet de l'encadrant"
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Informations sur le stagiaire">
            <Stack
                gap="xl"
            >
              <TextInput
                  {...form.getInputProps('internFullName')}
                  key={form.key('internFullName')}
                  label="Nom complet du stagiaire"
                  placeholder="Nom complet du stagiaire"
              />
              <TextInput
                  {...form.getInputProps('schoolName')}
                  key={form.key('schoolName')}
                  label="Nom de l'école"
                  placeholder="Nom de l'école"
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Dépot des fichiers">
            <Stack
                gap="xl"
            >
              <FileInput
                  clearable
                  label="Rapport"
                  placeholder="Choisir un fichier PDF (max 10mo)"
                  accept="application/pdf"
                  {...form.getInputProps('reportFile')}
                  key={form.key('reportFile')}
              />
              <FileInput
                  clearable
                  label="Présentation"
                  placeholder="Choisir un fichier pptx (max 10mo)"
                  accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  {...form.getInputProps('presentationFile')}
                  key={form.key('presentationFile')}
              />
            </Stack>
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 &&
              <Button
                  variant="default"
                  onClick={prevStep}
                  disabled={loading}
              >
                Précédent
              </Button>
          }

          {active < 3 &&
              <Button
                  onClick={nextStep}
              >
                Suivant
              </Button>
          }

          {active === 3 &&
              <Button
                  type="submit"
                  disabled={loading}
              >
                {loading
                    ? <Loader color="white" type="bars" size="20"/>
                    : "Archiver"}
              </Button>
          }
        </Group>
      </form>
  )
}
