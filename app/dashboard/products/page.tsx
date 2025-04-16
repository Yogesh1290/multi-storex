export default function ProductsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-gray-500 mt-1">Manage your products across all stores</p>
      </div>

      <div className="bg-white border rounded-lg p-8 text-center">
        <h2 className="text-lg font-medium mb-2">No products found</h2>
        <p className="text-gray-500">Products from your stores will appear here</p>
      </div>
    </div>
  )
}
