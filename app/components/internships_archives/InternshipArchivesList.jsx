"use client"
import {useEffect, useMemo, useState} from "react";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {ActionIcon, Button, Group, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {IconEye, IconFileDescription, IconPresentationAnalytics} from "@tabler/icons-react";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {fetchInternships} from "@/app/components/internships_archives/actions";
import {useDisclosure} from "@mantine/hooks";
import InternshipDetail from "@/app/components/internships_archives/InternshipDetail";
import ArchiveInternshipForm from "@/app/components/internships_archives/ArchiveInternshipForm";


export default function InternshipArchivesList({listType = "NORMAL"}) {
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

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Sujet',
      filterVariant: 'text',
    }, {
      accessorKey: 'year',
      header: 'Année',
      filterVariant: 'multi-select',
      accessorFn: (row) => row.year?.toString()
    }, {
      accessorKey: 'internshipType',
      header: 'Type de stage',
      filterVariant: 'multi-select',
    },], [])

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
      size: "80%",
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
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
    },
    renderCreateRowModalContent: () => (
        <Stack>
          <Title
              order={3}
          >
            Ajouter un ancien sujet de stage
          </Title>

          <ArchiveInternshipForm setRefresh={setRefresh}/>
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        (listType === "SPECIALIST" || listType === "RESPONSIBLE") &&
        <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Ajouter un ancien sujet de stage
        </Button>
    ),

    renderRowActions: ({row}) => (
        <Group
            style={{flexWrap: 'nowrap'}}
        >
          <Tooltip
              label="Afficher les details"
          >
            <ActionIcon
                variant="filled"
                onClick={() => {
                  setInternshipDetail(row.original)
                  toggleDetailModal.open()
                }}
            >
              <IconEye/>
            </ActionIcon>
          </Tooltip>

          <Tooltip
              label="Télécharger le rapport"
          >
            <ActionIcon
                variant="filled"
            >
              <a
                  href={process.env.NEXT_PUBLIC_STATIC_FILES_URL + row.original.reportPath}
                  target="_blank"
              >
                <IconFileDescription/>
              </a>
            </ActionIcon>
          </Tooltip>

          {row.original.presentationPath &&
              <Tooltip
                  label="Télécharger le rapport"
              >
                <ActionIcon
                    variant="filled"
                    bg="yellow"
                >
                  <a
                      href={process.env.NEXT_PUBLIC_STATIC_FILES_URL + row.original.presentationPath}
                      target="_blank"
                  >
                    <IconPresentationAnalytics/>
                  </a>
                </ActionIcon>
              </Tooltip>
          }
        </Group>
    ),
  });

  return (
      <>
        <Modal
            title="Détail du stage"
            opened={detailModalOpened}
            onClose={() => {
              setInternshipDetail({})
              toggleDetailModal.close()
            }}
            centered
            size="auto"
        >
          <InternshipDetail row={internshipDetail}/>
        </Modal>

        <MantineReactTable table={table}/>
      </>)
}
