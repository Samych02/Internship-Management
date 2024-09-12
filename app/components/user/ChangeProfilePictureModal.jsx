"use client"

import {useDisclosure} from "@mantine/hooks";
import {Avatar, Button, FileButton, Group, Modal, Stack} from "@mantine/core";
import ErrorAlert from "@/app/components/feedback/ErrorAlert";
import SuccessAlert from "@/app/components/feedback/SuccessAlert";
import React, {useState} from "react";
import {updateProfilePicture} from "@/app/components/user/actions";
import {useSession} from "next-auth/react";

export default function ChangeProfilePictureModal({opened, toggle, imageSrc}) {
  const [errorMessage, setErrorMessage] = useState("")
  const [successOpened, toggleSuccess] = useDisclosure(false)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(imageSrc);
  const {update} = useSession()


  const handleFileChange = (file) => {
    if (file) {
      // Check file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrorMessage("L'image sélectionnée est invalide.");
        setImagePreview(imageSrc);
        setImageFile(null);
        return;
      }

      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrorMessage("L'image sélectionnée ne doit pas dépasser 5MO");
        setImagePreview(imageSrc);
        setImageFile(null);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };

      reader.readAsDataURL(file);
      setImageFile(file); // Store the file in state
    } else {
      setImagePreview(imageSrc); // Clear preview if no file is selected
    }
  };
  return (
      <Modal
          opened={opened}
          onClose={() => {
            setImagePreview(imageSrc)
            toggle.close()
          }}
          withCloseButton
          overlayProps={{blur: 4, backgroundOpacity: 0.55}}
          title="Modifier votre image de profile"
          size="lg"
      >
        <ErrorAlert
            close={() => {
              setErrorMessage("")
            }}
            opened={errorMessage !== ""}
            title={errorMessage}
        />

        <SuccessAlert
            close={toggleSuccess.close}
            opened={successOpened}
            title="Image de profil modifiée avec succes, merci de bien rafraichir la page"
        />
        <Stack
            align="center"
            mt="1rem"
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

              <Button
                  disabled={imagePreview === null}
                  bg="green"
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append("file", imageFile)
                    const image = await updateProfilePicture(formData)
                    if (image !== "") {
                      await update({
                        user: {
                          image: `${process.env.NEXT_PUBLIC_STATIC_FILES_URL}${image}?&v=${Math.random()}`
                        }
                      })
                      toggleSuccess.open()
                    }

                  }}
              >
                Sauvegarder
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
  )

}
