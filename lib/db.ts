import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Store } from "./types"

// Seller type definition
export interface Seller {
  _id?: string | ObjectId
  googleId?: string
  name: string
  email: string
  subscriptionPlan: string
  registrationDate: Date
  credentials?: {
    hasVercelToken: boolean
    hasMongoDBUri: boolean
    hasCloudinaryKey: boolean
  }
}

// Helper function to check if MongoDB is available with improved error handling
async function getMongoDb() {
  try {
    // Set a shorter connection timeout
    const client = (await Promise.race([
      clientPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("MongoDB connection timeout")), 5000)),
    ])) as any

    return client.db()
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    return null
  }
}

// Get seller by email
export async function getSellerByEmail(email: string) {
  const db = await getMongoDb()
  if (!db) return null

  try {
    return await db.collection("sellers").findOne({ email })
  } catch (error) {
    console.error("Error getting seller by email:", error)
    return null
  }
}

// Get seller by ID
export async function getSellerById(id: string) {
  const db = await getMongoDb()
  if (!db) return null

  try {
    return await db.collection("sellers").findOne({ _id: new ObjectId(id) })
  } catch (error) {
    console.error("Error getting seller by ID:", error)
    return null
  }
}

// Create or update seller
export async function upsertSeller(seller: Seller) {
  const db = await getMongoDb()
  if (!db) return { acknowledged: false }

  try {
    if (seller._id) {
      const { _id, ...sellerWithoutId } = seller
      return await db.collection("sellers").updateOne({ _id: new ObjectId(_id.toString()) }, { $set: sellerWithoutId })
    } else {
      return await db.collection("sellers").insertOne(seller)
    }
  } catch (error) {
    console.error("Error upserting seller:", error)
    return { acknowledged: false }
  }
}

// Update seller credentials status
export async function updateSellerCredentials(
  sellerId: string,
  credentials: {
    hasVercelToken?: boolean
    hasMongoDBUri?: boolean
    hasCloudinaryKey?: boolean
  },
) {
  const db = await getMongoDb()
  if (!db) return { acknowledged: false }

  try {
    return await db.collection("sellers").updateOne(
      { _id: new ObjectId(sellerId) },
      {
        $set: {
          "credentials.hasVercelToken": credentials.hasVercelToken !== undefined ? credentials.hasVercelToken : false,
          "credentials.hasMongoDBUri": credentials.hasMongoDBUri !== undefined ? credentials.hasMongoDBUri : false,
          "credentials.hasCloudinaryKey":
            credentials.hasCloudinaryKey !== undefined ? credentials.hasCloudinaryKey : false,
        },
      },
    )
  } catch (error) {
    console.error("Error updating seller credentials:", error)
    return { acknowledged: false }
  }
}

// Store related functions

// Create a new store
export async function createStore(store: Omit<Store, "id" | "createdAt">) {
  const db = await getMongoDb()
  if (!db) return null

  try {
    const newStore = {
      ...store,
      products: 0,
      orders: 0,
      createdAt: new Date().toISOString(),
    }

    const result = await db.collection("stores").insertOne(newStore)
    return { ...newStore, id: result.insertedId.toString() }
  } catch (error) {
    console.error("Error creating store:", error)
    return null
  }
}

// Get stores by user ID
export async function getStoresByUserId(userId: string) {
  const db = await getMongoDb()
  if (!db) return []

  try {
    const stores = await db.collection("stores").find({ userId }).toArray()
    return stores.map((store) => ({
      ...store,
      id: store._id.toString(),
      _id: undefined,
    }))
  } catch (error) {
    console.error("Error getting stores by user ID:", error)
    return []
  }
}

// Get store by ID
export async function getStoreById(id: string) {
  const db = await getMongoDb()
  if (!db) return null

  try {
    const store = await db.collection("stores").findOne({ _id: new ObjectId(id) })
    if (!store) return null

    return {
      ...store,
      id: store._id.toString(),
      _id: undefined,
    }
  } catch (error) {
    console.error("Error getting store by ID:", error)
    return null
  }
}

// Update store
export async function updateStore(id: string, data: Partial<Store>) {
  const db = await getMongoDb()
  if (!db) return false

  try {
    const result = await db.collection("stores").updateOne({ _id: new ObjectId(id) }, { $set: data })
    return result.modifiedCount > 0
  } catch (error) {
    console.error("Error updating store:", error)
    return false
  }
}

// Delete store
export async function deleteStore(id: string) {
  const db = await getMongoDb()
  if (!db) return false

  try {
    const result = await db.collection("stores").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  } catch (error) {
    console.error("Error deleting store:", error)
    return false
  }
}
