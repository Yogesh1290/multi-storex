// This script checks if a user has admin role
// Run with: npx tsx scripts/check-admin-status.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"
import { createInterface } from "readline"

dotenv.config({ path: ".env.local" })

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function checkAdminStatus() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  // Prompt for the email of the user to check
  const userEmail = await new Promise<string>((resolve) => {
    readline.question("Enter the email of the user to check: ", (email) => {
      resolve(email.trim())
    })
  })

  if (!userEmail) {
    console.error("No email provided")
    process.exit(1)
  }

  console.log(`Checking admin status for email: ${userEmail}`)

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Find the user by email (case insensitive)
    const user = await db.collection("users").findOne({
      email: { $regex: new RegExp(`^${userEmail}$`, "i") },
    })

    if (!user) {
      console.error(`User with email ${userEmail} not found in the database`)
      console.log("Make sure the user has signed in at least once before running this script")
      process.exit(1)
    }

    console.log(`Found user: ${user.name || user.email}`)
    console.log(`User role: ${user.role || "undefined"}`)

    if (user.role === "admin") {
      console.log("✅ This user has admin access")
      console.log("They can access https://www.mernpress.com/admin")
    } else {
      console.log("❌ This user does NOT have admin access")
      console.log("They will be redirected to their dashboard if they try to access admin routes")
    }
  } catch (error) {
    console.error("Error checking admin status:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
    readline.close()
  }
}

checkAdminStatus().catch(console.error)
