import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/actions/user-actions"
import { ProfileForm } from "@/components/profile-form"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const userProfile = await getUserProfile()

  if (!session?.user) {
    return <div>Not authenticated</div>
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and profile information</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Update your personal information and profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">{session.user.name}</h3>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                <Button size="sm">Change Avatar</Button>
              </div>
            </div>

            <ProfileForm
              defaultValues={{
                name: session.user.name || "",
                phoneNumber: userProfile?.phoneNumber || "",
                whatsappNumber: userProfile?.whatsappNumber || "",
                countryCode: userProfile?.countryCode || "np",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">
                Your account is secured through your Google authentication. To change your password, please visit your
                Google account settings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
