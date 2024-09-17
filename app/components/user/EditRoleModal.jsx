"use client"
import {Button, Group, Modal, Select, Stack, Text, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {editSubjectStatus} from "@/app/components/subjects/actions";
import {useForm} from "@mantine/form";
import {editUserRole} from "@/app/components/user/actions";
import ROLES from "@/app/constants/ROLES";

export default function EditRoleModal({opened, close, userID, setUserID, setRefresh, setFeedbackMessage}) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      userRole: '',
    },
    validate: {
      userRole: (value) => value.length < 1 ? "Champ requis" : null,
    },
  })

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      await editUserRole(userID, data.userRole)
      setUserID(null)
      close()
      setRefresh((refresh) => !refresh)
      setFeedbackMessage("Role modifié avec succès")
    })()
  }

  return (
      <Modal
          opened={opened}
          onClose={() => {
            setUserID(null)
            close()
          }}
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
          withCloseButton={false}
      >
        <Text mb="1rem">
          {"Modifier le role de l'utilisateur"}
        </Text>

        <form onSubmit={submit}>
          <Stack>

            <Select
                label="Role"
                placeholder="Choisissez une option"
                data={[...Object.entries(ROLES).map(([key, value]) => ({label: value, value: key}))]}
                {...form.getInputProps('userRole')}
                key={form.key('userRole')}
            />
            <Group
                justify="flex-end"
            >
              <Button
                  bg="red"
                  onClick={() => {
                    setSubjectID(null)
                    close()
                  }}
              >
                Annuler
              </Button>

              <Button
                  bg="green"
                  type="submit"
              >
                Valider
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
  )
}
