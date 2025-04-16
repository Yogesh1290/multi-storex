import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SystemStatusPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">System Status</h1>
          <p className="text-muted-foreground">Monitor system health and performance</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status Dashboard</CardTitle>
          <CardDescription>View detailed system metrics and health status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">System status dashboard coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
