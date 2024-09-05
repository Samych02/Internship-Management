"use client"
import React, {useEffect, useMemo, useState} from "react";
import {fetchCourses, updateCourseStatus} from "@/app/components/courses/actions";
import '@mantine/charts/styles.css';
import COURSE_STATUS from "@/app/constants/COURSE_STATUS";
import {DonutChart} from "@mantine/charts";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {Anchor, Box, Button, Menu, Stack, Title} from "@mantine/core";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {IconChevronDown} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import AddCourseForm from "@/app/components/courses/AddCourseForm";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";

export default function CoursesList({coursesType}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [pieData, setPieData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [openedSuccess, toggleSuccess] = useDisclosure(false);


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
      NOT_STARTED: 'gray.5', IN_PROGRESS: 'cb', COMPLETED: 'green'
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
  }, [coursesType, refresh])

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Titre de la formation',
      filterVariant: 'text',
    }, {
      accessorKey: 'organism',
      header: 'Organisme',
      filterVariant: 'text',
      size: 20,
    }, {
      accessorKey: 'courseStatus',
      header: 'Status',
      filterVariant: 'multi-select',
      size: 10,
      accessorFn: (row) => COURSE_STATUS[row.courseStatus],
      Cell: ({renderedCellValue, row}) => (
          <Box
              c="white"
              p="4px"
              w="fit-content"
              bg={renderedCellValue === COURSE_STATUS["NOT_STARTED"] ? "gray.5"
                  : renderedCellValue === COURSE_STATUS["IN_PROGRESS"] ? "cb"
                      : "green"}
              style={{
                borderRadius: '4px',
              }}
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
          <Anchor
              href={renderedCellValue}
              underline="hover"
              target="_blank"
          >
            Lien de la formation⤤
          </Anchor>
      ),
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
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
      pagination: {pageIndex: 0, pageSize: 15},
      columnVisibility: {
        organism: coursesType === "personal" //show this column for non-obligatory courses only
      },
    },
    verticalSpacing: "xl",
    mantineTopToolbarProps: {pb: 50},
    renderCreateRowModalContent: () => (
        coursesType === "personal" &&
        <Stack>
          <Title
              order={3}
          >
            Ajouter une nouvelle formation
          </Title>

          <AddCourseForm
              setRefresh={setRefresh}
          />
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        coursesType === "personal" &&
        <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Ajouter une nouvelle formation
        </Button>
    ),
    renderRowActions: ({row}) => (
        <Menu>
          <Menu.Target>
            <Button
                rightSection={<IconChevronDown stroke={1.5}/>}
                variant="default"
            >
              Marquer comme
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
                color="gray.9"
                onClick={async () => {
                  await updateCourseStatus(row.original.id, "NOT_STARTED")
                  setRefresh((refresh) => !refresh)
                  toggleSuccess.open()
                }}
            >
              {COURSE_STATUS["NOT_STARTED"]}
            </Menu.Item>

            <Menu.Item
                color="cb"
                onClick={async () => {
                  await updateCourseStatus(row.original.id, "IN_PROGRESS")
                  setRefresh((refresh) => !refresh)
                  toggleSuccess.open()
                }}
            >
              {COURSE_STATUS["IN_PROGRESS"]}
            </Menu.Item>

            <Menu.Item
                color="green"
                onClick={async () => {
                  await updateCourseStatus(row.original.id, "COMPLETED")
                  setRefresh((refresh) => !refresh)
                  toggleSuccess.open()
                }}
            >
              {COURSE_STATUS["COMPLETED"]}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
    ),
  });

  return (
      <center>
        <SuccessAlert
            opened={openedSuccess}
            close={toggleSuccess.close}
            title="Status modifié avec succès"
        />
        {!isLoading && data.length !== 0 &&
            <div
                style={{
                  position: "absolute",
                  right: 50,
                  top: openedSuccess ? 200 : 120,
                  zIndex: 99
                }}
            >
              <DonutChart
                  size={140}
                  data={pieData}
                  tooltipDataSource="segment"
                  withLabelsLine={false}
                  chartLabel={`Progrès: ${pieData.find(item => item.name === COURSE_STATUS["COMPLETED"])?.value ?? 0}/${data.length}`}
                  strokeWidth={pieData.length === 1 ? 0 : 1} // to remove the white stroke when there is only one item in the pie, for aesthetic reasons
              />
            </div>
        }

        <MantineReactTable table={table}/>
      </center>


  )

}
