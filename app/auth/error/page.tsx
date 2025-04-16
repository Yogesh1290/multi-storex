"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  let errorTitle = "Authentication Error"
  let errorMessage =
    "There was an error during the authentication process. This could be due to a configuration issue or a temporary problem."

  if (error === "OAuthAccountNotLinked") {
    errorTitle = "Account Not Linked"
    errorMessage = "The email is already associated with another account. Please sign in using the correct provider."
  } else if (error === "OAuthCallbackError") {
    errorTitle = "Authentication Error"
    errorMessage =
      "There was a problem with the authentication callback. This could be due to cookies being blocked or a configuration issue."
  } else if (error === "OAuthCreateAccount") {
    errorTitle = "Account Creation Failed"
    errorMessage =
      "There was a problem creating your account. This might be due to a database issue or the email already being in use."
  } else if (error === "Verification") {
    errorTitle = "Verification Error"
    errorMessage = "The verification link is invalid or has expired."
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold">{errorTitle}</h1>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        <div className="pt-4 space-y-4">
          <p className="text-sm text-muted-foreground">You can try the following:</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside text-left">
            <li>Make sure cookies are enabled in your browser</li>
            <li>Try using a different browser</li>
            <li>Clear your browser cache and cookies</li>
            <li>Try signing in with a different method</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/signin">
              <Button>Try Signing In Again</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
