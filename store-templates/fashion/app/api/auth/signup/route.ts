import { NextResponse } from "next/server"
import { createUser, canCreateAdmin } from "@/lib/auth"
import { createSession } from "@/lib/session"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Check if admin account can be created
    const canCreate = await canCreateAdmin()
    if (!canCreate) {
      return NextResponse.json({ error: "Maximum number of admin accounts reached" }, { status: 403 })
    }

    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Create user
    const user = await createUser({ name, email, password, role: "admin" })

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
  } catch (error: any) {
    console.error("Error during sign up:", error)

    // Check for duplicate email error
    if (error.message && error.message.includes("duplicate key error")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    if (error.message && error.message.includes("User already exists")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json({ error: "Database connection error. Please check your MongoDB URI." }, { status: 500 })
    }

    return NextResponse.json({ error: "An error occurred during sign up" }, { status: 500 })
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
