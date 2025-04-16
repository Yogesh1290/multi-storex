import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage system and user notifications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications Dashboard</CardTitle>
          <CardDescription>Manage and send notifications to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Notifications dashboard coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
