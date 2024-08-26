"use client"
import {useEffect, useMemo, useState} from "react";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {ActionIcon, Box, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {IconEye, IconFileDescription, IconPresentationAnalytics} from "@tabler/icons-react";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {fetchInternships} from "@/app/components/internships_archives_list/actions";
import 'mantine-react-table/styles.css';
import {useDisclosure} from "@mantine/hooks";
import InternshipDetail from "@/app/components/internships_archives_list/InternshipDetail";
import ArchiveInternshipForm from "@/app/components/internships_archives_list/ArchiveInternshipForm";


export default function InternshipArchivesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [detailModalOpened, toggleDetailModal] = useDisclosure(false);
  const [internshipDetail, setInternshipDetail] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      await setData(await fetchInternships())
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [{
    accessorKey: 'title', header: 'Sujet', filterVariant: 'text', size: 250,
  }, {
    accessorKey: 'year', header: 'Année', filterVariant: 'multi-select', accessorFn: (row) => row.year?.toString()
  }, {
    accessorKey: 'internshipType', header: 'Type de stage', filterVariant: 'multi-select',
  },], [])

  const table = useMantineReactTable({
    data,
    columns,
    mantineCreateRowModalProps: {
      size: "60%", withCloseButton: true, overlayProps: {
        backgroundOpacity: 0.55, blur: 4,
      }

    },
    renderCreateRowModalContent: () => (<Stack>
      <Title order={3}>Ajouter un stage aux archives</Title>
      <ArchiveInternshipForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (
        <Button onClick={() => table.setCreatingRow(true)}>Ajouter un stage aux archives</Button>),
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
      <Tooltip label="Afficher les details">
        <ActionIcon variant="filled" mr={20} onClick={() => {
          setInternshipDetail(row.original)
          toggleDetailModal.open()
        }}><IconEye/></ActionIcon></Tooltip>
      <Tooltip label="Télécharger le rapport">
        <ActionIcon variant="filled" mr={20}><a href={"http://localhost/" + row.original.reportPath}
                                                target="_blank"><IconFileDescription/></a></ActionIcon></Tooltip>
      {row.original.presentationPath && <Tooltip label="Télécharger le rapport">
        <ActionIcon variant="filled" mr={20} color="yellow"><a
            href={"http://localhost/" + row.original.presentationPath} target="_blank">
          <IconPresentationAnalytics/>
        </a></ActionIcon></Tooltip>}
    </Box>),
    localization: MRT_Localization_FR,
  });

  return (<>
    <Modal title="Détail du stage" opened={detailModalOpened} onClose={() => {
      setInternshipDetail({})
      toggleDetailModal.close()
    }} centered size="auto">
      <InternshipDetail row={internshipDetail}/>
    </Modal>

    <MantineReactTable table={table}/>
  </>)
}
