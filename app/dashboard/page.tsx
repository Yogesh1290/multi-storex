export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, BarChart3, ShoppingCart, CreditCard, Plus, InfoIcon, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getUserStores } from "@/lib/actions/store-actions"
import { StoreCard } from "@/components/store-card"
import { syncStoreUrls } from "@/lib/utils/sync-store-urls"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { selectPlan, getUserSubscription } from "@/lib/actions/subscription-actions"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const stores = await getUserStores()
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  // Check if there's a plan parameter in the URL
  const plan = searchParams.plan as string | undefined
  const billingCycle = searchParams.billingCycle as "monthly" | "yearly" | undefined
  const planSelected = searchParams.planSelected === "true"

  // If there's a plan parameter, update the user's plan
  if (plan) {
    // Use a server action to handle the plan selection
    const result = await selectPlan(plan, billingCycle || "monthly")
    if (result.success) {
      // Redirect to remove the query parameters
      redirect("/dashboard?planSelected=true")
    }
  }

  // Get user's subscription information
  const subscription = await getUserSubscription()

  // If user doesn't have a subscription yet, and no plan was just selected,
  // automatically apply the Basic plan
  if (!subscription && !plan && !planSelected) {
    await selectPlan("Basic", "monthly")
    // Redirect to show the success message
    redirect("/dashboard?planSelected=true")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your eCommerce stores and view performance metrics</p>
        </div>
        <div className="flex gap-2">
          <form
            action={async (formData) => {
              "use server"
              const vercelToken = formData.get("vercelToken") as string
              if (vercelToken) {
                await syncStoreUrls(vercelToken)
              }
            }}
          >
            <input type="hidden" name="vercelToken" value="your_vercel_token" />
            <Button type="submit" variant="outline" className="gap-2 mr-2">
              <RefreshCw className="h-4 w-4" />
              Sync URLs
            </Button>
          </form>
          <Button asChild className="gap-2">
            <Link href="/dashboard/create-store">
              <Plus className="h-4 w-4" />
              Create Store
            </Link>
          </Button>
        </div>
      </div>

      {/* Plan Selection Success Message */}
      {planSelected && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Trial Started Successfully!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your 7-day free trial of the {subscription?.plan || "Basic"} plan has been activated. Enjoy full access to
            all features!
          </AlertDescription>
        </Alert>
      )}

      {/* Subscription Information */}
      {subscription && (
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Your Subscription</h2>
              <p className="text-sm text-gray-500">
                {subscription.trialActive
                  ? `You're currently on a 7-day free trial of the ${subscription.plan} plan. Trial ends on ${new Date(subscription.trialEndDate).toLocaleDateString()}.`
                  : `You're on the ${subscription.plan} plan (${subscription.billingCycle}).`}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/billing">Manage Subscription</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Stores */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Stores</p>
              <h3 className="text-2xl font-bold">{stores.length}</h3>
            </div>
          </div>
        </Card>

        {/* Active Products */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Products</p>
              <h3 className="text-2xl font-bold">{stores.reduce((total, store) => total + store.products, 0)}</h3>
            </div>
          </div>
        </Card>

        {/* Total Orders */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{stores.reduce((total, store) => total + store.orders, 0)}</h3>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Subscription</p>
              <h3 className="text-2xl font-bold">{subscription?.plan || "Free"}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Your Stores Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Stores</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stores..."
                className="pl-8 pr-4 py-2 border rounded-md text-sm w-64"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort</span>
              <select className="border rounded-md py-2 px-3 text-sm">
                <option>Name</option>
                <option>Date Created</option>
                <option>Products</option>
                <option>Orders</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.length > 0 ? (
            stores.map((store) => <StoreCard key={store.id} store={store} />)
          ) : (
            <div className="col-span-2 border rounded-lg bg-white p-8 text-center">
              <h2 className="text-lg font-medium mb-2">No stores found</h2>
              <p className="text-gray-500 mb-4">Create your first store to get started</p>
              <Button asChild className="gap-2">
                <Link href="/dashboard/create-store">
                  <Plus className="h-4 w-4" />
                  Create Store
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-4">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <InfoIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Need help getting started?</h3>
          <p className="text-sm text-gray-600">
            Check out our documentation or contact our support team for assistance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Docs
          </Button>
          <Button size="sm">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
