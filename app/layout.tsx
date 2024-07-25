import '@mantine/core/styles.css';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import "./globals.css"

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
  return (
      <html lang="fr">
      <head>
        <ColorSchemeScript/>
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

