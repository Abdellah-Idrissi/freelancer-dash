import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans , Playfair_Display } from 'next/font/google'
import favicon from "../../public/favicon.ico"
import { RtkProvider } from '@/rtk/RtkProvider'


const mainFont = DM_Sans({ subsets: ['latin'] })
export const secondFont = Playfair_Display({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Freelancer Dash',
  description: 'Created by Abdellah Moumen El Idrissi',
  icons: [{ rel: 'icon', url: favicon.src }],
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} bg-bgColor text-textColor transition-colors duration-200`}>

        <RtkProvider>
          {children}
        </RtkProvider>
        
      </body>
    </html>
  )
}
