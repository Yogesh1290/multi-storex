import { getTemplateFiles } from "@/lib/template-utils"

// Validate a Vercel token by fetching the user's teams
export async function validateVercelToken(token: string): Promise<boolean> {
  try {
    console.log("Validating Vercel token...")
    const response = await fetch("https://api.vercel.com/v2/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const isValid = response.status === 200
    console.log(`Token validation result: ${isValid ? "Valid" : "Invalid"}`)
    return isValid
  } catch (error) {
    console.error("Error validating Vercel token:", error)
    return false
  }
}

// Create a new project in the user's Vercel account
export async function createVercelProject(token: string, name: string): Promise<any | null> {
  try {
    console.log(`Creating Vercel project with name: ${name}`)

    // Normalize the project name to be URL-friendly
    const normalizedName = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    // Append a timestamp to the project name to ensure uniqueness
    const uniqueName = `${normalizedName}-${Date.now()}`
    console.log(`Normalized project name: ${uniqueName}`)

    const response = await fetch("https://api.vercel.com/v9/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: uniqueName,
        framework: "nextjs",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error creating Vercel project:", errorData)
      return null
    }

    const project = await response.json()
    console.log(`Project created successfully with ID: ${project.id}`)
    return project
  } catch (error) {
    console.error("Error creating Vercel project:", error)
    return null
  }
}

// Get the production domain for a project
export async function getProductionDomain(token: string, projectId: string): Promise<string | null> {
  try {
    console.log(`Getting production domain for project ID: ${projectId}`)

    // First, get all domains for the project
    const domainsResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!domainsResponse.ok) {
      console.error("Error fetching project domains:", await domainsResponse.text())
      return null
    }

    const domainsData = await domainsResponse.json()
    console.log(`Found ${domainsData.domains?.length || 0} domains for the project`)

    // Look for the production domain (usually the first one with vercel.app)
    if (domainsData.domains && domainsData.domains.length > 0) {
      // First, try to find the primary production domain (usually has a specific type)
      const productionDomain = domainsData.domains.find(
        (domain: any) => domain.name.endsWith(".vercel.app") && !domain.name.includes("-git-"),
      )

      if (productionDomain) {
        console.log(`Found production domain: ${productionDomain.name}`)
        return productionDomain.name
      }

      // If no specific production domain is found, return the first vercel.app domain
      const anyVercelDomain = domainsData.domains.find((domain: any) => domain.name.endsWith(".vercel.app"))

      if (anyVercelDomain) {
        console.log(`Found Vercel domain: ${anyVercelDomain.name}`)
        return anyVercelDomain.name
      }
    }

    console.log("No suitable domain found")
    return null
  } catch (error) {
    console.error("Error getting production domain:", error)
    return null
  }
}

// Add this function to properly set environment variables for the deployment
export async function setVercelEnvironmentVariables(
  token: string,
  projectId: string,
  variables: Record<string, string>,
) {
  try {
    // Filter out any variables with "not_set" value
    const filteredVariables = Object.entries(variables)
      .filter(([_, value]) => value !== "not_set")
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>,
      )

    // If there are no valid variables, return early
    if (Object.keys(filteredVariables).length === 0) {
      return { success: true }
    }

    // Format variables for Vercel API
    const formattedVariables = Object.entries(filteredVariables).map(([key, value]) => ({
      key,
      value,
      target: ["production", "preview", "development"],
      type: "encrypted",
    }))

    // Send request to Vercel API
    const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ env: formattedVariables }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error setting environment variables:", errorData)
      return { success: false, error: errorData.error?.message || "Failed to set environment variables" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error setting environment variables:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Update the deployToVercel function to call setVercelEnvironmentVariables
export async function deployToVercel(options: {
  token: string
  name: string
  template: string
  customDomain?: string
  mongoDBUri: string
  cloudinaryKey: string
  cloudinarySecret: string
  cloudinaryName: string
  adminRoute: string
}) {
  try {
    // Create project
    const projectResponse = await fetch("https://api.vercel.com/v9/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: options.name.toLowerCase().replace(/\s+/g, "-"),
        framework: "nextjs",
      }),
    })

    if (!projectResponse.ok) {
      const errorData = await projectResponse.json()
      return { success: false, error: errorData.error?.message || "Failed to create project" }
    }

    const projectData = await projectResponse.json()
    const projectId = projectData.id

    // Set environment variables
    await setVercelEnvironmentVariables(options.token, projectId, {
      MONGODB_URI: options.mongoDBUri,
      CLOUDINARY_KEY: options.cloudinaryKey,
      CLOUDINARY_SECRET: options.cloudinarySecret,
      CLOUDINARY_NAME: options.cloudinaryName,
      ADMIN_ROUTE: options.adminRoute,
      JWT_SECRET: `jwt-secret-${Math.random().toString(36).substring(2, 15)}`,
      NEXT_PUBLIC_ADMIN_ROUTE: options.adminRoute,
    })

    // Continue with deployment...
    // (rest of the deployment code)
    console.log("Starting deployment to Vercel with options:", {
      name: options.name,
      template: options.template,
      customDomain: options.customDomain,
    })

    // Step 1: Validate the token
    console.log("Validating Vercel token...")
    const isValidToken = await validateVercelToken(options.token)
    if (!isValidToken) {
      return {
        success: false,
        error: "Invalid Vercel token. Please check your token and try again.",
      }
    }
    console.log("Token validation successful")

    // Step 3: Get the template files
    console.log(`Getting template files for: ${options.template}`)
    const templateFiles = await getTemplateFiles(options.template, options)
    console.log(`Got ${Object.keys(templateFiles).length} template files`)

    // Format files for Vercel API - it expects an array of files
    const files = Object.entries(templateFiles).map(([path, content]) => ({
      file: path,
      data: content,
      encoding: "utf-8",
    }))

    console.log("Creating deployment...")
    // Create a deployment using file upload
    const deploymentResponse = await fetch(`https://api.vercel.com/v13/deployments?projectId=${projectId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: options.name.toLowerCase().replace(/\s+/g, "-"),
        target: "production",
        files: files,
        projectSettings: {
          framework: "nextjs",
          buildCommand: "next build",
          outputDirectory: ".next",
        },
      }),
    })

    if (!deploymentResponse.ok) {
      const errorData = await deploymentResponse.json()
      console.error("Error creating deployment:", errorData)
      return {
        success: false,
        error: `Failed to deploy to Vercel: ${errorData.error?.message || "Unknown error"}`,
      }
    }

    const deployment = await deploymentResponse.json()
    console.log("Deployment created:", deployment.id)

    // Wait for the deployment to be ready
    console.log("Waiting for deployment to be ready...")
    let readyDeployment = deployment
    let attempts = 0
    const maxAttempts = 10

    while (readyDeployment.readyState !== "READY" && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds
      console.log(`Checking deployment status (attempt ${attempts + 1}/${maxAttempts})...`)

      const statusResponse = await fetch(`https://api.vercel.com/v13/deployments/${deployment.id}`, {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      })

      if (statusResponse.ok) {
        readyDeployment = await statusResponse.json()
        console.log(`Deployment status: ${readyDeployment.readyState}`)
      }

      attempts++
    }

    // Step 4: Set up custom domain if provided
    if (options.customDomain) {
      console.log(`Setting up custom domain: ${options.customDomain}`)
      // Add custom domain to the project
      await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${options.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: options.customDomain,
        }),
      })
    }

    // Step 5: Get the EXACT production domain for the project
    // This is crucial to ensure we have the correct domain with any suffixes Vercel adds
    console.log("Getting production domain...")
    const productionDomain = await getProductionDomain(options.token, projectId)

    if (!productionDomain) {
      console.warn("Could not fetch production domain, falling back to default domain")
      return {
        success: true,
        url: `https://${options.name.toLowerCase().replace(/\s+/g, "-")}.vercel.app`,
        deploymentId: deployment.id,
      }
    }

    console.log(`Deployment successful! URL: https://${productionDomain}`)
    // Return the deployment URL with the correct domain
    return {
      success: true,
      url: `https://${productionDomain}`,
      deploymentId: deployment.id,
    }

    return { success: true, url: `https://${options.name.toLowerCase().replace(/\s+/g, "-")}.vercel.app` }
  } catch (error) {
    console.error("Error deploying to Vercel:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
