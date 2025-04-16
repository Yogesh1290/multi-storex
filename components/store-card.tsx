"use client"

import Link from "next/link"
import { Settings, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StoreCardProps {
  store: {
    id: string
    name: string
    description: string
    url: string
    template: string
    customDomain?: string
    adminRoute?: string
    status: "active" | "inactive"
    products: number
    orders: number
    lastDeployed: string
  }
  onDelete?: (id: string) => void
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export function StoreCard({ store }: StoreCardProps) {
  // Extract just the domain part for display
  const displayUrl = store.url.replace(/^https?:\/\//, "")

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-gray-100 flex items-center justify-center">
        <div className="w-20 h-20 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
            <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
            <line x1="12" y1="22" x2="12" y2="13" />
            <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
          </svg>
        </div>
        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
          {store.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Store URL:</span>
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {store.url.replace("https://", "")}
            </a>
          </div>
          {store.adminRoute && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Admin URL:</span>
              <a
                href={`${store.url}/${store.adminRoute}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {`${store.url.replace("https://", "")}/${store.adminRoute}`}
              </a>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Template:</span>
            <span className="text-sm capitalize">{store.template}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Last Deployed:</span>
            <span className="text-sm">{formatDate(store.lastDeployed)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-sm font-medium">Products</p>
            <p className="text-xl font-bold">{store.products}</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-md">
            <p className="text-sm font-medium">Orders</p>
            <p className="text-xl font-bold">{store.orders}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-between">
        <Link href={`/dashboard/stores/${store.id}`}>
          <Button variant="secondary" className="gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 9h6v6H9z" />
              <path d="m21 3-6 6" />
              <path d="m21 21-6-6" />
              <path d="m3 3 6 6" />
              <path d="m3 21 6-6" />
            </svg>
            Dashboard
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => window.open(store.url, "_blank")}>
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Visit</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
