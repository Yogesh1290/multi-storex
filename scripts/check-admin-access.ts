// This script checks if a user has admin access
// Run with: npx tsx scripts/check-admin-access.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function checkAdminAccess() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  if (!process.env.ADMIN_EMAIL) {
    console.error("ADMIN_EMAIL is not defined in environment variables")
    process.exit(1)
  }

  const adminEmail = process.env.ADMIN_EMAIL
  console.log(`Checking admin access for email: ${adminEmail}`)

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Find the user by email
    const user = await db.collection("users").findOne({
      email: adminEmail,
    })

    if (!user) {
      console.error(`User with email ${adminEmail} not found in the database`)
      console.log("Make sure you've signed in at least once with this email before running this script")
      process.exit(1)
    }

    console.log(`Found user: ${user.name || user.email}`)
    console.log(`User role: ${user.role || "undefined"}`)
    console.log(`User email: ${user.email}`)
    console.log(`ADMIN_EMAIL: ${adminEmail}`)

    const isAdmin = user.role === "admin" && user.email === adminEmail

    if (isAdmin) {
      console.log("✅ User has admin access")
    } else {
      console.log("❌ User does not have admin access")
      if (user.role !== "admin") {
        console.log("  - Role is not set to 'admin'")
      }
      if (user.email !== adminEmail) {
        console.log("  - Email does not match ADMIN_EMAIL environment variable")
      }
    }
  } catch (error) {
    console.error("Error checking admin access:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

checkAdminAccess().catch(console.error)
