"use client"
import {useEffect, useMemo, useState} from 'react';
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {IconCheck, IconEdit, IconEye, IconX} from "@tabler/icons-react";
import {ActionIcon, Box, Button, Group, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import AddSubjectForm from "@/app/components/subjects_list/AddSubjectForm";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";
import SUBJECT_STATUS from "@/app/constants/SUBJECT_STATUS";
import {fetchSubjects, getSubjectById} from "@/app/components/subjects_list/actions";
import AcceptSubjectModal from "@/app/components/subjects_list/AcceptSubjectModal";
import RejectSubjectModal from "@/app/components/subjects_list/RejectSubjectModal";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

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


  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Sujet',
      filterVariant: 'text',
    }, {
      accessorKey: 'internshipType',
      header: 'PFE/PFA',
      filterVariant: 'multi-select',
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
          <Tooltip
              label={row.original.specialistComment}
              disabled={!row.original.specialistComment}
          >
            <Box
                bg={renderedCellValue === SUBJECT_STATUS["PENDING"] ? "gray.5"
                    : renderedCellValue === SUBJECT_STATUS["ACCEPTED"] ? "yellow"
                        : renderedCellValue === SUBJECT_STATUS["IN_PROGRESS"] ? "cb"
                            : renderedCellValue === SUBJECT_STATUS["REJECTED"] ? "red"
                                : "green"
                }
                c="white"
                p="4px"
                w="fit-content"
                style={{
                  borderRadius: '4px',
                }}
            >
              {renderedCellValue}
            </Box>
          </Tooltip>
      ),
      accessorFn: (row) => SUBJECT_STATUS[row.subjectStatus],
    },
  ], [],);

  const table = useMantineReactTable({
    data,
    columns,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    localization: MRT_Localization_FR,
    mantineCreateRowModalProps: {
      size: "60%",
      withCloseButton: true,
      overlayProps: {backgroundOpacity: 0.55, blur: 4,}
    },
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
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
      },
    },
    initialState: {
      showColumnFilters: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
      columnVisibility: {
        poster: listType !== "SUPERVISOR"
      },
    },

    renderCreateRowModalContent: () => (
        listType === "SUPERVISOR" &&
        <Stack>
          <Title
              order={3}
          >
            Ajouter un nouveau sujet
          </Title>
          <AddSubjectForm setRefresh={setRefresh}/>
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        listType === "SUPERVISOR" &&
        <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Ajouter un sujet
        </Button>),
    renderRowActions: ({row}) => (
        <Group
            style={{flexWrap: 'nowrap'}}
        >
          <Tooltip
              label="Afficher les détails"
          >
            <ActionIcon
                variant="filled"
                onClick={() => {
                  setPath(row.original.path)
                  togglePDFModal.open()
                }}
            >
              <IconEye/>
            </ActionIcon>
          </Tooltip>

          {listType === "SUPERVISOR" &&
              <Tooltip
                  label={row.original.subjectStatus === "PENDING" ? "Modifier" : "Vous ne pouvez plus modifier ce sujet"}
              >
                <ActionIcon
                    variant="filled"
                    color="yellow"
                    onClick={async () => {
                      await setExistingSubject(await getSubjectById(row.original.id))
                      toggleEditModal.open()
                    }}
                    disabled={row.original.subjectStatus !== "PENDING"}
                >
                  <IconEdit/>
                </ActionIcon>
              </Tooltip>
          }


          {listType === "SPECIALIST" &&
              <>
                <Tooltip
                    label="Accepter le sujet"
                >
                  <ActionIcon
                      variant="filled"
                      color="green"
                      onClick={() => {
                        setSubjectID(row.original.id)
                        toggleAcceptModal.open()
                      }}
                  >
                    <IconCheck/>
                  </ActionIcon>
                </Tooltip>

                <Tooltip
                    label="Rejeter le sujet"
                >
                  <ActionIcon
                      variant="filled"
                      color="red"
                      onClick={() => {
                        setSubjectID(row.original.id)
                        toggleRejectModal.open()
                      }}
                  >
                    <IconX/>
                  </ActionIcon>
                </Tooltip>
              </>
          }

        </Group>
    ),
  });


  return (
      <>
        <SuccessAlert
            opened={feedbackMessage !== ""}
            close={() => {
              setFeedbackMessage("")
            }}
            title={feedbackMessage}
        />


        <Modal
            opened={pdfModalOpened}
            onClose={() => {
              setPath("")
              togglePDFModal.close()
            }}
            centered
            size="auto"
        >
          <object
              data={process.env.NEXT_PUBLIC_STATIC_FILES_URL + path + `.pdf?&v=${Math.random()}#view=FitH`}
              type="application/pdf"
              width="600"
              height="700"
          />
        </Modal>
        <Modal
            opened={editModalOpened}
            onClose={() => {
              toggleEditModal.close()
              setExistingSubject(null)
            }}
            size="60%"
            withCloseButton={true}
            overlayProps={{blur: 4, backgroundOpacity: 0.55}}
        >
          <AddSubjectForm
              setRefresh={setRefresh}
              existingSubject={existingSubject}
          />
        </Modal>

        <AcceptSubjectModal
            close={toggleAcceptModal.close}
            opened={acceptModalOpened}
            subjectID={subjectID}
            setSubjectID={setSubjectID}
            setRefresh={setRefresh}
            setFeedbackMessage={setFeedbackMessage}
        />

        <RejectSubjectModal
            close={toggleRejectModal.close}
            opened={rejectModalOpened}
            subjectID={subjectID}
            setSubjectID={setSubjectID}
            setRefresh={setRefresh}
            setFeedbackMessage={setFeedbackMessage}
        />

        <MantineReactTable
            table={table}
        />
      </>
  )
}
