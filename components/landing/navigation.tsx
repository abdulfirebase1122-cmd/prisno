"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-400 ${
            isScrolled || isMobileMenuOpen
              ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-3xl"
              : "bg-transparent max-w-full"
          }`}
        >
          <div
            className={`max-w-4xl mx-auto flex items-center justify-between transition-all duration-500 px-6 ${
              isScrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo and Site Title */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/favicon.png"
                alt="MySite Logo"
                width={32} 
                height={32}
                className={`${isScrolled ? "h-8 w-8" : "h-10 w-10"} transition-all duration-500`}
              />
              <span
                className={`text-2xl font-medium transition-all duration-500 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                Prisno
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-foreground" : "bg-white"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Call to Actions (CTAs) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className={`transition-all duration-500 font-medium ${
                  isScrolled
                    ? "text-xs text-foreground/70 hover:text-foreground"
                    : "text-sm text-white/70 hover:text-white"
                }`}
              >
                Sign In
              </Link>
              <Button
                size="sm"
                className={`rounded-full transition-all duration-500 ${
                  isScrolled
                    ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs"
                    : "bg-white hover:bg-white/90 text-black px-6"
                }`}
                asChild // Use asChild to pass Button props to Link
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-500 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Mobile Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                className={`text-5xl font-display font-bold text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Bottom CTAs */}
          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              variant="outline"
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}