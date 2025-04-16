import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

async function getStore(id: string) {
  // TODO: Replace with actual data fetching
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: "123",
    url: "https://store.example.com",
    adminRoute: "admin",
    template: "nextjs",
    status: "active",
    lastDeployed: new Date(),
  }
}

export default async function StoreDetailPage({ params }: { params: { id: string } }) {
  const store = await getStore(params.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
        <p className="text-muted-foreground">Store ID: {params.id}</p>
      </div>

      <div className="border rounded-lg p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Store URL:</span>
            <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {store.url.replace("https://", "")}
            </a>
          </div>
          {store.adminRoute && (
            <div className="flex items-center justify-between">
              <span className="font-medium">Admin URL:</span>
              <a
                href={`${store.url}/${store.adminRoute}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {`${store.url.replace("https://", "")}/${store.adminRoute}`}
              </a>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="font-medium">Template:</span>
            <span className="capitalize">{store.template}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <Badge variant={store.status === "active" ? "success" : "destructive"}>{store.status}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Last Deployed:</span>
            <span>{formatDate(store.lastDeployed)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
