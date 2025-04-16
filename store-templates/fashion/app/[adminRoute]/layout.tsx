import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import AdminNavbar from "@/components/admin/navbar"
import AdminSidebar from "@/components/admin/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
  params: {
    adminRoute: string
  }
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  // Verify that the admin route matches the environment variable
  const expectedAdminRoute = process.env.ADMIN_ROUTE || "admin"

  if (params.adminRoute !== expectedAdminRoute) {
    redirect("/")
  }

  // Get the current session
  const session = await getSession()

  // If no session or not an admin, redirect to login
  if (!session || session.role !== "admin") {
    redirect(`/auth/signin?callbackUrl=/${params.adminRoute}`)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar user={session} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
