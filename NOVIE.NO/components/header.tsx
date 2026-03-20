"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#arbeid", label: "Arbeid" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero (100vh)
      setIsScrolled(window.scrollY > window.innerHeight - 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative">
            <Image
              src="/logo.png"
              alt="Novie"
              width={104}
              height={104}
              className={`invert transition-all duration-300 ${
                isScrolled
                  ? "w-14 h-14 sm:w-16 sm:h-16"
                  : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-6 pb-4">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-lg uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
