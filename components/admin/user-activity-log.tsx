"use client"

import { useEffect, useState } from "react"

interface ActivityLog {
  id: string
  action: string
  details: string
  timestamp: string
  ip?: string
}

interface UserActivityLogProps {
  userId: string
}

export function UserActivityLog({ userId }: UserActivityLogProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserActivity() {
      try {
        // In a real app, you would call an API to get the user's activity log
        // For this demo, we'll use mock data
        const mockActivities = [
          {
            id: "1",
            action: "Login",
            details: "User logged in successfully",
            timestamp: new Date().toISOString(),
            ip: "192.168.1.1",
          },
          {
            id: "2",
            action: "Store Created",
            details: "Created new store: Fashion Store",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            ip: "192.168.1.1",
          },
          {
            id: "3",
            action: "Subscription Changed",
            details: "Changed subscription from Basic to Professional",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            ip: "192.168.1.1",
          },
          {
            id: "4",
            action: "Login",
            details: "User logged in successfully",
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            ip: "192.168.1.2",
          },
        ]

        setActivities(mockActivities)
      } catch (error) {
        console.error("Error fetching user activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserActivity()
  }, [userId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return <div>Loading activity log...</div>
  }

  if (activities.length === 0) {
    return <div className="text-center py-4">No activity recorded for this user</div>
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start border-b pb-4">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{activity.action}</h3>
              <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
            </div>
            <p className="text-sm">{activity.details}</p>
            {activity.ip && <p className="text-xs text-muted-foreground mt-1">IP: {activity.ip}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
