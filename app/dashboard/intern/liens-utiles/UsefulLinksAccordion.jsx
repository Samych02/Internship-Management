"use client"
import {Accordion, Anchor, List} from "@mantine/core";
import USEFUL_LINKS from "@/app/constants/USEFUL_LINKS";

export default function UsefulLinksAccordion() {
  const links = USEFUL_LINKS

  const accordionItems = links.map((item) => (
      <Accordion.Item value={item.title}>
        <Accordion.Control>{item.title}</Accordion.Control>
        <Accordion.Panel>
          <List icon="•">
            {item.links.map((link) => (
                <List.Item>
                  <Anchor href={link.href} underline="hover"
                          target="_blank">{link.name}</Anchor>
                </List.Item>
            ))}
          </List>
        </Accordion.Panel>
      </Accordion.Item>
  ))


  return (<Accordion>
    {accordionItems}

  </Accordion>)
}
