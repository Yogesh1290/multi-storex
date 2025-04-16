// This is a script you can run to check your MongoDB connection
// Run with: npx tsx scripts/check-mongodb.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function checkMongoDB() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  console.log("Connecting to MongoDB...")
  console.log("URI:", process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, "mongodb+srv://$1:****@"))

  const client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })

  try {
    await client.connect()
    console.log("✅ Successfully connected to MongoDB")

    const db = client.db()
    console.log("Database name:", db.databaseName)

    // List collections
    const collections = await db.listCollections().toArray()
    console.log("Collections:", collections.map((c) => c.name).join(", "))

    // Check users collection
    if (collections.some((c) => c.name === "users")) {
      const userCount = await db.collection("users").countDocuments()
      console.log("Users count:", userCount)

      // Check indexes
      const indexes = await db.collection("users").indexes()
      console.log("User collection indexes:", indexes.map((idx) => idx.name).join(", "))

      // Check for users with null userName
      const nullUserNames = await db.collection("users").countDocuments({ userName: null })
      console.log("Users with null userName:", nullUserNames)
    }

    console.log("✅ MongoDB check completed successfully")
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

checkMongoDB().catch(console.error)
