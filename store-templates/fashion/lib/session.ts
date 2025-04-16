import { sign, verify } from "jsonwebtoken"
import type { User } from "./auth"

// Create a session token
export async function createSession(user: User): Promise<string> {
  // Get JWT secret from environment variable or use default
  const secret = process.env.JWT_SECRET || "your-secret-key-min-32-chars-long-here"

  // Create token payload
  const payload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  }

  // Sign token
  const token = sign(payload, secret, { expiresIn: "7d" })

  return token
}

// Verify session token
export async function verifySession(token: string) {
  try {
    // Get JWT secret from environment variable or use default
    const secret = process.env.JWT_SECRET || "your-secret-key-min-32-chars-long-here"

    // Verify token
    const payload = verify(token, secret)

    return payload
  } catch (error) {
    return null
  }
}
