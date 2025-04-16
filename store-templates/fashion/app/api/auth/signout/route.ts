import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Clear the session cookie
    cookies().set({
      name: "session",
      value: "",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error during sign out:", error)
    return NextResponse.json({ error: "An error occurred during sign out" }, { status: 500 })
  }
}
