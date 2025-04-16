import type { VercelDeploymentOptions } from "@/lib/types"

// Helper function to read a file from the templates directory
function readTemplateFile(templateType: string, filePath: string): string {
  try {
    // In a real environment, this would read from the file system
    // For this example, we'll return hardcoded content for specific files
    if (filePath === "package.json") {
      return JSON.stringify(require(`../store-templates/${templateType}/package.json`), null, 2)
    }

    // For other files, we would normally read from the file system
    // But for this example, we'll return placeholder content
    return `// Content for ${filePath} in ${templateType} template`
  } catch (error) {
    console.error(`Error reading template file ${filePath} for ${templateType}:`, error)
    return `// Error reading file content`
  }
}

// Generate template files for a specific template type
export function generateTemplateFiles(
  templateType: string,
  options: VercelDeploymentOptions,
): Record<string, { file: string }> {
  console.log(`Generating template files for: ${templateType}`)

  // Define the common files that all templates should have
  const commonFiles = [
    "package.json",
    "next.config.js",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "app/layout.tsx",
    "app/page.tsx",
    "app/globals.css",
  ]

  // Create a record of files with their content
  const files: Record<string, { file: string }> = {}

  // Add common files
  for (const file of commonFiles) {
    files[file] = { file: readTemplateFile(templateType, file) }
  }

  // Return the files
  return files
}

// Main function to get template files based on template name
export function getTemplateFiles(template: string, options: VercelDeploymentOptions): Record<string, { file: string }> {
  console.log(`Getting template files for: ${template}`)

  // Choose the appropriate template
  try {
    switch (template) {
      case "fashion":
        return generateTemplateFiles("fashion", options)
      case "electronics":
        return generateTemplateFiles("electronics", options)
      case "basic":
      default:
        return generateTemplateFiles("basic", options)
    }
  } catch (error) {
    console.error(`Error getting template files for ${template}:`, error)
    // Fallback to basic template if there's an error
    return generateTemplateFiles("basic", options)
  }
}
