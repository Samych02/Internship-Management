"use client"

import {Button, Center, Group, Loader, Modal, Select, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {associateProfile, fetchAssignableSubjects} from "@/app/components/resumes/actions";

export default function AssociateProfileModal({profile, setProfile, setFeedbackMessage, close, opened}) {
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
      if (await associateProfile(data.subjectID, profile.id)) {
        setIsLoading(false)
        close()
        setProfile(null)
        setFeedbackMessage("Profile assigné avec succès")
      }

    })()
  }

  useEffect(() => {
    const fetchData = async () => {
      setSubjects(await fetchAssignableSubjects(profile.id))
      setIsLoading(false)
    }
    fetchData()
  }, [profile.id])
  return (
      <Modal
          opened={opened}
          onClose={() => {
            setProfile(null)
            close()
          }}
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
          size="xl"
          title={`Assigner un sujet au candidat(e): ${profile?.firstName} ${profile?.lastName}`}
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
