"use client"
import {Button, Modal, Text} from "@mantine/core";
import {useRouter} from "next/navigation";
import {editSubjectStatus} from "@/app/components/subjects_list/actions";

export default function AcceptSubjectModal({opened, close, subjectID, setSubjectID, setRefresh, setFeedbackMessage}) {
  const router = useRouter();
  return (
      <Modal opened={opened} onClose={() => {
        setSubjectID(null)
        close()
      }} withCloseButton={false} overlayProps={{blur: 4, backgroundOpacity: 0.55}}>
        <Text>Confirmez l&apos;acceptation du sujet</Text>
        <div className="flex justify-end mt-5">
          <Button bg="red" mr="20" onClick={() => {
            setSubjectID(null)
            close()
          }}>Annuler</Button>
          <Button bg="green" onClick={async () => {
            await editSubjectStatus(subjectID, "ACCEPTED")
            setSubjectID(null)
            router.refresh()
            setRefresh((refresh) => !refresh)
            close()
            setFeedbackMessage("Sujet accepté avec succès")
          }}>Valider</Button>
        </div>
      </Modal>
  )
}
