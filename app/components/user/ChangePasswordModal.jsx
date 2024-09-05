"use client"
import {Button, Group, Modal, PasswordInput, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {updatePassword} from "@/app/dashboard/actions";
import ErrorAlert from "@/app/components/feedback/ErrorAlert";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function ChangePasswordModal({opened, toggle}) {
  const [errorOpened, toggleError] = useDisclosure(false)
  const [successOpened, toggleSuccess] = useDisclosure(false)

  const form = useForm({
    mode: 'uncontrolled', initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validate: {
      oldPassword: (value) => value.length < 1 ? "Champ requis" : null,
      newPassword: (value) => value.length < 1 ? "Champ requis" : null,
    },
  })

  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      if (await updatePassword(data)) {
        toggleSuccess.open()
      } else {
        toggleError.open()
      }
      form.reset()
    })()
  }

  return (
      <Modal
          opened={opened}
          onClose={toggle.close}
          withCloseButton
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
      >
        <ErrorAlert
            close={toggleError.close}
            opened={errorOpened}
            title="Ancien mot de passe incorrect"
        />

        <SuccessAlert
            close={toggleSuccess.close}
            opened={successOpened}
            title="Mot de passe modifié avec succes!"
        />

        <form onSubmit={submit}>
          <Title
              order={3}
              mb="1rem"
          >
            Modifier votre mot de passe
          </Title>

          <PasswordInput
              {...form.getInputProps('oldPassword')}
              key={form.key('oldPassword')}
              label="Ancien mot de passe"
              placeholder="Ancien mot de passe"
              mb="0.5rem"
          />

          <PasswordInput
              {...form.getInputProps('newPassword')}
              key={form.key('newPassword')}
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              mb="1rem"
          />

          <Group
              justify="center"
              mt="xl"
          >
            <Button
                type="submit"
            >
              Modifier
            </Button>
          </Group>
        </form>
      </Modal>
  )
}
