"use client"
import 'mantine-react-table/styles.css';
import React, {useEffect, useMemo, useState} from "react";
import {fetchCourses, updateCourseStatus} from "@/app/components/courses/actions";
import '@mantine/charts/styles.css';
import COURSE_STATUS from "@/app/lib/COURSE_STATUS";
import {DonutChart} from "@mantine/charts";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {Alert, Anchor, Box, Button, Menu, Stack, Title} from "@mantine/core";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import AddSubjectForm from "@/app/dashboard/supervisor/mes-sujets/AddSubjectForm";
import {IconAlertCircle, IconChevronDown} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";

export default function CoursesPage({coursesType}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [pieData, setPieData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [opened, {open, close}] = useDisclosure(false);


  function countStatuses(data) {
    // Step 1: Count the occurrences of each status
    const statusCounts = data.reduce((acc, obj) => {
      let courseStatus = obj.courseStatus;
      if (acc[courseStatus]) {
        acc[courseStatus]++;
      } else {
        acc[courseStatus] = 1;
      }
      return acc;
    }, {});

    // Step 2: Map the status counts to the desired output format
    const statusColors = {
      NOT_STARTED: 'gray.5', IN_PROGRESS: 'blue.9', COMPLETED: 'green.9'
    };

    return Object.keys(statusCounts).filter(status => statusCounts[status] !== 0).map(status => ({
      name: COURSE_STATUS[status], value: statusCounts[status], color: statusColors[status]
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      await setIsLoading(true)
      let response = await fetchCourses(coursesType)
      await setData(response)
      await setPieData(countStatuses(response))
      await setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [{
    accessorKey: 'title', header: 'Titre de la formation', filterVariant: 'text', size: 400
  }, {
    accessorKey: 'organism', header: 'Organisme', filterVariant: 'text', size: 20,
  }, {
    accessorKey: 'courseStatus',
    header: 'Status',
    filterVariant: 'multi-select',
    size: 10,
    accessorFn: (row) => COURSE_STATUS[row.courseStatus],
    Cell: ({renderedCellValue, row}) => (
        <Box
            style={(theme) => ({
              backgroundColor: renderedCellValue === COURSE_STATUS["NOT_STARTED"] ? theme.colors.gray[5] : renderedCellValue === COURSE_STATUS["IN_PROGRESS"] ? theme.colors.blue[9] : theme.colors.green[9],
              borderRadius: '4px',
              color: '#fff',
              padding: '4px',
              width: "fit-content"
            })}
        >
          {renderedCellValue}
        </Box>
    ),
  },
    {
      accessorKey: 'link',
      header: '',
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({renderedCellValue, row}) => (
          <Anchor href={renderedCellValue} underline="hover" target="_blank">Lien de la formation⤤</Anchor>),
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
    renderCreateRowModalContent: () => (coursesType === "personal" && <Stack>
      <Title order={3}>Ajouter une nouvelle formation</Title>
      {/*todo: create form*/}
      <AddSubjectForm setRefresh={setRefresh}/>
    </Stack>),
    renderTopToolbarCustomActions: ({table}) => (coursesType === "personal" &&
        <Button onClick={() => table.setCreatingRow(true)}>Ajouter une nouvelle formation</Button>),
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
    verticalSpacing: "xl",
    state: {
      showSkeletons: isLoading
    },
    initialState: {
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
      pagination: {pageIndex: 0, pageSize: 15},
      columnVisibility: {
        organism: coursesType === "personal" //show this column for non-obligatory courses only
      },
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
      },
    },
    mantineTopToolbarProps: {pb: 50},

    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl', size: 'lg',
    },
    renderRowActions: ({row}) => (<Menu>
      <Menu.Target>
        <Button rightSection={<IconChevronDown stroke={1.5}/>} variant="default">Marquer comme</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item color="gray.5" onClick={async () => {
          await updateCourseStatus(row.original.id, "NOT_STARTED")
          setRefresh((refresh) => !refresh)
          open()
        }}>{COURSE_STATUS["NOT_STARTED"]}</Menu.Item>
        <Menu.Item color="blue.9" onClick={async () => {
          await updateCourseStatus(row.original.id, "IN_PROGRESS")
          setRefresh((refresh) => !refresh)
          open()
        }}>{COURSE_STATUS["IN_PROGRESS"]}</Menu.Item>
        <Menu.Item color="green.9" onClick={async () => {
          await updateCourseStatus(row.original.id, "COMPLETED")
          setRefresh((refresh) => !refresh)
          open()
        }}>{COURSE_STATUS["COMPLETED"]}</Menu.Item>
      </Menu.Dropdown>
    </Menu>),
    localization: MRT_Localization_FR,
  });

  return (
      <center>
        {opened && <Alert
            color="green"
            mb="1rem"
            title={`Status modifié avec succès`}
            icon={<IconAlertCircle/>}
            withCloseButton
            onClose={close}
        />}
        {!isLoading && data.length !== 0 &&
            <div style={{position: "absolute", right: 10, zIndex: 99}}><DonutChart size={130} data={pieData}
                                                                                   tooltipDataSource="segment"
                                                                                   withLabelsLine={false} withLabels
                                                                                   chartLabel={`Progrès: ${pieData.find(item => item.name === COURSE_STATUS["COMPLETED"])?.value ?? 0}/${data.length}`}
                                                                                   strokeWidth={pieData.length === 1 ? 0 : 1} // to remove the white stroke when there is only one item in the pie, for aesthetic reasons
            /></div>}
        <MantineReactTable table={table}/>
      </center>


  )

}
