"use client"
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import {useEffect, useMemo, useState} from 'react';
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {IconEdit, IconEye} from "@tabler/icons-react";
import {ActionIcon, Box, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {fetchSubjects} from "@/app/lib/fetchSubjects";
import AddSubjectForm from "@/app/dashboard/supervisor/add-subject/AddSubjectForm";

function statusConverter(status) {
  let statusFriendly
  switch (status) {
    case "PENDING":
      statusFriendly = "En attente d'approbation";
      break
    case "REJECTED":
      statusFriendly = `Rejeté`
      break
    case "ACCEPTED":
      statusFriendly = "Accepté";
      break
    case "COMPLETED":
      statusFriendly = "Complété";
  }
  return statusFriendly
}

// const rows = (content, withEditButton, open, setPath) => {
//
//   return content.map((row) => (<Table.Tr key={row.id}>
//     <Table.Td>{row.title}</Table.Td>
//     <Table.Td>{statusConverter(row.subjectStatus, row.specialistComment)}</Table.Td>
//     <Table.Td className="w-[120px]">
//       <Tooltip label="Afficher les détails"><ActionIcon variant="filled"
//                                                         mr={25} onClick={() => {
//         setPath(row.path)
//         open()
//       }}><IconEye/></ActionIcon></Tooltip>
//     </Table.Td>
//   </Table.Tr>))
// }

export default function SubjectsList({listType}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      await setData(await fetchSubjects(true))
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])


  const columns = useMemo(() => [{
    accessorKey: 'title', header: 'Sujet', filterVariant: 'text', size: 250,
  }, {
    accessorKey: 'internshipType', header: 'PFE/PFA', filterVariant: 'multi-select',
  }, {
    accessorKey: 'year', header: 'Année', filterVariant: 'multi-select', accessorFn: (row) => row.year?.toString(),
  }, {
    accessorKey: (row) => `${row.subjectStatus}`,
    header: 'Status',
    filterVariant: 'multi-select',
    Cell: ({renderedCellValue, row}) => (<Tooltip label={row.original.specialistComment}>

      <Box
          style={(theme) => ({
            backgroundColor: renderedCellValue === "En attente d'approbation" ? theme.colors.gray[5] : renderedCellValue === "Accepté" ? theme.colors.blue[9] : renderedCellValue === "Rejeté" ? theme.colors.red[9] : theme.colors.green[9],
            borderRadius: '4px',
            color: '#fff',
            padding: '4px',
            width: "fit-content"
          })}
      >
        {renderedCellValue}
      </Box>
    </Tooltip>),
    accessorFn: (row) => statusConverter(row.subjectStatus),

  },

  ], [],);

  const table = useMantineReactTable({
    data,
    columns,
    mantineCreateRowModalProps: {
      size: "60%", withCloseButton: true, overlayProps: {
        backgroundOpacity: 0.55, blur: 4,
      }

    },
    renderCreateRowModalContent: () => (<Stack>
      <Title order={3}>Ajouter un nouveau sujet</Title>
      <AddSubjectForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (
        <Button onClick={() => table.setCreatingRow(true)}>Ajouter un sujet</Button>),
    createDisplayMode: 'modal',
    enableHiding: false,
    enableGlobalFilterModes: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableTopToolbar: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableColumnActions: false,
    state: {
      showSkeletons: isLoading
    },
    initialState: {
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
    },

    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl', size: 'lg',
    },
    renderRowActions: ({row}) => (<Box className="flex flex-row">
      <Tooltip label="Afficher les détails">
        <ActionIcon variant="filled" mr={20} onClick={() => {
          setPath(row.original.path)
          open()
        }}><IconEye/></ActionIcon></Tooltip>


      {listType === "SUPERVISOR" && <Tooltip
          label={row.original.subjectStatus === "PENDING" ? "Modifier" : "Vous ne pouvez plus modifier ce sujet"}><ActionIcon
          variant="filled" color="yellow"
          disabled={row.original.subjectStatus !== "PENDING"}><IconEdit></IconEdit></ActionIcon>
      </Tooltip>}

    </Box>),
    localization: MRT_Localization_FR,
  });


  return (<>
    <Modal opened={opened} onClose={() => {
      setPath("")
      close()
    }} centered size="auto">
      <object
          data={"http://localhost" + path + ".pdf#view=FitH"}
          type="application/pdf"
          width="600"
          height="700"
      />
    </Modal>
    <MantineReactTable table={table}/>
  </>)
}
