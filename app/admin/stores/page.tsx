import { getStores } from "@/lib/actions/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StoresTable } from "@/components/admin/stores-table"

export const dynamic = "force-dynamic"

export default async function StoresPage() {
  const { stores, stats } = await getStores()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Stores Management</h1>
          <p className="text-muted-foreground">Manage all user stores</p>
        </div>
        <Button>Refresh Stores</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>

      {stores.length > 0 ? (
        <StoresTable stores={stores} />
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <h3 className="text-lg font-medium mb-2">No stores found</h3>
            <p className="text-muted-foreground mb-4">There are no stores created yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
