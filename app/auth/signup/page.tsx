import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { EmailSignUpForm } from "@/components/auth/email-sign-up-form"

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  // Redirect to dashboard if already signed in
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="mt-2 text-muted-foreground">Sign up to get started with StoreX</p>
          </div>
          <EmailSignUpForm />
        </div>
      </div>
    </div>
  )
}
