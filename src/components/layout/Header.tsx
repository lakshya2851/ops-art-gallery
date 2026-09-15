"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GALLERY_INFO } from "@/data/artworks";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About & Visit", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0D0C]/90 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Wordmark Logo */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          aria-label="OPS Art Gallery Homepage"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-gallery-white group-hover:text-gallery-brass transition-colors duration-300">
            OPS ART GALLERY
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gallery-brass font-medium opacity-80">
            New Delhi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-10"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative py-1 focus:outline-none focus:ring-1 focus:ring-[#B08D57] ${
                  isActive
                    ? "text-gallery-brass font-semibold"
                    : "text-gallery-white/70 hover:text-gallery-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gallery-brass" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/gallery"
            className="text-xs uppercase tracking-[0.2em] px-5 py-2.5 border border-gallery-brass/40 text-gallery-brass hover:border-gallery-brass hover:bg-gallery-brass/10 transition-all duration-300 rounded-none focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          >
            Explore Artworks
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gallery-white p-2 focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-[#0E0D0C]/98 backdrop-blur-xl z-50 flex flex-col justify-between px-8 py-12 border-t border-white/10">
          <div className="flex flex-col space-y-8">
            <span className="eyebrow-label">Navigation</span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-serif text-3xl transition-colors ${
                  pathname === item.href
                    ? "text-gallery-brass"
                    : "text-gallery-white hover:text-gallery-brass"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col space-y-4">
            <span className="eyebrow-label">Visit Gallery</span>
            <p className="text-sm text-gallery-muted">{GALLERY_INFO.address}</p>
            <p className="text-sm text-gallery-brass">{GALLERY_INFO.phone}</p>
          </div>
        </div>
      )}
    </header>
  );
}
