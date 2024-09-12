"use client"

import React, {useEffect, useMemo, useState} from "react";
import COURSE_STATUS from "@/app/constants/COURSE_STATUS";
import {getInternTrackingCourses} from "@/app/components/courses/actions";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import {DonutChart} from "@mantine/charts";


export default function MandatoryCoursesTrackingList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])


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
      let response = await getInternTrackingCourses()
      await setData(response)
      await setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns = useMemo(() => [
    {
      accessorKey: 'internName',
      header: 'Stagiaire',
      filterVariant: 'text',
    }, {
      header: 'Avancement',
      filterVariant: 'none',
      Cell: ({row}) => {
        const pieData = countStatuses(row.original.courseProjectionList)
            return (
                <DonutChart
                    size={140}
                    data={pieData}
                    tooltipDataSource="segment"
                    withLabelsLine={false}
                    chartLabel={`Progrès: ${pieData.find(item => item.name === COURSE_STATUS["COMPLETED"])?.value ?? 0}/${row.original.courseProjectionList.length}`}
                    strokeWidth={pieData.length === 1 ? 0 : 1} // to remove the white stroke when there is only one item in the pie, for aesthetic reasons
                />
            )
          }
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
      showColumnFilters: true, columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'], right: ['mrt-row-actions'],
      },
      pagination: {pageIndex: 0, pageSize: 15},
    },
  });

  return (
      <MantineReactTable table={table}/>
  )
}
