"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveSellerCredentials } from "@/lib/actions/credential-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle } from "lucide-react"

interface CredentialsFormProps {
  initialCredentials?: {
    hasVercelToken: boolean
    hasMongoDBUri: boolean
    hasCloudinaryKey: boolean
  }
}

export function CredentialsForm({ initialCredentials }: CredentialsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      await saveSellerCredentials(formData)

      toast({
        title: "Credentials saved successfully",
        description: "You can now deploy your store.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error saving credentials:", error)

      toast({
        title: "Failed to save credentials",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vercel Configuration</CardTitle>
            <CardDescription>
              Your Vercel token will be used to deploy your store to your Vercel account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="vercelToken">Vercel Access Token</Label>
                {initialCredentials?.hasVercelToken && (
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Saved
                  </span>
                )}
              </div>
              <Input
                id="vercelToken"
                name="vercelToken"
                type="password"
                placeholder={initialCredentials?.hasVercelToken ? "••••••••••••••••" : "Enter your Vercel access token"}
                required={!initialCredentials?.hasVercelToken}
              />
              <p className="text-sm text-muted-foreground">
                You can create a token in your Vercel account settings under "Tokens"
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MongoDB Configuration</CardTitle>
            <CardDescription>Your MongoDB URI will be used to store your store's data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="mongoDBUri">MongoDB URI</Label>
                {initialCredentials?.hasMongoDBUri && (
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Saved
                  </span>
                )}
              </div>
              <Input
                id="mongoDBUri"
                name="mongoDBUri"
                type="password"
                placeholder={initialCredentials?.hasMongoDBUri ? "••••••••••••••••" : "Enter your MongoDB URI"}
                required={!initialCredentials?.hasMongoDBUri}
              />
              <p className="text-sm text-muted-foreground">
                This should be your own MongoDB Atlas connection string, not ours.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cloudinary Configuration</CardTitle>
            <CardDescription>Your Cloudinary API key will be used to store your store's media.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cloudinaryKey">Cloudinary API Key</Label>
                {initialCredentials?.hasCloudinaryKey && (
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Saved
                  </span>
                )}
              </div>
              <Input
                id="cloudinaryKey"
                name="cloudinaryKey"
                type="password"
                placeholder={
                  initialCredentials?.hasCloudinaryKey ? "••••••••••••••••" : "Enter your Cloudinary API key"
                }
                required={!initialCredentials?.hasCloudinaryKey}
              />
              <p className="text-sm text-muted-foreground">You can find your API key in your Cloudinary dashboard.</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Credentials"}
          </Button>
        </div>
      </div>
    </form>
  )
}
