import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SessionProvider } from "@/components/SessionProvider"
import "./globals.css"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Vexi | Developer-First AI Agent Spend Management",
  description: "Scoped, auditable authorization for autonomous transactions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-inter bg-background text-textPrimary selection:bg-accent/30 min-h-screen">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

