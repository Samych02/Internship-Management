"use client"
import {Accordion, Anchor, List} from "@mantine/core";
import USEFUL_LINKS from "@/app/constants/USEFUL_LINKS";

export default function UsefulLinksAccordion() {
  const links = USEFUL_LINKS

  const accordionItems = links.map((item, index) => (
      <Accordion.Item
          value={item.title}
          key={index}
      >
        <Accordion.Control>
          {item.title}
        </Accordion.Control>
        <Accordion.Panel>
          <List icon="•">
            {item.links.map((link, index2) => (
                <List.Item key={index2}>
                  <Anchor
                      href={link.href}
                      underline="hover"
                      target="_blank"
                  >
                    {link.name}
                  </Anchor>
                </List.Item>
            ))}
          </List>
        </Accordion.Panel>
      </Accordion.Item>
  ))


  return (
      <Accordion>
        {accordionItems}
      </Accordion>
  )
}
