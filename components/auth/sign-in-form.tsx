"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface SignInFormProps {
  plan?: string
  billingCycle?: "monthly" | "yearly"
}

export function SignInForm({ plan, billingCycle = "monthly" }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const callbackUrl =
    searchParams?.get("callbackUrl") || (plan ? `/dashboard?plan=${plan}&billingCycle=${billingCycle}` : "/dashboard")
  const errorFromUrl = searchParams?.get("error")

  useEffect(() => {
    if (errorFromUrl) {
      if (errorFromUrl === "OAuthAccountNotLinked") {
        setError("The email is already associated with another account. Please sign in using the correct provider.")
      } else if (errorFromUrl === "OAuthCallbackError") {
        setError("There was a problem with the authentication. Please try again or use a different method.")
      } else if (errorFromUrl === "OAuthCreateAccount") {
        setError("There was a problem creating your account. Please try again.")
      } else {
        setError("An error occurred during sign in. Please try again.")
      }
    }
  }, [errorFromUrl])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // If no plan is specified, default to Basic plan
      const effectiveCallbackUrl = plan ? callbackUrl : `/dashboard?plan=Basic&billingCycle=monthly`

      const result = await signIn("google", {
        callbackUrl: effectiveCallbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          {plan ? `Sign in to start your 7-day free trial of the ${plan} plan` : "Sign in to your account to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {plan && (
          <Alert className="mb-4 bg-blue-50 border-blue-100">
            <AlertDescription className="text-blue-700">
              You're signing in to start your 7-day free trial of the {plan} plan. No credit card required.
            </AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
          )}
          <span className="ml-2">{isLoading ? "Signing in..." : "Sign in with Google"}</span>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href={plan ? `/auth/signup?plan=${plan}&billingCycle=${billingCycle}` : "/auth/signup"}
            className="underline text-primary"
          >
            Sign up
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
