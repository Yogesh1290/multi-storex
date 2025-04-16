import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check authentication server-side
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated or not admin
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="pl-[240px]">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
