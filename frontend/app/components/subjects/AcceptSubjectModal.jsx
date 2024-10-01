"use client"
import {Button, Group, Modal, Text} from "@mantine/core";
import {useRouter} from "next/navigation";
import {editSubjectStatus} from "@/app/components/subjects/actions";

export default function AcceptSubjectModal({opened, close, subjectID, setSubjectID, setRefresh, setFeedbackMessage}) {
  const router = useRouter();
  return (
      <Modal
          opened={opened}
          onClose={() => {
            setSubjectID(null)
            close()
          }}
          withCloseButton={false}
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
      >
        <Text>
          Confirmez l&apos;acceptation du sujet
        </Text>
        <Group
            mt="1rem"
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
              onClick={async () => {
                await editSubjectStatus(subjectID, "ACCEPTED")
                setSubjectID(null)
                router.refresh()
                setRefresh((refresh) => !refresh)
                close()
                setFeedbackMessage("Sujet accepté avec succès")
              }}
          >
            Valider
          </Button>
        </Group>
      </Modal>
  )
}
