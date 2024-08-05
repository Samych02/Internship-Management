"use client"
import {useDebouncedState, useDisclosure} from "@mantine/hooks";
import {ActionIcon, Input, Modal, Pagination, Table, Tooltip} from "@mantine/core";
import {IconEdit, IconEye} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {getUserSubject} from "@/app/dashboard/supervisor/actions";

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

const rows = (content, withEditButton, open, setPath) => {

  return content.map((row) => (<Table.Tr key={row.id}>
    <Table.Td>{row.title}</Table.Td>
    <Table.Td>{statusConverter(row.subjectStatus, row.specialistComment)}</Table.Td>
    <Table.Td className="w-[120px]">
      <Tooltip label="Afficher les détails"><ActionIcon variant="filled"
                                                        mr={25} onClick={() => {
        setPath(row.path)
        open()
      }}><IconEye/></ActionIcon></Tooltip>
      {withEditButton && <Tooltip
          label={row.subjectStatus === "PENDING" ? "Modifier" : "Vous ne pouvez plus modifier ce sujet"}><ActionIcon
          variant="filled" color="yellow"
          disabled={row.subjectStatus !== "PENDING"}><IconEdit></IconEdit></ActionIcon></Tooltip>}
    </Table.Td>
  </Table.Tr>))
}

export default function SubjectsList({withEditButton}) {
  const [activePage, setPage] = useState(1);
  const [title, setTitle] = useDebouncedState('', 300);
  const [loading, setLoading] = useState(true);
  const [opened, {open, close}] = useDisclosure(false);
  const [path, setPath] = useState("");


  const [data, setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await setData(await getUserSubject(0, title))
      setLoading(false)
    }
    fetchData()
  }, [title])


  return (<>
    <Modal opened={opened} onClose={() => {
      setPath("")
      close()
    }} centered size="auto">
      <object
          data={"http://localhost" + path + "sujet.pdf#view=FitH"}
          type="application/pdf"
          width="600"
          height="700"
      />
    </Modal>
    <div className="flex flex-col items-center w-full">

      <div className="w-[70%]">
        <Input defaultValue={title} onChange={(e) => setTitle(e.target.value)} placeholder="Chercher par titre"/>
        <Table highlightOnHover styles={{caption: {marginTop: "20px"}}}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Titre</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{!loading && rows(data.content, withEditButton, open, setPath)}</Table.Tbody>
          <Table.Caption><Pagination total={data.totalPages} siblings={3} className="float-end"/></Table.Caption>
        </Table>
        {!loading && data.content.length === 0 && <h1>Aucun résultat trouvé</h1>}
      </div>
    </div>
  </>)


}
