"use client"

import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {addResumeAction} from "@/app/components/resumes_list/actions";
import {Alert, Button, FileInput, Group, Loader, NativeSelect, TextInput} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";

export default function AddResumeForm({setRefresh}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled', initialValues: {
      internFullName: '', studyField: "", file: null
    },

    validate: {
      internFullName: (value) => value.length < 1 ? "Champ requis" : null,
      studyField: (value) => value.length < 1 ? "Champ requis" : null,
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
      formData.append("internFullName", data.internFullName)
      formData.append("studyField", data.studyField)
      formData.append("file", data.file)
      if (await addResumeAction(formData)) {
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
          title={`CV recommandé avec succès`}
          icon={<IconAlertCircle/>}
          withCloseButton
          onClose={close}
      />}
      <TextInput
          {...form.getInputProps('internFullName')}
          key={form.key('internFullName')}
          label="Nom complet du stagiaire"
          placeholder="Nom complet du stagiaire"
          className="mb-5"
      />
      <NativeSelect
          label="Domaine de stage"
          data={[{
            label: "Choisissez une option", value: ""
          }, ...Object.entries(STUDY_FIELD).map(([key, value]) => ({label: value, value: key}))]}
          {...form.getInputProps('studyField')}
          key={form.key('studyField')}
          className="mb-5"
      />
      <FileInput
          clearable
          label="CV"
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
