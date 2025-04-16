"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { ChevronDown, User, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  // This ensures we only render the authenticated UI after
  // we've checked the session on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Don't render authentication-dependent UI until client-side
  // This prevents hydration mismatch errors
  if (!mounted) {
    return (
      <header className="w-full py-4 border-b bg-white">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            StoreX
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`text-sm ${pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}>
              Home
            </Link>
            <Link
              href="/features"
              className={`text-sm ${pathname === "/features" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`text-sm ${pathname === "/pricing" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className={`text-sm ${pathname === "/blog" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Render a placeholder button while checking auth state */}
            <Button variant="ghost" size="sm" disabled>
              Loading...
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="w-full py-4 border-b bg-white">
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          StoreX
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`text-sm ${pathname === "/" ? "text-blue-600 font-medium" : "text-gray-600"}`}>
            Home
          </Link>
          <Link
            href="/features"
            className={`text-sm ${pathname === "/features" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`text-sm ${pathname === "/pricing" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className={`text-sm ${pathname === "/blog" ? "text-blue-600 font-medium" : "text-gray-600"}`}
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {status === "authenticated" && session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2 h-9">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline-block">{session.user?.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onSelect={(event) => {
                    event.preventDefault()
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
