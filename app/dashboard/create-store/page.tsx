"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { DeploymentProgress } from "@/components/deployment-progress"
import { createStore } from "@/lib/actions/store-actions"
import { storeTemplates } from "@/lib/store-templates"
import Image from "next/image"

export default function CreateStorePage() {
  const router = useRouter()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState<{
    status: "idle" | "loading" | "success" | "error"
    message?: string
    url?: string
    storeId?: string
  }>({ status: "idle" })

  // Update the formData state to include new fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vercelToken: "",
    template: "basic",
    customDomain: false,
    domain: "",
    adminRoute: "",
    mongoDBUri: "",
    cloudinaryKey: "",
    cloudinarySecret: "",
    cloudinaryName: "",
  })

  const [deploymentSteps, setDeploymentSteps] = useState([
    {
      id: "validate-token",
      title: "Validate Vercel Token",
      description: "Checking if your Vercel token is valid",
      status: "pending" as const,
    },
    {
      id: "create-project",
      title: "Create Vercel Project",
      description: "Creating a new project in your Vercel account",
      status: "pending" as const,
    },
    {
      id: "prepare-files",
      title: "Prepare Template Files",
      description: "Preparing the store template files",
      status: "pending" as const,
    },
    {
      id: "deploy-files",
      title: "Deploy Files",
      description: "Uploading and deploying files to Vercel",
      status: "pending" as const,
    },
    {
      id: "get-domain",
      title: "Get Production Domain",
      description: "Retrieving the production domain from Vercel",
      status: "pending" as const,
    },
    {
      id: "configure-domain",
      title: "Configure Domain",
      description: "Setting up your custom domain (if provided)",
      status: "pending" as const,
    },
    {
      id: "save-store",
      title: "Save Store",
      description: "Saving your store to your dashboard",
      status: "pending" as const,
    },
  ])

  // Redirect to dashboard after successful deployment with a delay
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout

    if (deploymentStatus.status === "success") {
      redirectTimer = setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [deploymentStatus.status, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Update deployment steps based on form data
  const updateStepStatus = (stepId: string, status: "pending" | "in-progress" | "completed" | "error") => {
    setDeploymentSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, status } : step)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDeploying(true)
    setDeploymentStatus({ status: "loading" })

    try {
      // Start updating the deployment progress UI
      updateStepStatus("validate-token", "in-progress")

      // Call the server action to create the store
      const result = await createStore(formData)

      if (result.success) {
        // Update the deployment progress UI to show success
        updateStepStatus("validate-token", "completed")
        updateStepStatus("create-project", "completed")
        updateStepStatus("prepare-files", "completed")
        updateStepStatus("deploy-files", "completed")
        updateStepStatus("get-domain", "completed")

        if (formData.customDomain) {
          updateStepStatus("configure-domain", "completed")
        } else {
          updateStepStatus("configure-domain", "completed")
        }

        updateStepStatus("save-store", "completed")

        // Set deployment status to success
        setDeploymentStatus({
          status: "success",
          message: "Your store has been successfully deployed! Redirecting to dashboard...",
          url: result.url,
          storeId: result.storeId,
        })
      } else {
        // Handle error
        setDeploymentStatus({
          status: "error",
          message: result.error || "Failed to deploy store",
        })

        // Update the deployment progress UI to show error
        if (result.error?.includes("token")) {
          updateStepStatus("validate-token", "error")
        } else if (result.error?.includes("project")) {
          updateStepStatus("create-project", "error")
        } else if (result.error?.includes("database")) {
          updateStepStatus("save-store", "error")
        } else {
          updateStepStatus("deploy-files", "error")
        }
      }
    } catch (error) {
      console.error("Error deploying store:", error)
      setDeploymentStatus({
        status: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  // Get the selected template
  const selectedTemplate = storeTemplates.find((template) => template.id === formData.template) || storeTemplates[0]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create a New Store</h1>
        <p className="text-muted-foreground">Deploy a new ecommerce store to your Vercel account</p>
      </div>

      {deploymentStatus.status === "success" && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Deployment Successful!</AlertTitle>
          <AlertDescription className="text-green-700">
            {deploymentStatus.message}
            {deploymentStatus.url && (
              <div className="mt-2">
                <p>Your store is available at:</p>
                <a
                  href={deploymentStatus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {deploymentStatus.url}
                </a>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {deploymentStatus.status === "error" && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Deployment Failed</AlertTitle>
          <AlertDescription>{deploymentStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Enter the basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="My Awesome Store"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
                <p className="text-sm text-muted-foreground">This will be used as the project name on Vercel</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your store"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Template</CardTitle>
              <CardDescription>Choose a template for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Store Template</Label>
                <Select
                  value={formData.template}
                  onValueChange={(value) => handleSelectChange("template", value)}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {storeTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Template Preview */}
              <div className="mt-4 border rounded-lg overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={selectedTemplate.thumbnail || "/placeholder.svg"}
                    alt={selectedTemplate.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedTemplate.description}</p>

                  <h4 className="font-medium mt-4 mb-2">Features:</h4>
                  <ul className="text-sm space-y-1">
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add a new card for Admin Configuration after the Store Template card */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Configuration</CardTitle>
              <CardDescription>Configure the admin dashboard for your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminRoute">Custom Admin Route</Label>
                <Input
                  id="adminRoute"
                  name="adminRoute"
                  placeholder="my-admin-123"
                  value={formData.adminRoute}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
                <p className="text-sm text-muted-foreground">
                  This will be the URL path to access your store's admin dashboard (e.g., yourdomain.com/my-admin-123)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Add a new card for External Services after the Admin Configuration card */}
          <Card>
            <CardHeader>
              <CardTitle>External Services (Optional)</CardTitle>
              <CardDescription>Connect your own database and storage services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mongoDBUri">MongoDB Atlas URI (Optional)</Label>
                <Input
                  id="mongoDBUri"
                  name="mongoDBUri"
                  type="password"
                  placeholder="mongodb+srv://..."
                  value={formData.mongoDBUri}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
                <p className="text-sm text-muted-foreground">
                  Your store will use this MongoDB database for products, orders, and customers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cloudinaryName">Cloudinary Cloud Name (Optional)</Label>
                <Input
                  id="cloudinaryName"
                  name="cloudinaryName"
                  placeholder="your-cloud-name"
                  value={formData.cloudinaryName}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cloudinaryKey">Cloudinary API Key (Optional)</Label>
                <Input
                  id="cloudinaryKey"
                  name="cloudinaryKey"
                  type="password"
                  placeholder="Your Cloudinary API key"
                  value={formData.cloudinaryKey}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cloudinarySecret">Cloudinary API Secret (Optional)</Label>
                <Input
                  id="cloudinarySecret"
                  name="cloudinarySecret"
                  type="password"
                  placeholder="Your Cloudinary API secret"
                  value={formData.cloudinarySecret}
                  onChange={handleChange}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vercel Configuration</CardTitle>
              <CardDescription>Connect your Vercel account to deploy your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vercelToken">Vercel Access Token</Label>
                <Input
                  id="vercelToken"
                  name="vercelToken"
                  type="password"
                  placeholder="Enter your Vercel access token"
                  value={formData.vercelToken}
                  onChange={handleChange}
                  required
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
                <p className="text-sm text-muted-foreground">
                  You can create a token in your Vercel account settings under "Tokens"
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="customDomain"
                  checked={formData.customDomain}
                  onCheckedChange={(checked) => handleSwitchChange("customDomain", checked)}
                  disabled={isDeploying || deploymentStatus.status === "success"}
                />
                <Label htmlFor="customDomain">Use custom domain</Label>
              </div>
              {formData.customDomain && (
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="mystore.com"
                    value={formData.domain}
                    onChange={handleChange}
                    disabled={isDeploying || deploymentStatus.status === "success"}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isDeploying || deploymentStatus.status === "success"}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isDeploying || deploymentStatus.status === "success"}>
                {isDeploying ? "Deploying..." : "Deploy Store"}
              </Button>
            </CardFooter>
          </Card>

          {deploymentStatus.status === "loading" && (
            <Card>
              <CardHeader>
                <CardTitle>Deployment Progress</CardTitle>
                <CardDescription>Your store is being deployed to Vercel</CardDescription>
              </CardHeader>
              <CardContent>
                <DeploymentProgress steps={deploymentSteps} />
              </CardContent>
            </Card>
          )}
        </div>
      </form>
    </div>
  )
}
