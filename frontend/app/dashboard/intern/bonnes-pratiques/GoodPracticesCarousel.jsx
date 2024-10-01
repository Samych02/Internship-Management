"use client"
import {Group, Stack, Text} from '@mantine/core';
import GOOD_PRACTICES from "@/app/constants/GOOD_PRACTICES";
import {Carousel} from "@mantine/carousel";


export default function GoodPracticesCarousel() {
  const slides = GOOD_PRACTICES.map((practice) => (
      <Carousel.Slide key={practice}>
        <Group
            bg="cb.5"
            h="20rem"
            w="full"
            justify="center"
            align="center"
            px="1rem"
        >
          <Text
              fw={700}
              ta="center"
              c="white"
              size="xl"
          >
            {practice}
          </Text>
        </Group>
      </Carousel.Slide>
  ));

  return (
      <Stack
          w="full"
          align="center"
          gap="xl"
      >
        <Text
            fw={1000}
            ta="center"
            size="xl">
          Pour un bon déroulement du stage, le stagiaire est mené à respecter les consignes suivantes:
        </Text>

          <Carousel
              w="60%"
              slideSize="70%"
              slideGap="md"
              loop
              draggable={false}
              withIndicators
          >
            {slides}
          </Carousel>
      </Stack>
  );
}
