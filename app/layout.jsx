"use client"
import '@mantine/core/styles.css';
import 'mantine-react-table/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {SessionProvider} from "next-auth/react";

export default function RootLayout({children}) {
  return (
      <html
          lang="fr"
      >
      <head>
        <ColorSchemeScript/>

        <title>
          Internship Management
        </title>
      </head>
      <body>
      <MantineProvider
          theme={{
            primaryColor: 'cb',
            primaryShade: 9,
            colors: {
              'cb': [
                "#ebf8ff",
                "#d6edfa",
                "#a7dbf8",
                "#77c8f6",
                "#56b7f5",
                "#45adf5",
                "#3ba7f6",
                "#3092db",
                "#2382c4",
                "#0070ad"
              ],
            },
          }}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </MantineProvider>
      </body>
      </html>
  )
}

