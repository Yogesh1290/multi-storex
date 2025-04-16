import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Zap, Shield, CreditCard, BarChart3, Layers, Database, Server } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Deploy Your eCommerce Store
              </h1>
              <h2 className="text-3xl font-bold tracking-tighter text-blue-500 sm:text-4xl md:text-5xl lg:text-6xl">
                Without Code
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                Launch your online store in minutes with our SaaS platform. Simply subscribe, connect your Vercel
                account, and we'll handle the rest.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/pricing">
                <Button variant="outline">View Plans</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Mockup */}
      <section className="container px-4 md:px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
            <div className="bg-gray-800 h-6 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-white p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Store Name</h3>
              <p className="text-gray-500 text-center mb-4">
                Your custom online store is ready to launch. Add products and start selling today!
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">Customize Store</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Sell Online
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Our platform provides all the tools you need to build, launch, and grow your online store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Customizable Storefront</h3>
              <p className="text-gray-500">
                Create a unique online store with customizable templates, branding, and layout options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Automated Deployment</h3>
              <p className="text-gray-500">
                One-click deployment using your Vercel access token - no coding or technical skills required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Secure & Protected</h3>
              <p className="text-gray-500">
                Your source code remains secure and inaccessible, with enterprise-grade security features.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Multiple Payment Options</h3>
              <p className="text-gray-500">
                Accept payments via Stripe, PayPal, Khalti and other popular payment gateways.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Analytics Dashboard</h3>
              <p className="text-gray-500">
                Track store performance with detailed analytics, customer insights, and sales reports.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Layers className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Multi-tenant Architecture</h3>
              <p className="text-gray-500">
                Each store operates in an isolated environment for optimal performance and security.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Server className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Scalable Infrastructure</h3>
              <p className="text-gray-500">
                Built on a robust cloud infrastructure that scales with your business needs.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">API Access</h3>
              <p className="text-gray-500">
                Connect your store to third-party services with our comprehensive API endpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Launch your eCommerce store in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                01
              </div>
              <h3 className="text-xl font-bold">Subscribe to a Plan</h3>
              <p className="text-gray-500">
                Choose a subscription plan that fits your business needs and complete the payment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                02
              </div>
              <h3 className="text-xl font-bold">Connect Vercel</h3>
              <p className="text-gray-500">
                Provide your Vercel access token to enable automated deployments of your store.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                03
              </div>
              <h3 className="text-xl font-bold">Customize & Launch</h3>
              <p className="text-gray-500">Customize your store, add products, and go live with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Enterprise-Grade Security for Your Business
              </h2>
              <p className="text-gray-500 md:text-xl">
                Our platform is built with security as a priority, protecting your source code and data.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Secure token handling with encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Isolated environments for each store</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>DDOS protection with Cloudflare</span>
                </li>
              </ul>
              <Button className="gap-1 mt-4">
                Get Protected <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-gray-800 h-6 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="bg-gray-900 p-6 text-green-400 font-mono text-sm">
                <div>// Secure deployment process</div>
                <div className="mt-2">
                  const <span className="text-blue-400">deployStore</span> ={" "}
                  <span className="text-yellow-400">async</span>() =&gt; {"{"}
                </div>
                <div className="ml-4">
                  await <span className="text-blue-400">verifyToken</span>(token);
                </div>
                <div className="ml-4">
                  const <span className="text-blue-400">deployment</span> ={" "}
                  <span className="text-yellow-400">await</span> vercel.createDeployment({"{"});
                </div>
                <div className="ml-8">
                  project: <span className="text-green-300">'your-store'</span>,
                </div>
                <div className="ml-8">
                  token: <span className="text-green-300">'encrypted_token'</span>
                </div>
                <div className="ml-4">{"}"})</div>
                <div className="ml-4">
                  return {"{"} <span className="text-blue-400">status</span>:{" "}
                  <span className="text-green-300">'success'</span> {"}"};
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your eCommerce Journey?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Join hundreds of sellers who are already using our platform to grow their business online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
              <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="hover:text-white">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/api-reference" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="hover:text-white">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-blue-500">StoreX</div>
            <div className="text-sm mt-4 md:mt-0">© 2025 StoreX. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
