// This is a script you can run to fix your MongoDB database
// Run with: npx tsx scripts/fix-mongodb.ts

import { MongoClient } from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function fixMongoDB() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables")
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Check if users collection exists
    const collections = await db.listCollections({ name: "users" }).toArray()

    if (collections.length > 0) {
      console.log("Users collection exists, checking for problematic index...")

      try {
        // Try to drop the problematic index
        await db.collection("users").dropIndex("userName_1")
        console.log("Successfully dropped userName_1 index")
      } catch (error) {
        console.log("Index userName_1 might not exist, continuing...")
      }

      // Find users with null userName
      const usersWithNullUserName = await db.collection("users").find({ userName: null }).toArray()

      if (usersWithNullUserName.length > 0) {
        console.log(`Found ${usersWithNullUserName.length} users with null userName`)

        // Update users with null userName to use their email as userName
        for (const user of usersWithNullUserName) {
          await db.collection("users").updateOne({ _id: user._id }, { $set: { userName: user.email } })
        }

        console.log("Updated all users with null userName")
      } else {
        console.log("No users with null userName found")
      }
    } else {
      console.log("Users collection does not exist yet")
    }

    console.log("MongoDB fix completed successfully")
  } catch (error) {
    console.error("Error fixing MongoDB:", error)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

fixMongoDB().catch(console.error)
