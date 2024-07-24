import '@mantine/core/styles.css';

import {ColorSchemeScript, MantineColorsTuple, MantineProvider} from '@mantine/core';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

const capgemini_blue: MantineColorsTuple = [
  '#ebf8ff',
  '#d6edfa',
  '#a7dbf8',
  '#77c8f6',
  '#56b7f5',
  '#45adf5',
  '#3ba7f6',
  '#3092db',
  '#2382c4',
  '#0070ad'
];

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr">
      <head>
        <ColorSchemeScript/>
      </head>
      <body>
      <MantineProvider
          theme={{
            primaryColor: 'capgemini-blue',
            colors: {
              'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
            },
          }}
      >
        {children}
      </MantineProvider>
      </body>
      </html>
  )

}
)
