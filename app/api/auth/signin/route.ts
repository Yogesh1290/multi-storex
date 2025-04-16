import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"
import { createSession } from "@/lib/session"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Authenticate user
    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create session token
    const token = await createSession(user)

    // Set session cookie with proper settings
    const cookieStore = cookies()
    cookieStore.set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Authentication successful",
    })
  } catch (error) {
    console.error("Error during sign in:", error)
    return NextResponse.json({ error: "An error occurred during sign in" }, { status: 500 })
  }
}
