import type { VercelDeploymentOptions } from "@/lib/types"

// Function to get template files based on the template name
export async function getTemplateFiles(
  templateName: string,
  options: VercelDeploymentOptions,
): Promise<Record<string, string>> {
  try {
    console.log(`Getting template files for ${templateName}...`)

    let templateFiles: Record<string, string> = {}

    // Import the appropriate template based on the template name
    if (templateName === "fashion") {
      const { getFashionStoreTemplate } = await import("./store-templates")
      templateFiles = await getFashionStoreTemplate(options)
    } else if (templateName === "electronics") {
      const { getElectronicsStoreTemplate } = await import("./store-templates")
      templateFiles = await getElectronicsStoreTemplate(options)
    } else {
      // Default to basic template
      const { getBasicStoreTemplate } = await import("./store-templates")
      templateFiles = await getBasicStoreTemplate(options)
    }

    console.log(`Retrieved ${Object.keys(templateFiles).length} template files`)
    return templateFiles
  } catch (error) {
    console.error("Error getting template files:", error)
    return {}
  }
}

// Function to replace placeholders in template files
export function replacePlaceholders(content: string, options: VercelDeploymentOptions): string {
  return content
    .replace(/\{\{STORE_NAME\}\}/g, options.name)
    .replace(/\{\{ADMIN_ROUTE\}\}/g, options.adminRoute || "admin")
    .replace(/\{\{MONGODB_URI\}\}/g, options.mongoDBUri || "not_set")
    .replace(/\{\{CLOUDINARY_KEY\}\}/g, options.cloudinaryKey || "not_set")
    .replace(/\{\{CLOUDINARY_SECRET\}\}/g, options.cloudinarySecret || "not_set")
    .replace(/\{\{CLOUDINARY_NAME\}\}/g, options.cloudinaryName || "not_set")
}

// Fallback functions for minimal files
function getMinimalPackageJson(options: VercelDeploymentOptions): string {
  const name = options.name ? options.name.toLowerCase().replace(/\s+/g, "-") : "storex-basic-store"

  return JSON.stringify(
    {
      name: name,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: "14.0.4",
        react: "18.2.0",
        "react-dom": "18.2.0",
        "lucide-react": "0.294.0",
      },
      devDependencies: {
        "@types/node": "20.10.4",
        "@types/react": "18.2.45",
        "@types/react-dom": "18.2.18",
        autoprefixer: "10.4.16",
        eslint: "8.56.0",
        "eslint-config-next": "14.0.4",
        postcss: "8.4.32",
        tailwindcss: "3.3.6",
        typescript: "5.3.3",
      },
    },
    null,
    2,
  )
}

function getMinimalPage(options: VercelDeploymentOptions): string {
  return `
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">${options.name || "My Store"}</h1>
      <p className="text-xl">Welcome to my store!</p>
    </div>
  )
}
`
}

function getMinimalLayout(options: VercelDeploymentOptions): string {
  return `
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "${options.name || "My Store"}",
  description: "Welcome to my store",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`
}

function getMinimalCss(): string {
  return `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
`
}

function getMinimalTailwindConfig(): string {
  return `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
}

function getMinimalTsConfig(): string {
  return `
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`
}

function getMinimalNextConfig(): string {
  return `
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placeholder.com'],
    unoptimized: true,
  },
}
module.exports = nextConfig
`
}

function getMinimalPostcssConfig(): string {
  return `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
}
