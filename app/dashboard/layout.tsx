import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { UserNav } from "@/components/dashboard/user-nav"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication server-side
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/signin?callbackUrl=/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="pl-[196px]">
        <div className="flex h-14 items-center justify-end border-b bg-white px-4">
          <UserNav />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
