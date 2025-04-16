import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/api/auth/signin",
    "/api/auth/signup",
    "/api/auth/callback/google",
    "/terms",
    "/privacy",
    "/contact",
    "/pricing",
  ]

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (publicPath) =>
      pathname === publicPath ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/static/"),
  )

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check for NextAuth session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Check for custom session
  const customSessionToken = request.cookies.get("session")?.value

  // If no session, redirect to sign-in
  if (!token && !customSessionToken) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If it's an admin route, check for admin role
  if (pathname.startsWith("/admin")) {
    const isAdmin = token?.role === "admin"

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
}
