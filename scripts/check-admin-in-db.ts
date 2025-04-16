// This script checks if a user has admin role in the database
// Run with: npx tsx scripts/check-admin-in-db.ts your-email@example.com

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function checkAdminInDb() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  // Get email from command line
  const email = process.argv[2]

  if (!email) {
    console.error("Please provide an email address")
    console.error("Usage: npx tsx scripts/check-admin-in-db.ts your-email@example.com")
    process.exit(1)
  }

  console.log(`Checking admin role for email: ${email}`)

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Find the user by email
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      console.error(`User with email ${email} not found in the database`)
      process.exit(1)
    }

    console.log("User found in database:")
    console.log(`- Name: ${user.name || "N/A"}`)
    console.log(`- Email: ${user.email}`)
    console.log(`- Role: ${user.role || "No role set"}`)

    if (user.role === "admin") {
      console.log("✅ User has admin role in the database")
    } else {
      console.log("❌ User does NOT have admin role in the database")

      // Ask if user wants to set the admin role
      console.log("\nWould you like to set the admin role for this user? (y/n)")
      process.stdin.once("data", async (data) => {
        const answer = data.toString().trim().toLowerCase()

        if (answer === "y" || answer === "yes") {
          // Update the user to have admin role
          const result = await db.collection("users").updateOne({ _id: user._id }, { $set: { role: "admin" } })

          if (result.modifiedCount === 1) {
            console.log("✅ Successfully set admin role for user")
            console.log("Please sign out and sign back in to refresh your session")
          } else {
            console.log("❌ Failed to update user role")
          }
        }

        process.exit(0)
      })
    }
  } catch (error) {
    console.error("Error checking admin role:", error)
    process.exit(1)
  }
}

checkAdminInDb().catch(console.error)
