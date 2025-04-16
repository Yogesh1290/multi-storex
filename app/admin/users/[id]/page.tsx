import { getUserById } from "@/lib/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSubscriptionForm } from "@/components/admin/user-subscription-form"
import { UserStoresList } from "@/components/admin/user-stores-list"
import { UserActivityLog } from "@/components/admin/user-activity-log"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link href="/admin/users">Back to Users</Link>
        </Button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTrialStatus = () => {
    if (!user.trialActive) return null

    const trialEnd = user.trialEndDate ? new Date(user.trialEndDate) : null
    const now = new Date()

    if (!trialEnd) return null

    if (trialEnd > now) {
      return <Badge className="bg-green-500">Trial Active</Badge>
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-300">
          Trial Expired
        </Badge>
      )
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">User Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>User information and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                <p>{formatDate(user.createdAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Subscription Plan</h3>
                <p className="flex items-center gap-2">
                  {user.subscriptionPlan || "No Plan"}
                  {user.billingCycle && <span className="text-xs">({user.billingCycle})</span>}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Trial Status</h3>
                <div className="flex items-center gap-2">
                  {getTrialStatus() || "No active trial"}
                  {user.trialEndDate && user.trialActive && (
                    <span className="text-xs">(Ends: {formatDate(user.trialEndDate)})</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Stores</h3>
                <p>{user.storeCount || 0}</p>
              </div>
            </div>

            <div className="mt-6">
              <Button asChild className="w-full gap-2">
                <Link href={`/admin/users/${user._id}/edit`}>
                  <Edit className="h-4 w-4" />
                  Edit User
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="subscription">
              <TabsList>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="stores">Stores</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="subscription" className="mt-0">
              <UserSubscriptionForm user={user} />
            </TabsContent>
            <TabsContent value="stores" className="mt-0">
              <UserStoresList userId={user._id} />
            </TabsContent>
            <TabsContent value="activity" className="mt-0">
              <UserActivityLog userId={user._id} />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
