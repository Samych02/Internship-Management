"use client"
import {List, MantineProvider, Title} from "@mantine/core";
import '@mantine/carousel/styles.css';
import GOOD_PRACTICES from "@/app/constants/GOOD_PRACTICES";

export default function GoodPracticesCarousel() {

  return (
      <MantineProvider>
        <div className="flex flex-col">
          <Title mb={50} size="h3">Pour un bon déroulement du stage, le stagiaire est mené à respecter les consignes
            suivantes:</Title>
          <List type="ordered">
            {GOOD_PRACTICES.map((item) => (<List.Item>• {item}</List.Item>))}
          </List>
        </div>
      </MantineProvider>

  )

}
