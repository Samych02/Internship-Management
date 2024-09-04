"use client"
import 'mantine-react-table/styles.css';
import {useEffect, useMemo, useState} from 'react';
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {IconAlertCircle, IconCheck, IconEdit, IconEye, IconX} from "@tabler/icons-react";
import {ActionIcon, Alert, Box, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import AddSubjectForm from "@/app/components/subjects_list/AddSubjectForm";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";
import SUBJECT_STATUS from "@/app/constants/SUBJECT_STATUS";
import {fetchSubjects, getSubjectById} from "@/app/components/subjects_list/actions";
import AcceptSubjectModal from "@/app/components/subjects_list/AcceptSubjectModal";
import RejectSubjectModal from "@/app/components/subjects_list/RejectSubjectModal";

export default function SubjectsList({listType}) {
  const [pdfModalOpened, togglePDFModal] = useDisclosure(false);
  const [editModalOpened, toggleEditModal] = useDisclosure(false);
  const [acceptModalOpened, toggleAcceptModal] = useDisclosure(false);
  const [rejectModalOpened, toggleRejectModal] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [existingSubject, setExistingSubject] = useState(null)
  const [subjectID, setSubjectID] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      if (listType === "SUPERVISOR") await setData(await fetchSubjects(true))
      else if (listType === "SPECIALIST") await setData(await fetchSubjects(false, "PENDING"))
      else await setData(await fetchSubjects())
      await setIsLoading(false)
    }
    fetchData()
  }, [listType, refresh])


  const columns = useMemo(() => [{
    accessorKey: 'title', header: 'Sujet', filterVariant: 'text',
  }, {
    accessorKey: 'internshipType', header: 'PFE/PFA', filterVariant: 'multi-select',
  }, {
    accessorKey: 'studyField',
    header: 'Catégorie',
    filterVariant: 'multi-select',
    accessorFn: (row) => STUDY_FIELD[row.studyField],
  }, {
    accessorKey: 'poster',
    header: 'Ajouté par',
    filterVariant: 'text',
    accessorFn: (row) => row.poster?.fullName,
  }, {
    accessorKey: (row) => `${row.subjectStatus}`,
    header: 'Status',
    filterVariant: 'multi-select',
    Cell: ({renderedCellValue, row}) => (
        <Tooltip label={row.original.specialistComment} disabled={!row.original.specialistComment}>

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
    accessorFn: (row) => SUBJECT_STATUS[row.subjectStatus],

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
    renderCreateRowModalContent: () => (listType === "SUPERVISOR" && <Stack>
      <Title order={3}>Ajouter un nouveau sujet</Title>
      <AddSubjectForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (listType === "SUPERVISOR" &&
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
      columnVisibility: {
        poster: listType !== "SUPERVISOR"
      },
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
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
          togglePDFModal.open()
        }}><IconEye/></ActionIcon></Tooltip>


      {listType === "SUPERVISOR" && <Tooltip
          label={row.original.subjectStatus === "PENDING" ? "Modifier" : "Vous ne pouvez plus modifier ce sujet"}><ActionIcon
          variant="filled" color="yellow" onClick={async () => {
        await setExistingSubject(await getSubjectById(row.original.id))
        toggleEditModal.open()
      }}
          disabled={row.original.subjectStatus !== "PENDING"}><IconEdit></IconEdit></ActionIcon>
      </Tooltip>}
      {listType === "SPECIALIST" && <Tooltip
          label="Accepter le sujet"><ActionIcon
          mr={20} variant="filled" color="green" onClick={() => {
        setSubjectID(row.original.id)
        toggleAcceptModal.open()
      }}><IconCheck></IconCheck></ActionIcon>
      </Tooltip>}
      {listType === "SPECIALIST" && <Tooltip
          label="Rejeter le sujet"><ActionIcon
          variant="filled" color="red" onClick={() => {
        setSubjectID(row.original.id)
        toggleRejectModal.open()
      }}><IconX></IconX></ActionIcon>
      </Tooltip>}

    </Box>),
    localization: MRT_Localization_FR,
  });


  return (<>
    {feedbackMessage !== "" && <Alert
        color="green"
        mb="1rem"
        title={feedbackMessage}
        icon={<IconAlertCircle/>}
        withCloseButton
        onClose={() => {
          setFeedbackMessage("")
        }}
    />}
    <Modal opened={pdfModalOpened} onClose={() => {
      setPath("")
      togglePDFModal.close()
    }} centered size="auto">
      <object
          data={"http://localhost" + path + `.pdf?&v=${Math.random()}#view=FitH`}
          type="application/pdf"
          width="600"
          height="700"
      />
    </Modal>
    <Modal opened={editModalOpened} onClose={() => {
      toggleEditModal.close()
      setExistingSubject(null)
    }} size="60%" withCloseButton={true}
           overlayProps={{blur: 4, backgroundOpacity: 0.55}}>
      <AddSubjectForm setRefresh={setRefresh} existingSubject={existingSubject}/>
    </Modal>

    <AcceptSubjectModal close={toggleAcceptModal.close} opened={acceptModalOpened} subjectID={subjectID}
                        setSubjectID={setSubjectID} setRefresh={setRefresh} setFeedbackMessage={setFeedbackMessage}/>
    <RejectSubjectModal close={toggleRejectModal.close} opened={rejectModalOpened} subjectID={subjectID}
                        setSubjectID={setSubjectID} setRefresh={setRefresh} setFeedbackMessage={setFeedbackMessage}/>
    <MantineReactTable table={table}/>
  </>)
}
