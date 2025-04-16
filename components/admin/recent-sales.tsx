"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { getRecentUsers } from "@/lib/actions/admin-actions"

interface User {
  _id: string
  name: string
  email: string
  image?: string
  subscriptionPlan?: string
  createdAt: string
}

export function RecentSales() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecentUsers() {
      try {
        const recentUsers = await getRecentUsers(5)
        setUsers(recentUsers)
      } catch (error) {
        console.error("Error loading recent users:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRecentUsers()
  }, [])

  if (loading) {
    return <div className="space-y-4">Loading recent users...</div>
  }

  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.subscriptionPlan || "No Plan"}</div>
        </div>
      ))}
    </div>
  )
}
