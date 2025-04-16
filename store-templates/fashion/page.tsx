"use client"

import { useState } from "react"
import { ShoppingBag, Heart, Search, Menu, X, ChevronRight, User, Instagram } from "lucide-react"
import Image from "next/image"

export default function FashionStore() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("New Arrivals")

  const categories = ["New Arrivals", "Women", "Men", "Accessories", "Sale"]

  const featuredProducts = [
    {
      id: 1,
      name: "Oversized Cotton Shirt",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Women",
      isNew: true,
      isSale: false,
      discount: 0,
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Men",
      isNew: false,
      isSale: true,
      discount: 20,
    },
    {
      id: 3,
      name: "Wool Blend Coat",
      price: 249.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Women",
      isNew: true,
      isSale: false,
      discount: 0,
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 179.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      isNew: false,
      isSale: false,
      discount: 0,
    },
  ]

  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      description: "Light fabrics for hot days",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
    {
      id: 2,
      name: "Autumn Essentials",
      description: "Transitional pieces for the changing season",
      image: "/placeholder.svg?height=600&width=400",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">Free worldwide shipping on orders over $150</div>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

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
                  className={`text-sm font-medium transition-colors hover:text-gray-500 ${
                    activeCategory === category ? "underline underline-offset-4" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveCategory(category)
                  }}
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className={`text-sm font-medium transition-colors hover:text-gray-500 ${
                      activeCategory === category ? "underline underline-offset-4" : ""
                    }`}
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
        <section className="relative h-[80vh] bg-gray-100">
          <div className="absolute inset-0">
            <Image src="/placeholder.svg?height=1080&width=1920" alt="Fashion model" fill className="object-cover" />
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
                  href="#"
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
              <a href="#" className="group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Women's collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-medium">Women</h3>
                  </div>
                </div>
              </a>
              <a href="#" className="group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Men's collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-medium">Men</h3>
                  </div>
                </div>
              </a>
              <a href="#" className="group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Accessories"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-medium">Accessories</h3>
                  </div>
                </div>
              </a>
              <a href="#" className="group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Sale items"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-medium">Sale</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
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
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-12">Our Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <div key={collection.id} className="relative h-[500px] group overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <h3 className="text-3xl font-light mb-2">{collection.name}</h3>
                      <p className="mb-6">{collection.description}</p>
                      <a
                        href={collection.link}
                        className="inline-block border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
                      >
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4">Follow Our Style</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our community and share your style with #EleganceStyle
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <a key={item} href="#" className="group relative aspect-square overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Instagram+${item}`}
                    alt={`Instagram post ${item}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="#" className="text-sm font-medium hover:underline">
                @elegance_fashion
              </a>
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
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
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
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Sustainability
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
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 ELEGANCE. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-black">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-black">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-black">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
