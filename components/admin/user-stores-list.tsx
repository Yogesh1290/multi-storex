"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Store {
  id: string
  name: string
  url: string
  status: "active" | "inactive"
  products: number
  orders: number
  lastDeployed: string
}

interface UserStoresListProps {
  userId: string
}

export function UserStoresList({ userId }: UserStoresListProps) {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserStores() {
      try {
        // In a real app, you would call an API to get the user's stores
        // For this demo, we'll use mock data
        const mockStores = [
          {
            id: "1",
            name: "Fashion Store",
            url: "https://fashion-store.vercel.app",
            status: "active" as const,
            products: 24,
            orders: 12,
            lastDeployed: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Electronics Shop",
            url: "https://electronics-shop.vercel.app",
            status: "active" as const,
            products: 56,
            orders: 38,
            lastDeployed: new Date().toISOString(),
          },
        ]

        setStores(mockStores)
      } catch (error) {
        console.error("Error fetching user stores:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStores()
  }, [userId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return <div>Loading stores...</div>
  }

  if (stores.length === 0) {
    return <div className="text-center py-4">This user has no stores</div>
  }

  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <div key={store.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{store.name}</h3>
            <Badge className={store.status === "active" ? "bg-green-500" : "bg-gray-500"}>{store.status}</Badge>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              {store.url} <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Products</p>
              <p className="font-medium">{store.products}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="font-medium">{store.orders}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Deployed</p>
              <p className="font-medium">{formatDate(store.lastDeployed)}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button asChild size="sm" variant="outline">
              <Link href={`/admin/stores/${store.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
