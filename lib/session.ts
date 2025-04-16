import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function createSession(user: any) {
  // Create a session token with user data
  const token = sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role || "user",
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )

  return token
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return null
  }

  try {
    // Verify and decode the token
    const session = verify(token, JWT_SECRET)
    return session
  } catch (error) {
    console.error("Error verifying session:", error)
    return null
  }
}

export async function verifySession(token: string) {
  try {
    // Verify and decode the token
    const session = verify(token, JWT_SECRET)
    return session
  } catch (error) {
    console.error("Error verifying session:", error)
    return null
  }
}

export async function clearSession() {
  const cookieStore = cookies()
  cookieStore.delete("session")
}
