"use client"

import React, {useEffect, useMemo, useState} from "react";
import {fetchCandidatesForResponsible, updateCandidate} from "@/app/components/candidates_tracking/actions";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {NativeSelect} from "@mantine/core";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";
import {DateInput} from "@mantine/dates";

export default function CandidatesTrackingListForResponsible() {
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
      await setData(await fetchCandidatesForResponsible())
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [
    {
      header: 'Candidat',
      filterVariant: 'text',
      accessorFn: (row) => `${row.resume?.internFirstName} ${row.resume?.internLastName}`,
    }, {
      header: 'Encadrant',
      filterVariant: 'text',
      accessorFn: (row) => `${row.supervisor?.fullName}`,
    }, {
      header: 'Sujet',
      filterVariant: 'text',
      accessorFn: (row) => row.subject?.title,
    }, {
      header: "Date d'intégration",
      filterVariant: 'text',
      accessorFn: (row) => {
        // convert 2000-01-31 to 31-01-2000
        return row.integrationDate === null ? "" : `${row.integrationDate?.split("-")[2]}-${row.integrationDate?.split("-")[1]}-${row.integrationDate?.split("-")[0]}`
      },
      Cell: ({row}) => (
          <DateInput
              valueFormat="DD-MM-YYYY"
              placeholder="Non définie"
              value={row.original.integrationDate !== null ? new Date(row.original.integrationDate) : null}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "integrationDate", new Date(event).toISOString().split('T')[0])
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
          />
      ),
    }, {
      header: "Date de récupération du materiel",
      filterVariant: 'text',
      accessorFn: (row) => {
        // convert 2000-01-31 to 31-01-2000
        return row.materialRetrievalDate === null ? "" : `${row.materialRetrievalDate?.split("-")[2]}-${row.materialRetrievalDate?.split("-")[1]}-${row.materialRetrievalDate?.split("-")[0]}`
      },
      Cell: ({row}) => (
          <DateInput
              valueFormat="DD-MM-YYYY"
              placeholder="Non réupéré"
              value={row.original.materialRetrievalDate !== null ? new Date(row.original.materialRetrievalDate) : null}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "materialRetrievalDate", new Date(event).toISOString().split('T')[0])
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
          />
      ),
    }, {
      header: 'Badge récupéré',
      filterVariant: 'select',
      accessorFn: (row) => row.badgeRetrieval ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.badgeRetrieval}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "badgeRetrieval", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
          />
      ),
    }, {
      header: 'Accès aux plateformes',
      filterVariant: 'select',
      accessorFn: (row) => row.platformAccess ? "Oui" : "Non",
      Cell: ({renderedCellValue, row}) => (
          <NativeSelect
              data={boolSelect}
              value={row.original.platformAccess}
              onChange={async (event) => {
                setIsLoading(true)
                await updateCandidate(row.original.id, "platformAccess", event.currentTarget.value)
                setIsLoading(false)
                setRefresh((refresh) => !refresh)
                setFeedbackMessage("Modification enregistrée")
              }}
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
    enableRowActions: false,
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
