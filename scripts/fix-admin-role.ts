// This script updates a user to have admin role
// Run with: npx tsx scripts/fix-admin-role.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"
import { createInterface } from "readline"

dotenv.config({ path: ".env.local" })

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function fixAdminRole() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  // Prompt for the email of the user to make admin
  const adminEmail = await new Promise<string>((resolve) => {
    readline.question("Enter the email of the user you want to make admin: ", (email) => {
      resolve(email.trim())
    })
  })

  if (!adminEmail) {
    console.error("No email provided")
    process.exit(1)
  }

  console.log(`Setting admin role for email: ${adminEmail}`)

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Find the user by email (case insensitive)
    const user = await db.collection("users").findOne({
      email: { $regex: new RegExp(`^${adminEmail}$`, "i") },
    })

    if (!user) {
      console.error(`User with email ${adminEmail} not found in the database`)
      console.log("Make sure you've signed in at least once with this email before running this script")
      process.exit(1)
    }

    console.log(`Found user: ${user.name || user.email}`)

    // Update the user to have admin role
    const result = await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          role: "admin",
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      console.error(`Failed to update user with email ${adminEmail}`)
      process.exit(1)
    }

    console.log(`Successfully updated user ${adminEmail} to have admin role`)

    // Verify the update
    const updatedUser = await db.collection("users").findOne({ _id: user._id })
    console.log(`User role is now: ${updatedUser?.role || "undefined"}`)

    if (updatedUser?.role === "admin") {
      console.log("✅ User is now properly configured as an admin")
      console.log("Please sign out and sign back in to refresh your session")
      console.log("You can now access https://www.mernpress.com/admin")
    } else {
      console.log("⚠️ User is not properly configured as an admin")
    }
  } catch (error) {
    console.error("Error updating admin role:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
    readline.close()
  }
}

fixAdminRole().catch(console.error)
