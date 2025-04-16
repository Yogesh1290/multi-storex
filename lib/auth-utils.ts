import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Function to get the current session
export async function getSession() {
  // First try to get the session from NextAuth
  const session = await getServerSession(authOptions)

  if (session) {
    return session
  }

  // If no NextAuth session, check for our custom session
  const customSessionToken = cookies().get("session")?.value

  if (!customSessionToken) {
    return null
  }

  try {
    // Verify the custom session token
    // This is a simplified version - in production, you'd verify the JWT
    return { user: { email: "user@example.com" } }
  } catch (error) {
    console.error("Error verifying custom session:", error)
    return null
  }
}

// Function to check if the user is authenticated
export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return session
}
