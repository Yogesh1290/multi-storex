import type { VercelDeploymentOptions } from "@/lib/types"

// Electronics store template files
export function getElectronicsStoreTemplate(options: VercelDeploymentOptions): Record<string, { file: string }> {
  return {
    "package.json": { file: getPackageJson(options) },
    "app/page.tsx": { file: getPageContent(options) },
    "app/layout.tsx": { file: getLayoutContent(options) },
    "app/loading.tsx": { file: getLoadingContent() },
    "app/globals.css": { file: getGlobalCssContent() },
    "tailwind.config.js": { file: getTailwindConfig() },
    "next.config.js": { file: getNextConfig() },
    "tsconfig.json": { file: getTsConfig() },
  }
}

// Helper functions to generate file content
function getPackageJson(options: VercelDeploymentOptions): string {
  return `{
  "name": "${options.name ? options.name.toLowerCase().replace(/\\s+/g, "-") : "electronics-store-template"}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "lucide-react": "0.294.0"
  },
  "devDependencies": {
    "@types/node": "20.10.4",
    "@types/react": "18.2.45",
    "@types/react-dom": "18.2.18",
    "autoprefixer": "10.4.16",
    "eslint": "8.56.0",
    "eslint-config-next": "14.0.4",
    "postcss": "8.4.32",
    "tailwindcss": "3.3.6",
    "typescript": "5.3.3"
  }
}`
}

function getPageContent(options: VercelDeploymentOptions): string {
  return `
"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown, User, Zap, Truck, Shield, CreditCard } from 'lucide-react'
import Image from "next/image"

export default function ElectronicsStore() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Smartphones", "Laptops", "Audio", "Accessories", "Gaming"]

  const featuredProducts = [
    {
      id: 1,
      name: "Ultra HD Smart TV - 55\\"",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "TVs",
      rating: 4.8,
      reviews: 124,
      description: "Crystal clear 4K resolution with smart features and voice control."
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.7,
      reviews: 89,
      description: "Premium sound quality with active noise cancellation and 30-hour battery life."
    },
    {
      id: 3,
      name: "Pro Gaming Laptop",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Laptops",
      rating: 4.9,
      reviews: 156,
      description: "High-performance gaming laptop with RGB keyboard and advanced cooling system."
    },
    {
      id: 4,
      name: "Smartphone 13 Pro",
      price: 999.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smartphones",
      rating: 4.9,
      reviews: 203,
      description: "Latest flagship smartphone with advanced camera system and all-day battery life."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Customer Support: 1-800-123-4567</span>
            <span className="hidden md:inline-block">|</span>
            <span className="hidden md:inline-block">Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300">Store Locator</a>
            <a href="#" className="hover:text-gray-300">Track Order</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">${options.name || "TechZone"}</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {categories.map((category) => (
                <a 
                  key={category}
                  href="#" 
                  className={\`text-sm font-medium transition-colors hover:text-blue-600 \${
                    activeCategory === category ? "text-blue-600" : "text-gray-700"
                  }\`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveCategory(category)
                  }}
                >
                  {category}
                </a>
              ))}
            </nav>

            {/* Account, Wishlist, Cart */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 hidden md:flex">
                <User className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 hidden md:flex">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-4 md:hidden">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <a 
                    key={category}
                    href="#" 
                    className={\`text-sm font-medium transition-colors hover:text-blue-600 \${
                      activeCategory === category ? "text-blue-600" : "text-gray-700"
                    }\`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveCategory(category)
                      setIsMenuOpen(false)
                    }}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Next-Gen Tech at Unbeatable Prices
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Discover the latest electronics and gadgets with free shipping and a 30-day money-back guarantee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#featured" 
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors text-center"
                  >
                    Shop Now
                  </a>
                  <a 
                    href="#" 
                    className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    View Deals
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <Image 
                    src="/placeholder.svg?height=400&width=600" 
                    alt="Latest electronics" 
                    width={600} 
                    height={400}
                    className="rounded-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast Shipping</h3>
                  <p className="text-sm text-gray-500">Free 2-day delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30-day money back</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Payments</h3>
                  <p className="text-sm text-gray-500">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Flexible Payment</h3>
                  <p className="text-sm text-gray-500">Pay in installments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.filter(cat => cat !== "All").map((category) => (
                <a 
                  key={category}
                  href="#" 
                  className="group"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveCategory(category)
                  }}
                >
                  <div className="bg-white rounded-lg p-6 text-center transition-all group-hover:shadow-md border border-gray-200">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      {category === "Smartphones" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                          <path d="M12 18h.01" />
                        </svg>
                      )}
                      {category === "Laptops" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
                          <line x1="2" x2="22" y1="20" y2="20" />
                        </svg>
                      )}
                      {category === "Audio" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>
                      )}
                      {category === "Accessories" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M22 12H2" />
                          <path d="M5 12V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v7" />
                          <path d="M9 21V12" />
                          <path d="M15 21V12" />
                          <path d="M5 16a2 2 0 0 1 2 2v3" />
                          <path d="M19 16a2 2 0 0 0-2 2v3" />
                        </svg>
                      )}
                      {category === "Gaming" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <line x1="6" x2="10" y1="12" y2="12" />
                          <line x1="8" x2="8" y1="10" y2="14" />
                          <line x1="15" x2="15.01" y1="13" y2="13" />
                          <line x1="18" x2="18.01" y1="11" y2="11" />
                          <rect width="20" height="12" x="2" y="6" rx="2" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{category}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <a href="#" className="text-blue-600 hover:underline font-medium flex items-center">
                View All <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
                  <div className="relative">
                    <Image 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name} 
                      width={300} 
                      height={300}
                      className="w-full h-64 object-contain p-4"
                    />
                    <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full hover:bg-gray-100 shadow-sm">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-blue-600 font-medium mb-1">{product.category}</div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">\${product.price.toFixed(2)}</span>
                      <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Special Deals</h2>
                  <p className="text-blue-100 mb-6">
                    Limited time offers on our most popular electronics. Save up to 40% on selected items.
                  </p>
                  <a 
                    href="#" 
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    View Deals
                  </a>
                </div>
                <div className="md:w-1/2">
                  <Image 
                    src="/placeholder.svg?height=400&width=600" 
                    alt="Special deals" 
                    width={600} 
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Excellent product quality and lightning-fast shipping. The customer service team was incredibly helpful when I had questions about my order."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Customer {item}</h4>
                      <p className="text-sm text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="mb-6">Subscribe to our newsletter for exclusive deals, tech news, and product launches.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">${options.name || "TechZone"}</h3>
              <p className="text-gray-400 mb-4">
                Your trusted destination for the latest electronics and tech gadgets.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Deals & Promotions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Warranty Information
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© ${new Date().getFullYear()} ${options.name || "TechZone"}. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <img src="/placeholder.svg?height=30&width=50&text=Visa" alt="Visa" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=Mastercard" alt="Mastercard" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=PayPal" alt="PayPal" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50&text=ApplePay" alt="Apple Pay" className="h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
`
}

function getLayoutContent(options: VercelDeploymentOptions): string {
  return `
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "${options.name || "TechZone"} - Electronics & Gadgets",
  description: "Your trusted destination for the latest electronics and tech gadgets",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`
}

function getLoadingContent(): string {
  return `
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  )
}
`
}

function getGlobalCssContent(): string {
  return `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

@layer utilities {
  .rotate-270 {
    transform: rotate(270deg);
  }
}
`
}

function getTailwindConfig(): string {
  return `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
}

function getNextConfig(): string {
  return `
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
`
}

function getTsConfig(): string {
  return `
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`
}
