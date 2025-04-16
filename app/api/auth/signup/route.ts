import { NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { createSession } from "@/lib/session"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Create user
    const user = await createUser({ name, email, password, role: "user" })

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Create session token
    const token = await createSession(user)

    // Set session cookie
    cookies().set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error during sign up:", error)
    return NextResponse.json({ error: "An error occurred during sign up" }, { status: 500 })
  }
}
