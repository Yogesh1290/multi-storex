// This script creates an admin user in the database
// Run with: npx tsx scripts/create-admin.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function createAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Check if admin user already exists
    const adminEmail = process.env.ADMIN_EMAIL || "admin@storex.com"
    const existingAdmin = await db.collection("users").findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists`)

      // Update the user to have admin role if not already set
      if (existingAdmin.role !== "admin") {
        await db.collection("users").updateOne({ email: adminEmail }, { $set: { role: "admin" } })
        console.log(`Updated user ${adminEmail} to have admin role`)
      }

      return
    }

    // Create a new admin user
    const adminUser = {
      name: "Admin User",
      email: adminEmail,
      emailVerified: new Date(),
      role: "admin",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(adminUser)
    console.log(`Created admin user with ID: ${result.insertedId}`)

    console.log(`Admin user created successfully with email: ${adminEmail}`)
    console.log("You can now sign in with this email using Google OAuth")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

createAdmin().catch(console.error)
