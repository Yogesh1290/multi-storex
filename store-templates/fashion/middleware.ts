import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Skip middleware for auth routes and API routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Get the admin route from environment variable or use the default
  const adminRoute = process.env.ADMIN_ROUTE || "admin"

  // Check if the path starts with the admin route
  const isAdminRoute = pathname.startsWith(`/${adminRoute}`)

  // Handle admin routes
  if (isAdminRoute) {
    const token = request.cookies.get("session")?.value

    // If no token, redirect to sign in
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }

    try {
      // Verify token
      const secretKey = process.env.JWT_SECRET || "your-secret-key-min-32-chars-long-here"
      const key = new TextEncoder().encode(secretKey)
      const verified = await jwtVerify(token, key)

      // Check if user is admin
      if (verified.payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }

      // User is authenticated and is an admin, proceed
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Not an admin route, proceed
  return NextResponse.next()
}

// Update the matcher to include all paths except specific ones
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /_next (Next.js internals)
     * 2. /static (static files)
     * 3. /favicon.ico (favicon file)
     */
    "/((?!_next|static|favicon.ico).*)",
  ],
}
