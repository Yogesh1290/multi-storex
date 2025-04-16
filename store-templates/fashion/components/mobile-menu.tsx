"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  categories: string[]
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b z-20">
          <nav className="container mx-auto py-4">
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-gray-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
