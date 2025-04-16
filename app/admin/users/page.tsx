import { getUsers } from "@/lib/actions/admin-actions"
import { UsersTable } from "@/components/admin/users-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = (searchParams.search as string) || ""

  const { users, pagination } = await getUsers(page, limit, search)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and subscriptions</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <form className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            name="search"
            placeholder="Search users..."
            defaultValue={search}
            className="pl-9 bg-white"
          />
        </form>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <select name="limit" defaultValue={limit} className="border rounded-md py-1 px-2 text-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-sm text-gray-500">entries</span>
        </div>
      </div>

      <UsersTable users={users} pagination={pagination} />
    </div>
  )
}
