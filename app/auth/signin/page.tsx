import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { EmailSignInForm } from "@/components/auth/email-sign-in-form"
import { SignInForm } from "@/components/auth/sign-in-form" // Google sign in
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function SignInPage() {
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
            <h1 className="text-3xl font-bold">Sign In to StoreX</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your account to manage your ecommerce stores</p>
          </div>
          <Tabs defaultValue="google" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="google">
              <SignInForm />
            </TabsContent>
            <TabsContent value="email">
              <EmailSignInForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
