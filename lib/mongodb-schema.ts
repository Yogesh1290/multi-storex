import clientPromise from "./mongodb"

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

    // If the users collection exists, fix any schema issues
    if (collections.length > 0) {
      try {
        // Drop the problematic userName index if it exists
        await db.collection("users").dropIndex("userName_1")
        console.log("Dropped userName_1 index")
      } catch (error) {
        // Index might not exist, which is fine
        console.log("Index userName_1 might not exist, continuing...")
      }

      // Update any users with null userName to use their email
      const result = await db.collection("users").updateMany({ userName: null }, [{ $set: { userName: "$email" } }])

      console.log(`Updated ${result.modifiedCount} users with null userName`)
    }

    // Create proper indexes for the users collection
    await db.collection("users").createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { name: 1 }, unique: false },
    ])

    console.log("MongoDB schema setup complete")
    return true
  } catch (error) {
    console.error("Error setting up MongoDB schema:", error)
    return false
  }
}
