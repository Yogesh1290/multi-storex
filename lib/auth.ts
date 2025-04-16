import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

// User type
export interface User {
  _id: ObjectId
  name: string
  email: string
  password?: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}

// MongoDB connection
// let client: MongoClient | null = null  // REMOVE
// let clientPromise: Promise<MongoClient> | null = null  // REMOVE

async function connectToDatabase() {
  // if (clientPromise) return clientPromise  // REMOVE

  const uri = process.env.MONGODB_URI
  if (!uri || uri === "not_set") {
    throw new Error("MONGODB_URI is not defined or not properly set")
  }

  // client = new MongoClient(uri)  // REMOVE
  // clientPromise = client.connect()  // REMOVE
  return clientPromise
}

// Create a new user
export async function createUser({
  name,
  email,
  password,
  role = "user",
}: {
  name: string
  email: string
  password: string
  role?: "admin" | "user"
}) {
  try {
    const client = await connectToDatabase()
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      throw new Error("User already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Get the created user
    const user = await db.collection("users").findOne({ _id: result.insertedId })
    return user as User
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Authenticate user
export async function authenticateUser(email: string, password: string) {
  try {
    const client = await connectToDatabase()
    const db = client.db()

    // Find user by email
    const user = await db.collection("users").findOne({ email })
    if (!user) return null

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    return user as User
  } catch (error) {
    console.error("Error authenticating user:", error)
    return null
  }
}

// Check if admin account can be created
export async function canCreateAdmin() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri || uri === "not_set") {
      // If MongoDB URI is not set, allow admin creation (first-time setup)
      return true
    }

    const client = await connectToDatabase()
    const db = client.db()

    // Count admin users
    const adminCount = await db.collection("users").countDocuments({ role: "admin" })

    // Allow only 1 admin account for simplicity
    return adminCount < 1
  } catch (error) {
    console.error("Error checking admin count:", error)
    // If there's an error, default to allowing admin creation
    return true
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    const client = await connectToDatabase()
    const db = client.db()

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return user as User | null
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  // Add the MongoDB adapter to save users to the database
  adapter: MongoDBAdapter(clientPromise, {
    // Add adapter options for better error handling
    databaseName: "storex", // Specify your database name
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          role: user.role || "user",
        }
      }

      // On subsequent calls, fetch the latest user data from MongoDB
      if (token.email) {
        try {
          const client = await clientPromise
          const db = client.db()
          const dbUser = await db.collection("users").findOne({ email: token.email })

          if (dbUser) {
            // Update the token with the latest role from the database
            token.role = dbUser.role || "user"
          }
        } catch (error) {
          console.error("Error fetching user from DB in JWT callback:", error)
          // Continue with existing token data instead of failing
          // This prevents authentication failures when DB is unavailable
        }
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "user" | "admin"
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
