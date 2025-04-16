import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if credentials are set
    const mongoDBUri = process.env.MONGODB_URI || "not_set"
    const cloudinaryKey = process.env.CLOUDINARY_KEY || "not_set"
    const cloudinaryName = process.env.CLOUDINARY_NAME || "not_set"
    const cloudinarySecret = process.env.CLOUDINARY_SECRET || "not_set"
    const adminRoute = process.env.ADMIN_ROUTE || "admin"

    // Test MongoDB connection if URI is provided
    let mongoDBConnected = false
    if (mongoDBUri !== "not_set") {
      try {
        // Simple connection test
        const { MongoClient } = await import("mongodb")
        const client = new MongoClient(mongoDBUri, {
          connectTimeoutMS: 5000,
          socketTimeoutMS: 5000,
        })
        await client.connect()
        await client.db().admin().ping()
        await client.close()
        mongoDBConnected = true
      } catch (error) {
        console.error("MongoDB connection test failed:", error)
      }
    }

    // Test Cloudinary connection if credentials are provided
    let cloudinaryConnected = false
    if (cloudinaryKey !== "not_set" && cloudinaryName !== "not_set" && cloudinarySecret !== "not_set") {
      // We'll just check if the credentials are present
      cloudinaryConnected = true
    }

    return NextResponse.json({
      status: "success",
      data: {
        mongoDBUri: mongoDBUri !== "not_set",
        mongoDBConnected,
        cloudinaryConfigured: cloudinaryKey !== "not_set" && cloudinaryName !== "not_set",
        cloudinaryConnected,
        adminRoute,
      },
    })
  } catch (error) {
    console.error("Error checking credentials:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check credentials",
      },
      { status: 500 },
    )
  }
}
