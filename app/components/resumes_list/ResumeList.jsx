"use client"
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useMemo, useState} from "react";
import {fetchResumes} from "@/app/components/resumes_list/actions";
import STUDY_FIELD from "@/app/constants/STUDY_FIELD";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {ActionIcon, Box, Button, Modal, Stack, Title, Tooltip} from "@mantine/core";
import {IconEye} from "@tabler/icons-react";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import AddResumeForm from "@/app/components/resumes_list/AddResumeForm";

export default function ResumeList({listType}) {
  const [pdfModalOpened, togglePDFModal] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (listType === "RESPONSIBLE") setData(await fetchResumes())
      else setData(await fetchResumes(true))
      setIsLoading(false)
    }
    fetchData()
  }, [listType, refresh])

  const columns = useMemo(() => [
    {
      accessorKey: 'internFullName',
      header: 'Nom du candidat',
      filterVariant: 'text',
    }, {
      accessorKey: 'studyField',
      header: 'Domaine',
      filterVariant: 'multi-select',
      accessorFn: (row) => STUDY_FIELD[row.studyField],
    },
  ], [])

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
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
    },
    renderCreateRowModalContent: () => (
        <Stack>
          <Title
              order={3}
          >
            Recommander un CV
          </Title>

          <AddResumeForm
              setRefresh={setRefresh}
          />
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Recommander un CV
        </Button>
    ),
    renderRowActions: ({row}) => (
        <Box>
          <Tooltip
              label="Afficher le CV"
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
        </Box>),
  });

  return (
      <>
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
              data={process.env.NEXT_PUBLIC_STATIC_FILES_URL + path + `?&v=${Math.random()}#view=FitH`}
              type="application/pdf"
              width="600"
              height="700"
          />
        </Modal>

        <MantineReactTable table={table}/>
      </>
  )
}
