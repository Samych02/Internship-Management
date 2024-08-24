"use client"

import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Alert, Button, Group, Loader, NativeSelect, TextInput} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import {addCourse} from "@/app/components/courses/actions";
import COURSE_STATUS from "@/app/constants/COURSE_STATUS";

export default function AddCourseForm({setRefresh}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled', initialValues: {
      title: "", link: "", organism: "", courseStatus: ""
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
          title={`Formation ajoutée avec succès`}
          icon={<IconAlertCircle/>}
          withCloseButton
          onClose={close}
      />}
      <TextInput
          {...form.getInputProps('title')}
          key={form.key('title')}
          label="Titre de la formation"
          placeholder="Titre de la formation"
          className="mb-5"
      />
      <TextInput
          {...form.getInputProps('organism')}
          key={form.key('organism')}
          label="Organisme"
          placeholder="Organisme"
          className="mb-5"
      />
      <TextInput
          {...form.getInputProps('link')}
          key={form.key('link')}
          label="Lien de la formation"
          placeholder="Lien de la formation"
          className="mb-5"
      />
      <NativeSelect
          label="Status de la formation"
          data={[{
            label: "Choisissez une option", value: ""
          }, ...Object.entries(COURSE_STATUS).map(([key, value]) => ({label: value, value: key}))]}
          {...form.getInputProps('courseStatus')}
          key={form.key('courseStatus')}
          className="mb-8"
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
