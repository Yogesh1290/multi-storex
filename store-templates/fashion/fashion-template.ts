// Define the fashion store template files
export const fashionTemplate = {
  "package.json": `{
    "name": "{{STORE_NAME}}",
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
      "lucide-react": "^0.294.0",
      "mongodb": "^5.7.0",
      "bcryptjs": "^2.4.3",
      "jose": "^5.1.3",
      "cloudinary": "^1.37.3"
    },
    "devDependencies": {
      "@types/node": "20.4.5",
      "@types/react": "18.2.16",
      "@types/react-dom": "18.2.7",
      "@types/bcryptjs": "^2.4.6",
      "autoprefixer": "10.4.14",
      "postcss": "8.4.27",
      "tailwindcss": "3.3.3",
      "typescript": "5.1.6"
    }
  }`,

  "app/page.tsx": `
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Search, User, Instagram, ChevronRight } from 'lucide-react'

export default function FashionStore() {
  const categories = ["New Arrivals", "Women", "Men", "Accessories", "Sale"]

  const featuredProducts = [
    {
      "id": 1,
      "name": "Oversized Cotton Shirt",
      "price": 89.99,
      "image": "/placeholder.svg?height=400&width=300",
      "category": "Women",
      "isNew": true,
      "isSale": false,
      "discount": 0
    },
    {
      "id": 2,
      "name": "Slim Fit Denim Jeans",
      "price": 129.99,
      "originalPrice": 159.99,
      "image": "/placeholder.svg?height=400&width=300",
      "category": "Men",
      "isNew": false,
      "isSale": true,
      "discount": 20
    },
    {
      "id": 3,
      "name": "Wool Blend Coat",
      "price": 249.99,
      "image": "/placeholder.svg?height=400&width=300",
      "category": "Women",
      "isNew": true,
      "isSale": false,
      "discount": 0
    },
    {
      "id": 4,
      "name": "Leather Crossbody Bag",
      "price": 179.99,
      "image": "/placeholder.svg?height=400&width=300",
      "category": "Accessories",
      "isNew": false,
      "isSale": false,
      "discount": 0
    }
  ];

  const collections = [
    {
      "id": 1,
      "name": "Summer Collection",
      "description": "Light fabrics for hot days",
      "image": "/placeholder.svg?height=600&width=400",
      "link": "#"
    },
    {
      "id": 2,
      "name": "Autumn Essentials",
      "description": "Transitional pieces for the changing season",
      "image": "/placeholder.svg?height=600&width=400",
      "link": "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">Free worldwide shipping on orders over $150</div>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tighter">ELEGANCE</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-sm font-medium transition-colors hover:text-gray-500"
                >
                  {category}
                </a>
              ))}
            </nav>

            {/* Search, Account, Wishlist, Cart */}
            <div className="flex items-center space-x-4">
              <button className="p-2">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2">
                <User className="h-5 w-5" />
              </button>
              <button className="p-2">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] bg-gray-100">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Fashion model"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h2 className="text-5xl font-light text-white mb-4 leading-tight">
                  The New <span className="font-bold">Autumn Collection</span>
                </h2>
                <p className="text-lg text-white mb-8">
                  Discover timeless pieces that blend comfort with sophistication.
                </p>
                <a
                  href="#featured-products"
                  className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Women", "Men", "Accessories", "Sale"].map((category) => (
                <a key={category} href="#" className="group">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt={\`\${category} collection\`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-medium">{category}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured-products" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light">Featured Products</h2>
              <a href="#" className="text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-4">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-5 w-5" />
                    </button>
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1">NEW</div>
                    )}
                    {product.isSale && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1">
                        SALE {product.discount}%
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <button className="w-full py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="font-medium">\${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through text-sm">
                          \${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-6">Be the first to know about new collections and exclusive offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white pt-16 pb-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ELEGANCE</h3>
              <p className="text-gray-600 mb-4">Contemporary fashion for the modern individual.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center">
            <p className="text-sm text-gray-600">© 2025 {{STORE_NAME}}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
  `,

  "app/layout.tsx": `
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from 'next/font/google'
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "{{STORE_NAME}} - Fashion & Style",
  description: "Contemporary fashion for the modern individual",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={\`\${playfair.variable} \${montserrat.variable} font-sans antialiased\`}>{children}</body>
    </html>
  )
}
  `,

  "app/globals.css": `
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
  font-family: var(--font-montserrat, sans-serif);
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-playfair, serif);
}

.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
  `,

  "tailwind.config.js": `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
}
  `,

  "next.config.js": `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeholder.com", "v0.dev"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    ADMIN_ROUTE: process.env.ADMIN_ROUTE,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long-here',
    NEXT_PUBLIC_ADMIN_ROUTE: process.env.ADMIN_ROUTE,
  },
  // Ensure we're using Node.js 18.x
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig
  `,

  "postcss.config.js": `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
  `,
  "middleware.ts": `
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  // Get the admin route from environment variable or use the default
  const adminRoute = process.env.ADMIN_ROUTE || "admin"
  const path = request.nextUrl.pathname
  
  // Check if the path starts with the admin route
  // This will match any admin route, including custom ones like "adminii"
  if (path.includes(\`/\${adminRoute}\`) || path.includes('/admin')) {
    const token = request.cookies.get("session")?.value

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL(\`/auth/signin?callbackUrl=\${encodeURIComponent(path)}\`, request.url))
    }

    try {
      // Verify token
      const secretKey = process.env.JWT_SECRET || "your-secret-key-min-32-chars-long-here"
      const key = new TextEncoder().encode(secretKey)
      const verified = await jwtVerify(token, key)

      // Check if user is admin
      if (verified.payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }

      // User is authenticated and is an admin, proceed
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL(\`/auth/signin?callbackUrl=\${encodeURIComponent(path)}\`, request.url))
    }
  }

  // Not an admin route, proceed
  return NextResponse.next()
}

// Update the matcher to include all paths except specific ones
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     * 6. /auth routes (for signin/signup)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}
  `,
  "app/auth/layout.tsx": `
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Authentication - Fashion Store",
  description: "Sign in or sign up to access your fashion store admin dashboard",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`,

  "app/auth/signin/page.tsx": `
"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during sign in")
      }

      // Redirect to callback URL or admin dashboard
      router.push(callbackUrl)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/signup" className="font-medium text-black hover:text-gray-800">
              create an admin account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
`,

  "app/auth/signup/page.tsx": `
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [canCreateAdmin, setCanCreateAdmin] = useState(true)

  const router = useRouter()

  // Check if admin account can be created
  useEffect(() => {
    const checkAdminCount = async () => {
      try {
        const response = await fetch("/api/auth/check-admin-count")
        const data = await response.json()
        setCanCreateAdmin(data.canCreate)
      } catch (error) {
        console.error("Error checking admin count:", error)
        // Default to allowing admin creation if check fails
        setCanCreateAdmin(true)
      }
    }

    checkAdminCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during sign up")
      }

      // Redirect to admin dashboard
      const adminRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin"
      router.push(\`/\${adminRoute}\`)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!canCreateAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Account Limit Reached</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              The maximum number of admin accounts has been reached.
            </p>
          </div>
          <div>
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an admin account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/signin" className="font-medium text-black hover:text-gray-800">
              sign in to your account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
`,
}
