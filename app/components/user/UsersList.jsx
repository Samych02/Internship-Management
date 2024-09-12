"use client"

import {useEffect, useMemo, useState} from "react";
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {ActionIcon, Button, Group, Stack, Title, Tooltip} from "@mantine/core";
import {IconLockPassword, IconShieldHalf, IconTrash} from "@tabler/icons-react";
import {MRT_Localization_FR} from "mantine-react-table/locales/fr";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";
import {fetchUsers, resetPassword} from "@/app/components/user/actions";
import ROLES from "@/app/constants/ROLES";
import RegisterUserForm from "@/app/components/user/RegisterUserForm";
import {useSession} from "next-auth/react";

export default function UsersList() {
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const {update} = useSession()


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setData(await fetchUsers())
      setIsLoading(false)
    }
    fetchData()
  }, [refresh])

  const columns = useMemo(() => [
    {
      header: 'Nom complet',
      filterVariant: 'text',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`
    }, {
      accessorKey: 'email',
      header: 'Email',
      filterVariant: 'text',
    }, {
      header: 'Role',
      filterVariant: 'multi-select',
      accessorFn: (row) => ROLES[row.userRole],
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
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    renderCreateRowModalContent: () => (
        <Stack>
          <Title
              order={3}
          >
            Ajouter un utilisateur
          </Title>

          <RegisterUserForm
              setRefresh={setRefresh}
          />
        </Stack>
    ),
    renderTopToolbarCustomActions: ({table}) => (
        <Button
            onClick={() => table.setCreatingRow(true)}
        >
          Ajouter un utilisateur
        </Button>
    ),
    renderRowActions: ({row}) => (
        <Group
            style={{flexWrap: 'nowrap'}}
        >
          <Tooltip
              label="Réinitialiser le mot de passe"
          >
            <ActionIcon
                variant="filled"
                onClick={async () => {
                  const newPassword = Math.floor(100000 + Math.random() * 900000).toString()
                  setIsLoading(true)
                  await resetPassword(newPassword, row.original.id)
                  setIsLoading(false)
                  setFeedbackMessage(`Mot de passe réinitialisé avec succès! Nouveau mot de passe est: ${newPassword}`)
                }}
            >
              <IconLockPassword/>
            </ActionIcon>
          </Tooltip>

          <Tooltip
              label="Modifier le role de l'utilisateur"
          >
            <ActionIcon
                variant="filled"
                color="yellow"
                onClick={() => {
                  setSelectedUser(row.original.id)
                  //todo: ee
                  togglePDFModal.open()
                }}
            >
              <IconShieldHalf/>
            </ActionIcon>
          </Tooltip>

          <Tooltip
              label="Supprimer l'utilisateur"
          >
            <ActionIcon
                variant="filled"
                color="red"
                onClick={() => {
                  setSelectedUser(row.original.id)
                  //todo: ee
                  togglePDFModal.open()
                }}
            >
              <IconTrash/>
            </ActionIcon>
          </Tooltip>

        </Group>
    ),
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
