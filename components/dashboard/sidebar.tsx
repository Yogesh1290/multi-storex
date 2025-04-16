"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingBag, Package, BarChart3, Users, CreditCard, Settings, Bell } from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Stores",
    href: "/dashboard/stores",
    icon: ShoppingBag,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[196px] border-r bg-white h-screen fixed left-0 top-0">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          StoreX
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-full p-1 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.title}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
