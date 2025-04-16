import clientPromise from "@/lib/mongodb"

/**
 * This function ensures the MongoDB collections have the correct schema
 * It will be called during application startup
 */
export async function ensureMongoDBSchema() {
  try {
    const client = await clientPromise
    const db = client.db()

    // Check if the users collection exists
    const collections = await db.listCollections({ name: "users" }).toArray()

    // Create indexes for the users collection if it doesn't exist
    if (collections.length === 0) {
      await db.createCollection("users")

      // Create indexes for the users collection
      await db.collection("users").createIndex({ email: 1 }, { unique: true })
      await db.collection("users").createIndex({ name: 1 })
    }

    // Create indexes for the accounts collection if it doesn't exist
    const accountsCollections = await db.listCollections({ name: "accounts" }).toArray()
    if (accountsCollections.length === 0) {
      await db.createCollection("accounts")

      // Create indexes for the accounts collection
      await db.collection("accounts").createIndex({ userId: 1 })
      await db.collection("accounts").createIndex({ provider: 1, providerAccountId: 1 }, { unique: true })
    }

    // Create indexes for the sessions collection if it doesn't exist
    const sessionsCollections = await db.listCollections({ name: "sessions" }).toArray()
    if (sessionsCollections.length === 0) {
      await db.createCollection("sessions")

      // Create indexes for the sessions collection
      await db.collection("sessions").createIndex({ sessionToken: 1 }, { unique: true })
      await db.collection("sessions").createIndex({ userId: 1 })
    }

    console.log("MongoDB schema setup complete")
    return true
  } catch (error) {
    console.error("Error setting up MongoDB schema:", error)
    return false
  }
}
