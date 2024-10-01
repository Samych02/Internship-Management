"use client"
import {Accordion, List} from "@mantine/core";

export default function InternshipDetail({row}) {
  return (<Accordion>
    <Accordion.Item value="1">
      <Accordion.Control>Informations sur le sujet</Accordion.Control>
      <Accordion.Panel>
        <List>
          <List.Item>Titre du sujet: {row.title}</List.Item>
          <List.Item>Année: {row.year}</List.Item>
          <List.Item>Type du stage: {row.internshipType}</List.Item>
        </List>

      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="2">
      <Accordion.Control>Informations sur l&apos;équipe</Accordion.Control>
      <Accordion.Panel>
        <List>
          <List.Item>Équipe: {row.team ?? "-"}</List.Item>
          <List.Item>Manager: {row.managerFullName ?? "-"}</List.Item>
          <List.Item>Encadrant: {row.supervisorFullName ?? "-"}</List.Item>
        </List>
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="3">
      <Accordion.Control>Informations sur le stagiaire</Accordion.Control>
      <Accordion.Panel>
        <List>
          <List.Item>Stagiaire: {row.internFullName ?? "-"}</List.Item>
          <List.Item>École: {row.schoolName ?? "-"}</List.Item>
        </List>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>)

}
