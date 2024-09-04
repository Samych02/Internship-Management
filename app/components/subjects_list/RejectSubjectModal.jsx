"use client"
import {Button, Modal, Text, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {editSubjectStatus} from "@/app/components/subjects_list/actions";
import {useForm} from "@mantine/form";

export default function RejectSubjectModal({opened, close, subjectID, setSubjectID, setRefresh, setFeedbackMessage}) {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled', initialValues: {
      reason: '',
    }, validate: {
      reason: (value) => value.length < 1 ? "Champ requis" : null,
    }
  })
  const submit = (event) => {
    event.preventDefault()
    form.onSubmit(async (data) => {
      await editSubjectStatus(subjectID, "REJECTED", data.reason)
      setSubjectID(null)
      close()
      router.refresh()
      setRefresh((refresh) => !refresh)
      setFeedbackMessage("Sujet rejeté avec succès")
    })()
  }
  return (<Modal opened={opened} onClose={() => {
    setSubjectID(null)
    close()
  }} withCloseButton={false} overlayProps={{blur: 4, backgroundOpacity: 0.55}}>
    <Text mb="10">Confirmez le refus du sujet</Text>
    <form onSubmit={submit}>
      <TextInput
          {...form.getInputProps('reason')}
          key={form.key('reason')}
          label="Raison du refus"
          placeholder="Raison du refus"
          className="mb-8"
      />
      <div className="flex justify-end">
        <Button bg="red" mr="20" onClick={() => {
          setSubjectID(null)
          close()
        }}>Annuler</Button>
        <Button bg="green" type="submit">Valider</Button>
      </div>
    </form>
  </Modal>)
}
