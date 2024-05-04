import { exo2Font } from "@/app/font"
import Navbar from "@/components/navbar/navbar"
import type { Metadata } from "next"
import Head from "next/head"
import React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cyberpunk",
  description: "Concept e-commerce store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
      </Head>
      <body className={`${exo2Font.className} bg-black text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
