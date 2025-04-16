"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateUserSubscription } from "@/lib/actions/admin-actions"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  name: string
  email: string
  image?: string
  trialEndDate: string
  subscriptionPlan?: string
}

interface TrialExpiryListProps {
  initialTrials?: User[]
}

export function TrialExpiryList({ initialTrials = [] }: TrialExpiryListProps) {
  const [users, setUsers] = useState<User[]>(initialTrials)
  const [loading, setLoading] = useState(initialTrials.length === 0)
  const [extendingId, setExtendingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchTrialUsers() {
      if (initialTrials.length > 0) {
        setUsers(initialTrials)
        setLoading(false)
        return
      }

      try {
        // Fetch users with active trials that are ending soon
        const response = await fetch("/api/admin/upcoming-trials")

        if (!response.ok) {
          throw new Error(`Error fetching trial users: ${response.status}`)
        }

        const data = await response.json()
        setUsers(data.users || [])
      } catch (error) {
        console.error("Error fetching trial users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrialUsers()
  }, [initialTrials])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      // Check if date is valid
      if (isNaN(date.getTime())) return "Invalid date"

      return date.toLocaleDateString()
    } catch (error) {
      console.error("Date formatting error:", error)
      return "Invalid date"
    }
  }

  const getDaysRemaining = (dateString: string) => {
    try {
      const endDate = new Date(dateString)
      const now = new Date()

      // Check if date is valid
      if (isNaN(endDate.getTime())) return 0

      const diffTime = endDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    } catch (error) {
      console.error("Error calculating days remaining:", error)
      return 0
    }
  }

  const handleExtendTrial = async (userId: string) => {
    setExtendingId(userId)
    try {
      // Extend trial by 7 days from current end date
      const user = users.find((u) => u._id === userId)
      if (!user) return

      const currentEndDate = new Date(user.trialEndDate)
      // Check if date is valid, if not use current date
      const baseDate = isNaN(currentEndDate.getTime()) ? new Date() : currentEndDate

      const newEndDate = new Date(baseDate)
      newEndDate.setDate(newEndDate.getDate() + 7)

      await updateUserSubscription(userId, {
        trialActive: true,
        trialEndDate: newEndDate,
      })

      // Update local state
      setUsers(
        users.map((u) => {
          if (u._id === userId) {
            return { ...u, trialEndDate: newEndDate.toISOString() }
          }
          return u
        }),
      )

      router.refresh()
    } catch (error) {
      console.error("Error extending trial:", error)
    } finally {
      setExtendingId(null)
    }
  }

  if (loading) {
    return <div className="py-4 text-center">Loading trial expirations...</div>
  }

  if (users.length === 0) {
    return <div className="text-center py-4">No upcoming trial expirations</div>
  }

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const daysRemaining = getDaysRemaining(user.trialEndDate)
        return (
          <div key={user._id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className={`font-medium ${daysRemaining <= 1 ? "text-red-500" : "text-amber-500"}`}>
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining
                </span>
              </p>
              <p className="text-xs text-muted-foreground">Expires {formatDate(user.trialEndDate)}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="ml-4"
              onClick={() => handleExtendTrial(user._id)}
              disabled={extendingId === user._id}
            >
              {extendingId === user._id ? "Extending..." : "Extend +7 Days"}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
