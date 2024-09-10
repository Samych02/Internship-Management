"use client"

import React, {useEffect, useMemo, useState} from "react";
import {fetchCandidates, updateCandidate} from "@/app/components/candidates_tracking/actions";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {ActionIcon, Box, Group, NativeSelect, Text, Tooltip} from "@mantine/core";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";
import {DateInput} from "@mantine/dates";
import {IconUserPlus} from "@tabler/icons-react";
import {registerAction} from "@/app/components/user/actions";
import {editSubjectStatus} from "@/app/components/subjects/actions";
import SUBJECT_STATUS from "@/app/constants/SUBJECT_STATUS";

export default function CandidatesTrackingList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const boolSelect = [
    {label: 'Non', value: false},
    {label: 'Oui', value: true},
  ]

  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      await setData(await fetchCandidates())
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [
    {
      header: 'Candidat',
      filterVariant: 'text',
      accessorFn: (row) => `${row.resume?.internFirstName} ${row.resume?.internLastName}`,
      Cell: ({renderedCellValue, row}) => (
          <Group
              gap="sm"
              style={{flexWrap: 'nowrap'}}
          >
            <Text
                style={{whiteSpace: 'nowrap'}}
            >
              {`${row.original.resume?.internFirstName} ${row.original.resume?.internLastName}`}
            </Text>

            <Box
                bg={row.original.status === "PENDING" ? "gray.5"
                    : row.original.status === "ACCEPTED" ? "yellow"
                        : row.original.status === "IN_PROGRESS" ? "cb"
                            : row.original.status === "REJECTED" ? "red"
                                : "green"
                }
                c="white"
                p="4px"
                w="fit-content"
                style={{
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
            >
              {SUBJECT_STATUS[row.original.status]}
            </Box>
          </Group>
      )
    }, {
      header: 'Sujet',
      filterVariant: 'text',
      accessorFn: (row) => row.subject?.title,
    }, {
      header: 'Premier échange',
      filterVariant: 'select',
      accessorFn: (row) => row.firstExchange ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.firstExchange}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "firstExchange", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
              disabled={row.original.status !== "PENDING"}
          />
      ),
    }, {
      header: 'Entretien technique',
      filterVariant: 'select',
      accessorFn: (row) => row.technicalInterview ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.technicalInterview}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "technicalInterview", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
              disabled={row.original.status !== "PENDING"}
          />
      ),
    }, {
      header: "Date de l'entretien",
      filterVariant: 'text',
      accessorFn: (row) => {
        // convert 2000-01-31 to 31-01-2000
        return row.technicalInterviewDate === null ? "" : `${row.technicalInterviewDate?.split("-")[2]}-${row.technicalInterviewDate?.split("-")[1]}-${row.technicalInterviewDate?.split("-")[0]}`
      },
      Cell: ({renderedCellValue, row}) => (
          <DateInput
              valueFormat="DD-MM-YYYY"
              placeholder="Non définie"
              data={boolSelect}
              value={row.original.technicalInterviewDate !== null ? new Date(row.original.technicalInterviewDate) : null}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "technicalInterviewDate", new Date(event).toISOString().split('T')[0])
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
              disabled={row.original.status !== "PENDING"}
          />
      ),
    }, {
      header: 'Candidat choisi',
      filterVariant: 'select',
      accessorFn: (row) => row.chosen ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.chosen}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "chosen", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
              disabled={row.original.status !== "PENDING"}
          />
      ),
    }, {
      header: 'Validé par le RH',
      filterVariant: 'select',
      accessorFn: (row) => row.hrValidation ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.hrValidation}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "hrValidation", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
              disabled={row.original.status !== "PENDING"}
          />
      ),
    },
  ], [boolSelect],);

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
    },
    renderRowActions: ({row}) => (
        <Tooltip
            label={row.original.status !== "PENDING" ? "Candidat déjà accepté"
                : row.original.chosen && row.original.hrValidation ? "Accepter le candidat définitivement"
                    : "Le candidat doit être marqué comme choisi et accepté par le RH"
            }
        >
          <ActionIcon
              color="green"
              variant="filled"
              onClick={async () => {
                setIsLoading(true)
                const data = {
                  email: `${row.original.resume.internFirstName.replace(" ", "-")}.${row.original.resume.internLastName.replace(" ", "-")}@capgemini.com`,
                  password: Math.floor(100000 + Math.random() * 900000),
                  userRole: "INTERN",
                  firstName: row.original.resume.internFirstName,
                  lastName: row.original.resume.internLastName,
                }
                if (await registerAction(data)) {
                  await updateCandidate(row.original.id, "isFinallyAccepted", true)
                  await editSubjectStatus(row.original.subject.id, "IN_PROGRESS")
                  setIsLoading(false)
                  setRefresh((refresh) => !refresh)
                  setFeedbackMessage("Profile accepté avec succès, les informations du login seront téléchargés dans un instant")
                  const textContent = `email:${data.email}\npassword:${data.password}`;
                  const blob = new Blob([textContent], {type: 'text/plain'});
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `login ${data.firstName} ${data.lastName}.txt`;

                  // Append the anchor to the body and trigger the download
                  document.body.appendChild(link);
                  link.click();

                  // Remove the anchor element after download
                  document.body.removeChild(link);
                }
              }}
              disabled={row.original.status !== "PENDING" || !(row.original.chosen && row.original.hrValidation) || isLoading}
          >
            <IconUserPlus/>
          </ActionIcon>
        </Tooltip>
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

        <MantineReactTable table={table}/>
      </>
  )
}
