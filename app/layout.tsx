import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ensureMongoDBSchema } from "@/lib/utils/ensure-mongodb-schema"
import { AuthClientProvider } from "@/components/auth/auth-client-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StoreX - Deploy Your eCommerce Store Without Code",
  description: "Launch your online store in minutes with our SaaS platform.",
    generator: 'v0.dev'
}

// Initialize MongoDB schema
ensureMongoDBSchema().catch(console.error)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
        </AuthClientProvider>
      </body>
    </html>
  )
}


import './globals.css'