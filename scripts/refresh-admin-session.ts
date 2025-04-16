// This script creates a session refresh endpoint
// Run with: npx tsx scripts/refresh-admin-session.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function refreshAdminSession() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Get email from command line or prompt
    const email = process.argv[2] || (await promptForEmail())

    // Find the user by email
    const user = await db.collection("users").findOne({ email })

    if (!user) {
      console.error(`User with email ${email} not found in the database`)
      process.exit(1)
    }

    console.log(`Found user: ${user.name || user.email}`)
    console.log(`Current role: ${user.role || "undefined"}`)

    // Check if user already has admin role
    if (user.role === "admin") {
      console.log("User already has admin role")

      // Force update the sessions collection to refresh tokens
      const result = await db
        .collection("sessions")
        .updateMany({ "session.user.email": email }, { $set: { "session.user.role": "admin" } })

      console.log(`Updated ${result.modifiedCount} sessions`)

      // Also update the accounts collection
      const accountResult = await db
        .collection("accounts")
        .updateMany({ userId: user._id }, { $set: { "user.role": "admin" } })

      console.log(`Updated ${accountResult.modifiedCount} accounts`)

      console.log("✅ Session data updated. Please sign out and sign back in to refresh your session.")
    } else {
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

      if (result.modifiedCount === 0) {
        console.error(`Failed to update user with email ${email}`)
        process.exit(1)
      }

      console.log(`Successfully updated user ${email} to have admin role`)
      console.log("✅ Please sign out and sign back in to refresh your session.")
    }
  } catch (error) {
    console.error("Error refreshing admin session:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

async function promptForEmail() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    readline.question("Enter the email of the user to make admin: ", (email) => {
      readline.close()
      resolve(email)
    })
  })
}

refreshAdminSession().catch(console.error)
