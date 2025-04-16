import { Button } from "@/components/ui/button"

export default function BillingPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and payment methods</p>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Current Plan</h2>
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Professional Plan</p>
              <p className="text-sm text-gray-500">NPR 500/month</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</div>
          </div>
        </div>
        <Button>Upgrade Plan</Button>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Payment Methods</h2>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <div className="text-sm text-blue-600">Default</div>
          </div>
        </div>
        <Button variant="outline">Add Payment Method</Button>
      </div>
    </div>
  )
}
