// Store type definition
export interface Store {
  id: string
  name: string
  description: string
  url: string
  template: string
  customDomain?: string
  adminRoute?: string
  status: "active" | "inactive" | "deploying" | "failed"
  products: number
  orders: number
  lastDeployed: string
  userId: string
  createdAt: string
}

// Vercel deployment options
export interface VercelDeploymentOptions {
  token: string
  name: string
  template: string
  customDomain?: string
  mongoDBUri?: string
  cloudinaryKey?: string
  cloudinarySecret?: string
  cloudinaryName?: string
  adminRoute?: string
}

// Template file type
export interface TemplateFile {
  path: string
  content: string
}
