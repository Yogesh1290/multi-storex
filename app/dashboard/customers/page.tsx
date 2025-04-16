export default function CustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-500 mt-1">Manage your customer relationships</p>
      </div>

      <div className="bg-white border rounded-lg p-8 text-center">
        <h2 className="text-lg font-medium mb-2">No customers found</h2>
        <p className="text-gray-500">Customers will appear here once you make sales</p>
      </div>
    </div>
  )
}
