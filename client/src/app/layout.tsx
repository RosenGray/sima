import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import StoreProvider from './StoreProvider'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Русская Доска объявлений Израиля',
  description: 'Доска объявлений израиля',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">

      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider attribute="class">
            <Theme accentColor='indigo'>{children}</Theme>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}