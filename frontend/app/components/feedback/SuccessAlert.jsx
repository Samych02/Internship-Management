"use client"
import {IconCircleCheck} from "@tabler/icons-react";
import {Alert} from "@mantine/core";

export default function SuccessAlert({opened, close, title}) {
  if (!opened) return
  return (
      <Alert
          color="green"
          title={title}
          icon={<IconCircleCheck/>}
          withCloseButton
          onClose={close}
          mb="10px"
      />
  )

}
