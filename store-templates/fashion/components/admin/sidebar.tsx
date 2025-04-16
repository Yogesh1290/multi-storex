"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Users, CreditCard, Settings, BarChart } from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const adminRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin"

  const navigation = [
    { name: "Dashboard", href: `/${adminRoute}`, icon: Home },
    { name: "Products", href: `/${adminRoute}/products`, icon: ShoppingBag },
    { name: "Customers", href: `/${adminRoute}/customers`, icon: Users },
    { name: "Orders", href: `/${adminRoute}/orders`, icon: CreditCard },
    { name: "Analytics", href: `/${adminRoute}/analytics`, icon: BarChart },
    { name: "Settings", href: `/${adminRoute}/settings`, icon: Settings },
  ]

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-xl font-bold">ELEGANCE</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"}`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t p-4">
        <Link href="/" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">View Store</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
