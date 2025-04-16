import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET() {
  try {
    // Get MongoDB URI from environment variable
    const uri = process.env.MONGODB_URI

    if (!uri || uri === "not_set") {
      return NextResponse.json({ connected: false, message: "MongoDB URI not configured" }, { status: 200 })
    }

    // Try to connect to MongoDB
    const client = new MongoClient(uri)
    await client.connect()

    // Ping the database
    await client.db().command({ ping: 1 })

    // Close the connection
    await client.close()

    return NextResponse.json({ connected: true, message: "Successfully connected to MongoDB" })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    return NextResponse.json(
      {
        connected: false,
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 },
    )
  }
}
