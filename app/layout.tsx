import './globals.css'

import Modal from 'components/common/Modal'
import BaseLayout from 'components/layout/Layout'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import ModalProvider from 'providers/ModalProvider'
import RecoilProvider from 'providers/RecoilProvider'
import TanstackProvider from 'providers/TanstackProvider'
import { ThemeProvider } from 'providers/ThemeProvider'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="flex justify-center">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased w-full m-w-320pxr max-w-375pxr self-center h-dvh',
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="default"
          enableSystem
          disableTransitionOnChange>
          <RecoilProvider>
            <TanstackProvider>
              <BaseLayout>{children}</BaseLayout>
              <Modal />
            </TanstackProvider>
          </RecoilProvider>
          <ModalProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
