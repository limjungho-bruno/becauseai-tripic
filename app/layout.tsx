import type React from "react"

import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { TripTasteProvider } from "./context/TripTasteContext"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <title>TripTaste - 당신의 취향에 맞는 여행</title>
      </head>
      <body className={`font-sans antialiased ${_geist.className}`}>
        <TripTasteProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">{children}</div>
        </TripTasteProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
