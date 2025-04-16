import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Security</h1>
          <p className="text-muted-foreground">Manage platform security settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Dashboard</CardTitle>
          <CardDescription>Manage security settings and access controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Security dashboard coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
