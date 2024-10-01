"use client"

import {Button, Center, Group, Loader, Modal, Select, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {addCandidature, fetchAssignableSubjects} from "@/app/components/resumes/actions";

export default function AssociateProfileModal({resume, setResume, setFeedbackMessage, close, opened}) {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      subjectID: null,
    },
    validate: {
      subjectID: (value) => value === null ? "Champ requis" : null,
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    if (form.validate().hasErrors) {
      return
    }
    form.onSubmit(async (data) => {
      setIsLoading(true)
      if (await addCandidature(data.subjectID, resume.id)) {
        setIsLoading(false)
        close()
        setResume(null)
        setFeedbackMessage("Profile assigné avec succès")
      }

    })()
  }

  useEffect(() => {
    const fetchData = async () => {
      setSubjects(await fetchAssignableSubjects(resume.id))
      setIsLoading(false)
    }
    fetchData()
  }, [resume.id])
  return (
      <Modal
          opened={opened}
          onClose={() => {
            setResume(null)
            close()
          }}
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
          size="xl"
          title={`Assigner un sujet au candidat(e): ${resume?.internFirstName} ${resume?.internLastName}`}
      >
        {subjects.length === 0
            ? !isLoading && <Center
            mb="1rem"
        >
          Aucun sujet disponible!
        </Center>
            : !isLoading && <form
            onSubmit={submit}
        >
          <Stack>
            <Select
                label="Sujet à affecter"
                placeholder="Choisissez un sujet"
                data={[...subjects.map(subject => ({label: subject.title, value: subject.id.toString()}))]}
                {...form.getInputProps('subjectID')}
                key={form.key('subjectID')}
                searchable
            />
            <Group
                mt="1rem"
                justify="center"
            >
              <Button
                  type="submit"
                  disabled={isLoading}
              >
                {isLoading ? <Loader color="white" type="bars" size="20"/> : "Assigner"}
              </Button>
            </Group>
          </Stack>
        </form>
        }
      </Modal>
  )
}
