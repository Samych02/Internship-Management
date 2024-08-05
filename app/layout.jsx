import '@mantine/core/styles.css';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import "./globals.css"

export default function RootLayout({children,}) {
  return (
      <html lang="fr">
      <head>
        <ColorSchemeScript/><
          title>Internship Management</title>
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
        {children}
      </MantineProvider>
      </body>
      </html>
  )
}

