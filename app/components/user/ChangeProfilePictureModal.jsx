"use client"

import {useDisclosure} from "@mantine/hooks";
import {Avatar, Button, FileButton, Group, Modal, Stack} from "@mantine/core";
import ErrorAlert from "@/app/components/feedback/ErrorAlert";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";
import React, {useState} from "react";

export default function ChangeProfilePictureModal({opened, toggle, session}) {
  const [errorOpened, toggleError] = useDisclosure(false)
  const [successOpened, toggleSuccess] = useDisclosure(false)
  const [avatarSrc, setAvatarSrc] = useState(`http://localhost/profile-pictures/${session?.user.image}`);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(session?.user.image);
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };

      reader.readAsDataURL(file);
      setImageFile(file); // Store the file in state
    } else {
      setImagePreview(session?.user.image); // Clear preview if no file is selected
    }
  };
  return (
      <Modal
          opened={opened}
          onClose={() => {
            setImagePreview(session?.user.image === null ? "" : session?.user.image)
            toggle.close()
          }}
          withCloseButton
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
          title="Modifier votre image de profile"
      >
        <ErrorAlert
            close={toggleError.close}
            opened={errorOpened}
            title="Ancien mot de passe incorrect"
        />

        <SuccessAlert
            close={toggleSuccess.close}
            opened={successOpened}
            title="Image de profil modifiée avec succes!"
        />
        <Stack
            align="center"
        >

          <Avatar
              size="200"
              src={imagePreview}
              alt="image profile"
          />
          <Group
              justify="center"
              mt="xl"
          >
            <Group justify="center">
              <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Modifier</Button>}
              </FileButton>
            </Group>

          </Group>
        </Stack>
      </Modal>
  )

}
