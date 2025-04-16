import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getUserStores } from "@/lib/actions/store-actions"
import { StoreCard } from "@/components/store-card"

export const dynamic = "force-dynamic"

export default async function StoresPage() {
  const stores = await getUserStores()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Stores</h1>
          <p className="text-gray-500 mt-1">Manage your eCommerce stores</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/create-store">
            <Plus className="h-4 w-4" />
            Create Store
          </Link>
        </Button>
      </div>

      {stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-8 text-center">
          <h2 className="text-lg font-medium mb-2">Your stores will appear here</h2>
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
  )
}
