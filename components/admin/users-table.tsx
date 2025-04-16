"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { updateUserSubscription } from "@/lib/actions/admin-actions"

interface User {
  _id: string
  name: string
  email: string
  image?: string
  subscriptionPlan?: string
  billingCycle?: string
  trialActive?: boolean
  trialEndDate?: string
  createdAt: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface UsersTableProps {
  users: User[]
  pagination: Pagination
}

export function UsersTable({ users, pagination }: UsersTableProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/users?page=${newPage}&limit=${pagination.limit}`)
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A"

    try {
      const date = new Date(dateString)
      // Check if date is valid
      if (isNaN(date.getTime())) return "N/A"

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (error) {
      console.error("Date formatting error:", error)
      return "N/A"
    }
  }

  const getSubscriptionBadge = (plan?: string) => {
    if (!plan) return <Badge variant="outline">No Plan</Badge>

    switch (plan) {
      case "Basic":
        return <Badge className="bg-blue-500">Basic</Badge>
      case "Professional":
        return <Badge className="bg-purple-500">Professional</Badge>
      case "Enterprise":
        return <Badge className="bg-amber-500">Enterprise</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  const getTrialStatus = (user: User) => {
    if (!user.trialActive) return null

    const trialEnd = user.trialEndDate ? new Date(user.trialEndDate) : null
    const now = new Date()

    if (!trialEnd || isNaN(trialEnd.getTime())) return null

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

  const handleExtendTrial = async (userId: string) => {
    setIsLoading(userId)
    try {
      // Extend trial by 7 days from now
      const newEndDate = new Date()
      newEndDate.setDate(newEndDate.getDate() + 7)

      await updateUserSubscription(userId, {
        trialActive: true,
        trialEndDate: newEndDate,
      })

      router.refresh()
    } catch (error) {
      console.error("Error extending trial:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subscription</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Trial Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
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
                    <div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">{user.email}</td>
                <td className="p-4 align-middle">
                  {getSubscriptionBadge(user.subscriptionPlan)}
                  {user.billingCycle && <span className="ml-2 text-xs text-gray-500">({user.billingCycle})</span>}
                </td>
                <td className="p-4 align-middle">{getTrialStatus(user)}</td>
                <td className="p-4 align-middle">{formatDate(user.createdAt)}</td>
                <td className="p-4 align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user._id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user._id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit User</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleExtendTrial(user._id)} disabled={isLoading === user._id}>
                        {isLoading === user._id ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <span>Extend Trial 7 Days</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete User</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === pagination.page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
