"use client"
import {IconAlertCircle} from "@tabler/icons-react";
import {Alert} from "@mantine/core";

export default function ErrorAlert({opened, close, title}) {
  if (!opened) return
  return (
      <Alert
          color="red"
          title={title}
          icon={<IconAlertCircle/>}
          withCloseButton
          onClose={close}
          mb="10px"
      />
  )

}
