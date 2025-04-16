"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getStoresByUserId, updateStore } from "@/lib/db"
import { getProductionDomain } from "@/lib/vercel-api"

// This function checks and updates all store URLs for a user
export async function syncStoreUrls(vercelToken: string): Promise<{
  success: boolean
  updatedCount: number
  error?: string
}> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, updatedCount: 0, error: "User not authenticated" }
    }

    // Get all stores for the user
    const stores = await getStoresByUserId(session.user.id)

    if (stores.length === 0) {
      return { success: true, updatedCount: 0 }
    }

    // Get all projects from Vercel
    const projectsResponse = await fetch("https://api.vercel.com/v9/projects", {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    })

    if (!projectsResponse.ok) {
      return {
        success: false,
        updatedCount: 0,
        error: "Failed to fetch projects from Vercel",
      }
    }

    const projectsData = await projectsResponse.json()
    const projects = projectsData.projects || []

    // Check and update each store
    let updatedCount = 0

    for (const store of stores) {
      // Extract project name from the URL
      const urlParts = store.url.split("/")
      const domain = urlParts[2] // e.g., "project-name.vercel.app"
      const baseName = domain.split(".")[0].split("-")[0] // Get the base name without suffixes

      // Find matching project
      const matchingProjects = projects.filter(
        (p: any) => p.name.startsWith(baseName) || p.name === domain.split(".")[0],
      )

      if (matchingProjects.length > 0) {
        // Use the first matching project
        const project = matchingProjects[0]

        // Get the correct production domain
        const productionDomain = await getProductionDomain(vercelToken, project.id)

        if (productionDomain) {
          const correctUrl = `https://${productionDomain}`

          // Update the store URL if it's different
          if (correctUrl !== store.url) {
            await updateStore(store.id, { url: correctUrl })
            updatedCount++
          }
        }
      }
    }

    if (updatedCount > 0) {
      // Revalidate pages to show updated URLs
      const { revalidatePath } = await import("next/cache")
      revalidatePath("/dashboard")
      revalidatePath("/dashboard/stores")
    }

    return { success: true, updatedCount }
  } catch (error) {
    console.error("Error syncing store URLs:", error)
    return {
      success: false,
      updatedCount: 0,
      error: "An unexpected error occurred",
    }
  }
}
