import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import ProgressBar from '~/components/nprogress'
import RecoilSetup from '~/components/recoil-setup'
import Toaster from '~/components/toaster'
import '../styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../../mocks')
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'My Store',
  description: 'Ecommerce site',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-900 text-white selection:text-white">
        <ProgressBar />
        <RecoilSetup>{children}</RecoilSetup>
        <Toaster />
      </body>
    </html>
  )
}
