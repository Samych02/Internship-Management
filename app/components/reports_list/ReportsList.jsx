"use client"
import 'mantine-react-table/styles.css';
import {useEffect, useMemo, useState} from 'react';
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {IconEye} from "@tabler/icons-react";
import {ActionIcon, Box, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import AddSubjectForm from "@/app/components/subjects_list/AddSubjectForm";
import {fetchInternReports} from "@/app/components/reports_list/actions";
import AddReportForm from "@/app/components/reports_list/AddReportForm";

export default function ReportsList({listType}) {
  const [pdfModalOpened, togglePDFModal] = useDisclosure(false);
  const [editModalOpened, toggleEditModal] = useDisclosure(false);
  const [acceptModalOpened, toggleAcceptModal] = useDisclosure(false);
  const [RejectModalOpened, RejectAcceptModal] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [existingSubject, setExistingSubject] = useState(null)
  const [subjectId, setSubjectId] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      await setData(await fetchInternReports())
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])


  const columns = useMemo(() => [{
    accessorKey: 'summary', header: 'Résumé', filterVariant: 'text', size: 400,
  }, {
    header: 'Date', filterVariant: 'text', accessorFn: (row) => {
      // convert 2000-01-31 to 31-01-2000
      return `${row.date?.split("-")[2]}-${row.date?.split("-")[1]}-${row.date?.split("-")[0]}`
    },
  }], [],);

  const table = useMantineReactTable({
    data,
    columns,
    mantineCreateRowModalProps: {
      size: "60%", withCloseButton: true, overlayProps: {
        backgroundOpacity: 0.55, blur: 4,
      }

    },
    renderCreateRowModalContent: () => (<Stack>
      <Title order={3}>Ajouter un nouveau compte rendu</Title>
      <AddReportForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (
        <Button onClick={() => table.setCreatingRow(true)}>Ajouter un compte rendu</Button>),
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
          togglePDFModal.open()
        }}><IconEye/></ActionIcon></Tooltip>
    </Box>),
    localization: MRT_Localization_FR,
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
    <Modal opened={editModalOpened} onClose={() => {
      toggleEditModal.close()
      setExistingSubject(null)
    }} size="60%" withCloseButton={true}
           overlayProps={{blur: 4, backgroundOpacity: 0.55}}>
      <AddSubjectForm setRefresh={setRefresh} existingSubject={existingSubject}/>
    </Modal>

    <Modal opened={acceptModalOpened} onClose={() => {
      toggleAcceptModal.close()
      setExistingSubject(null)
    }} size="60%" withCloseButton={true}
           overlayProps={{blur: 4, backgroundOpacity: 0.55}}>
      <AddSubjectForm setRefresh={setRefresh} existingSubject={existingSubject}/>
    </Modal>

    <MantineReactTable table={table}/>
  </>)
}
