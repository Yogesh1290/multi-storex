"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TrialButtonProps {
  plan: string
  billingCycle?: "monthly" | "yearly"
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export function TrialButton({
  plan,
  billingCycle = "monthly",
  className,
  size = "default",
  children,
}: TrialButtonProps) {
  const router = useRouter()
  const { status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      // Construct the URL with plan information
      const params = new URLSearchParams({
        plan,
        billingCycle,
      })

      // If user is not authenticated, redirect to signup
      if (status === "unauthenticated") {
        router.push(`/auth/signup?${params.toString()}`)
      }
      // If user is authenticated, redirect to dashboard with plan selection
      else if (status === "authenticated") {
        // Call the server action to update user's plan
        const result = await fetch("/api/select-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plan, billingCycle }),
        })

        if (result.ok) {
          router.push("/dashboard?planSelected=true")
        } else {
          console.error("Failed to select plan")
        }
      }
      // If status is loading, wait a bit and try again
      else {
        setTimeout(() => handleClick(), 500)
      }
    } catch (error) {
      console.error("Error selecting plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} className={className} size={size} disabled={isLoading}>
      {isLoading ? "Processing..." : children}
    </Button>
  )
}
