export async function validateVercelToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://api.vercel.com/v2/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.ok
  } catch (error) {
    console.error("Error validating Vercel token:", error)
    return false
  }
}

export async function createVercelProject(token: string, name: string): Promise<{ id: string; name: string } | null> {
  try {
    const response = await fetch("https://api.vercel.com/v9/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })

    if (!response.ok) {
      console.error("Error creating Vercel project:", response.statusText)
      return null
    }

    const project = await response.json()
    return { id: project.id, name: project.name }
  } catch (error) {
    console.error("Error creating Vercel project:", error)
    return null
  }
}

export function getTemplateFiles(template: string): Record<string, { file: string }> {
  switch (template) {
    case "basic":
      return {
        "index.html": { file: "<h1>Basic Store</h1>" },
      }
    case "fashion":
      return {
        "index.html": { file: "<h1>Fashion Store</h1>" },
      }
    case "electronics":
      return {
        "index.html": { file: "<h1>Electronics Store</h1>" },
      }
    default:
      return {
        "index.html": { file: "<h1>Basic Store</h1>" },
      }
  }
}
