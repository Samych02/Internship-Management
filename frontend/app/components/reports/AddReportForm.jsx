"use client"

import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, FileInput, Group, Loader, Stack, TextInput} from "@mantine/core";
import {addReport} from "@/app/components/reports/actions";
import '@mantine/dates/styles.css';
import {DateInput} from "@mantine/dates";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function AddReportForm({setRefresh}) {
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      summary: '',
      date: "",
      file: null
    },

    validate: {
      summary: (value) => value.length < 1 ? "Champ requis" : null,
      date: (value) => value.length < 1 ? "Champ requis" : null,
      file: (value) => value === null ? "Champ requis" : value.type !== "application/pdf" ? "Format fichier invalid" : value.size > 10240000 ? "Fichier très volumineux" : null,
    }
  })

  const submit = (event) => {
    event.preventDefault()
    if (form.validate().hasErrors) {
      return
    }
    form.onSubmit(async (data) => {
      setLoading(true)
      const formData = new FormData();
      formData.append("summary", data.summary)
      formData.append("date", new Date(data.date).toISOString().split('T')[0])
      formData.append("file", data.file)
      if (await addReport(formData)) {
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
            title="Compte rendu ajouté avec succès"
        />
        <Stack
            gap="xl"
        >
          <TextInput
              {...form.getInputProps('summary')}
              key={form.key('summary')}
              label="Résumé"
              placeholder="Résumé"
          />

          <DateInput
              {...form.getInputProps('date')}
              key={form.key('date')}
              label="Date du compte rendu"
              placeholder="Date du compte rendu"
              valueFormat="DD-MM-YYYY"
              maxDate={new Date()}
          />

          <FileInput
              clearable
              label="Compte rendu"
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
