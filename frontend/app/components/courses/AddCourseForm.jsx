"use client"
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Group, Loader, Select, Stack, TextInput} from "@mantine/core";
import {addCourse} from "@/app/components/courses/actions";
import COURSE_STATUS from "@/app/constants/COURSE_STATUS";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function AddCourseForm({setRefresh}) {
  const [openedSuccess, toggleSuccess] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: "",
      link: "",
      organism: "",
      courseStatus: ""
    },

    validate: {
      title: (value) => value.length < 1 ? "Champ requis" : null,
      link: (value) => value.length < 1 ? "Champ requis" : !/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/.test(value) ? "Lien invalide" : null,
      organism: (value) => value.length < 1 ? "Champ requis" : null,
      courseStatus: (value) => value.length < 1 ? "Champ requis" : null,
    }
  })

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      setLoading(true)
      if (await addCourse(data)) {
        toggleSuccess.open()
        setLoading(false)
        form.reset()
      }
    })()
    setRefresh((refresh) => !refresh)
  }
  return (
      <form
          onSubmit={submit}
      >
        <SuccessAlert
            title="Formation ajoutée avec succès"
            close={toggleSuccess.close}
            opened={openedSuccess}
        />
        <Stack
            gap="xl"
        >

          <TextInput
              {...form.getInputProps('title')}
              key={form.key('title')}
              label="Titre de la formation"
              placeholder="Titre de la formation"
          />

          <TextInput
              {...form.getInputProps('organism')}
              key={form.key('organism')}
              label="Organisme"
              placeholder="Organisme"
          />

          <TextInput
              {...form.getInputProps('link')}
              key={form.key('link')}
              label="Lien de la formation"
              placeholder="Lien de la formation"
          />

          <Select
              label="Status de la formation"
              placeholder="Choisissez une option"
              data={[...Object.entries(COURSE_STATUS).map(([key, value]) => ({label: value, value: key}))]}
              {...form.getInputProps('courseStatus')}
              key={form.key('courseStatus')}
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
