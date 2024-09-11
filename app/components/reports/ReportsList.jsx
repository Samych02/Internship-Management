"use client"
import {useEffect, useMemo, useState} from 'react';
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {IconEye} from "@tabler/icons-react";
import {ActionIcon, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {fetchReports} from "@/app/components/reports/actions";
import AddReportForm from "@/app/components/reports/AddReportForm";

export default function ReportsList({listType}) {
  const [pdfModalOpened, togglePDFModal] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await setData(listType === "RESPONSIBLE" ? await fetchReports(false)
          : listType === "SUPERVISOR" ? await fetchReports(true, "SUPERVISOR")
              : await fetchReports(true, "INTERN")
      )
      await setIsLoading(false)
    }
    fetchData()
  }, [listType, refresh])


  const columns = useMemo(() => [
    {
      accessorKey: 'summary',
      header: 'Résumé',
      filterVariant: 'text',
    }, {
      header: 'Date',
      filterVariant: 'text',
      accessorFn: (row) => {
        // convert 2000-01-31 to 31-01-2000
        return `${row.date?.split("-")[2]}-${row.date?.split("-")[1]}-${row.date?.split("-")[0]}`
      },
    }, {
      header: 'Stagiaire',
      filterVariant: 'select',
      accessorFn: (row) => `${row.intern?.fullName}`
    },], [],);

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
        Stagiaire: listType === "RESPONSIBLE"
      },
    },
    renderCreateRowModalContent: () => (
        <Stack>
          <Title
              order={3}
          >
            Ajouter un nouveau compte rendu
          </Title>

          <AddReportForm
              setRefresh={setRefresh}
          />
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        listType ==="INTERN" && <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Ajouter un compte rendu
        </Button>
    ),
    renderRowActions: ({row}) => (
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
    ),
  });


  return (<>
    <Modal opened={pdfModalOpened} onClose={() => {
      setPath("")
      togglePDFModal.close()
    }} centered size="auto">
      <object
          data={"http://localhost" + path + `?&v=${Math.random()}#view=FitH`}
          type="application/pdf"
          width="600"
          height="700"
      />
    </Modal>

    <MantineReactTable table={table}/>
  </>)
}
