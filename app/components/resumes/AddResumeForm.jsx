"use client"

import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {addResumeAction, checkProfileExisting} from "@/app/components/resumes/actions";
import {Button, FileInput, Group, Loader, Select, Stack, TextInput} from "@mantine/core";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function AddResumeForm({setRefresh}) {
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  let isProfileExisting = false
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: "",
      studyField: "",
      file: null,
    },
    validate: {
      firstName: (value) => value.length < 1 ? "Champ requis"
          : isProfileExisting ? "Profile déjà recommandé" : null,
      lastName: (value) => value.length < 1 ? "Champ requis"
          : isProfileExisting ? "Profile déjà recommandé" : null,
      studyField: (value) => value.length < 1 ? "Champ requis" : null,
      file: (value) => value === null ? "Champ requis" : value.type !== "application/pdf" ? "Format fichier invalid" : value.size > 10240000 ? "Fichier très volumineux" : null,
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    isProfileExisting = await checkProfileExisting(form.getValues().firstName, form.getValues().lastName)
    if (form.validate().hasErrors) {
      return
    }
    form.onSubmit(async (data) => {
      setLoading(true)
      const formData = new FormData();
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("studyField", data.studyField)
      formData.append("file", data.file)
      if (await addResumeAction(formData)) {
        toggleSuccess.open()
        setLoading(false)
        form.reset()
      }

    })()
    setRefresh((refresh) => !refresh)
  }
  return (
      <form onSubmit={submit}>
        <SuccessAlert
            opened={openedSuccess}
            close={toggleSuccess.close}
            title="CV recommandé avec succès"
        />
        <Stack
            gap="xl"
        >
          <Group
          >
            <TextInput
                {...form.getInputProps('firstName')}
                key={form.key('firstName')}
                label="Prénom du stagiaire"
                placeholder="Prénom du stagiaire"
                flex="1"
            />

            <TextInput
                {...form.getInputProps('lastName')}
                key={form.key('lastName')}
                label="Nom du stagiaire"
                placeholder="Nom du stagiaire"
                flex="1"
            />
          </Group>


          <Select
              label="Domaine de stage"
              placeholder="Choisissez une option"
              data={[
                ...Object.entries(STUDY_FIELD).map(([key, value]) => ({label: value, value: key}))
              ]}
              {...form.getInputProps('studyField')}
              key={form.key('studyField')}
          />

          <FileInput
              clearable
              label="CV"
              placeholder="Choisir un fichier PDF (max 10mo)"
              accept="application/pdf"
              {...form.getInputProps('file')}
              key={form.key('file')}
          />

          <Group
              justify="flex-end"
          >
            <Button
                type="submit"
                disabled={loading}
            >
              {loading ? <Loader color="white" type="bars" size="20"/> : "Ajouter"}
            </Button>
          </Group>
        </Stack>
      </form>
  );
}
