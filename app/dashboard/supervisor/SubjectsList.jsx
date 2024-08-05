"use client"
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Modal, Pagination, Table, Tooltip} from "@mantine/core";
import {IconEdit, IconEye} from "@tabler/icons-react";

export default function SubjectsList({elements, withEditButton}) {
  const [opened, {open, close}] = useDisclosure(false);

  function statusConverter(status, specialistComment) {
    let statusFriendly
    switch (status) {
      case "PENDING":
        statusFriendly = "En attente d'approbation";
        break
      case "REJECTED":
        statusFriendly = "Rejeté pour cause: " + specialistComment
        break
      case "ACCEPTED":
        statusFriendly = "Accepté";
        break
      case "COMPLETED":
        statusFriendly = "Complété";
    }
    return statusFriendly
  }

  const rows = elements.map((row) => (
      <Table.Tr key={row.id}>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>{statusConverter(row.status, row.specialistComment)}</Table.Td>
        <Table.Td className="w-[120px]">
          <Tooltip label="Afficher les détails"><ActionIcon variant="filled"
                                                            mr={25}><IconEye></IconEye></ActionIcon></Tooltip>
          <Tooltip label={row.status === "PENDING" ? "Modifier" : "Vous ne pouvez plus modifier ce sujet"}><ActionIcon
              variant="filled" color="yellow"
              disabled={row.status !== "PENDING"}><IconEdit></IconEdit></ActionIcon></Tooltip>
        </Table.Td>
      </Table.Tr>
  ))

  return (
      <>
        <Modal opened={opened} onClose={close} centered size="auto">
          <object
              data="http://localhost/sujets/2024/gesstikon/sujet.pdf#view=FitH"
              type="application/pdf"
              width="600"
              height="700"
          />
        </Modal>
        <div className="flex flex-col items-center w-full">

          <Button onClick={open}>Open modal</Button>
          <div className="w-[70%]">
            <Table highlightOnHover styles={{caption: {marginTop: "20px"}}}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Titre</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
              <Table.Caption><Pagination total={20} siblings={3} className="float-end"/></Table.Caption>
            </Table>
          </div>
        </div>
      </>

  )


}
