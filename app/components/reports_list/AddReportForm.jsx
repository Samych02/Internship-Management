"use client"

import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Alert, Button, FileInput, Group, Loader, TextInput} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import {addReport} from "@/app/components/reports_list/actions";
import '@mantine/dates/styles.css';
import {DateInput} from "@mantine/dates";

export default function AddReportForm({setRefresh}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled', initialValues: {
      summary: '', date: "", file: null
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
        open()
        setLoading(false)
        form.reset()
      }
    })()
    setRefresh((refresh) => !refresh)

  }
  return (<div className="">

    <form onSubmit={submit}>
      {opened && <Alert
          color="green"
          mb="1rem"
          title={`Compte rendu ajouté avec succès`}
          icon={<IconAlertCircle/>}
          withCloseButton
          onClose={close}
      />}
      <TextInput
          {...form.getInputProps('summary')}
          key={form.key('summary')}
          label="Résumé"
          placeholder="Résumé"
          className="mb-5"
      />
      <DateInput
          {...form.getInputProps('date')}
          key={form.key('date')}
          label="Date du compte rendu"
          placeholder="Date du compte rendu"
          valueFormat="DD-MM-YYYY"
          maxDate={new Date()}
          className="mb-5"
      />
      <FileInput
          clearable
          label="Compte rendu"
          placeholder="Choisir un fichier PDF (max 10mo)"
          accept="application/pdf"
          {...form.getInputProps('file')}
          key={form.key('file')}
      />

      <Group justify="flex-end" mt="xl">
        <Button type="submit"
                disabled={loading}
        >
          {loading ? <Loader color="white" type="bars" size="20"/> : "Ajouter"}
        </Button>
      </Group>
    </form>
  </div>);
}
