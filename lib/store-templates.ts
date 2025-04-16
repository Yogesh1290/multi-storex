import type { VercelDeploymentOptions } from "@/lib/types"
import { replacePlaceholders } from "./template-utils"

// Define the store templates
export const storeTemplates = [
  {
    id: "basic",
    name: "Basic Store",
    description: "A simple ecommerce store with essential features",
    thumbnail: "/templates/basic-thumbnail.jpg",
    features: ["Product listings", "Shopping cart", "Checkout", "Order management"],
  },
  {
    id: "fashion",
    name: "Fashion Store",
    description: "A stylish template for clothing and fashion products",
    thumbnail: "/templates/fashion-thumbnail.jpg",
    features: ["Product galleries", "Size guides", "Wishlist", "Related products", "Customer reviews"],
  },
  {
    id: "electronics",
    name: "Electronics Store",
    description: "Perfect for tech products with detailed specifications",
    thumbnail: "/templates/electronics-thumbnail.jpg",
    features: ["Product specifications", "Comparison tool", "Technical guides", "Warranty information"],
  },
]

// Basic store template
export async function getBasicStoreTemplate(options: VercelDeploymentOptions): Promise<Record<string, string>> {
  try {
    // Import the basic template files
    const { basicTemplate } = await import("../store-templates/basic/basic-template")

    // Replace placeholders in the template files
    const processedFiles: Record<string, string> = {}

    for (const [path, content] of Object.entries(basicTemplate)) {
      processedFiles[path] = replacePlaceholders(content, options)
    }

    return processedFiles
  } catch (error) {
    console.error("Error getting basic store template:", error)
    return {}
  }
}

// Fashion store template
export async function getFashionStoreTemplate(options: VercelDeploymentOptions): Promise<Record<string, string>> {
  try {
    // Import the fashion template files
    const { fashionTemplate } = await import("../store-templates/fashion/fashion-template")

    // Replace placeholders in the template files
    const processedFiles: Record<string, string> = {}

    for (const [path, content] of Object.entries(fashionTemplate)) {
      processedFiles[path] = replacePlaceholders(content, options)
    }

    // Add dynamic admin route file
    const adminRoute = options.adminRoute || "admin"

    // Add the admin dashboard files with the custom route
    processedFiles[`app/[${adminRoute}]/page.tsx`] = `
      export default function AdminDashboard() {
        return (
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to your store admin dashboard!</p>
          </div>
        )
      }
    `

    return processedFiles
  } catch (error) {
    console.error("Error getting fashion store template:", error)
    return {}
  }
}

// Electronics store template
export async function getElectronicsStoreTemplate(options: VercelDeploymentOptions): Promise<Record<string, string>> {
  try {
    // Import the electronics template files
    const { electronicsTemplate } = await import("../store-templates/electronics/electronics-template")

    // Replace placeholders in the template files
    const processedFiles: Record<string, string> = {}

    for (const [path, content] of Object.entries(electronicsTemplate)) {
      processedFiles[path] = replacePlaceholders(content, options)
    }

    return processedFiles
  } catch (error) {
    console.error("Error getting electronics store template:", error)
    return {}
  }
}
