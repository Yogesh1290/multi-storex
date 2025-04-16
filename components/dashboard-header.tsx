import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"

export function DashboardHeader() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary mr-4">
        StoreX
      </Link>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}
