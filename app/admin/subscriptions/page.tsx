export const dynamic = "force-dynamic"

import { getSubscriptionStats, getUpcomingTrialExpirations } from "@/lib/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionChart } from "@/components/admin/subscription-chart"
import { TrialExpiryList } from "@/components/admin/trial-expiry-list"

export default async function SubscriptionsPage() {
  const stats = await getSubscriptionStats()
  const upcomingTrials = await getUpcomingTrialExpirations(5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Manage user subscriptions and trials</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Basic Plan</CardTitle>
            <CardDescription>Rs 250/month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.plans.basic}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Professional Plan</CardTitle>
            <CardDescription>Rs 999/month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.plans.professional}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Plan</CardTitle>
            <CardDescription>Rs 2,999+/month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.plans.enterprise}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.billingCycles.monthly}</div>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Yearly Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.billingCycles.yearly}</div>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.trials.active}</div>
            <p className="text-xs text-muted-foreground">Users in trial period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Breakdown of subscriptions by plan</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionChart stats={stats} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Trial Expirations</CardTitle>
            <CardDescription>Users whose trials are ending soon</CardDescription>
          </CardHeader>
          <CardContent>
            <TrialExpiryList initialTrials={upcomingTrials} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
