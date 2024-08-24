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
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)

export default function ResumeList() {
  const [pdfModalOpened, togglePDFModal] = useDisclosure(false);
  const [path, setPath] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      await setData(await fetchResumes())
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [{
    accessorKey: 'internFullName', header: 'Nom du candidat', filterVariant: 'text', size: 250,
  }, {
    accessorKey: 'studyField',
    header: 'Catégorie',
    filterVariant: 'multi-select',
    accessorFn: (row) => STUDY_FIELD[row.studyField],
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
      <Title order={3}>Recommander un CV</Title>
      <AddResumeForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (
        <Button onClick={() => table.setCreatingRow(true)}>Recommander un CV</Button>),
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
      <Tooltip label="Afficher le CV">
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

    <MantineReactTable table={table}/>
  </>)

}
