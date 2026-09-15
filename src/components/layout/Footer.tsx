import React from "react";
import Link from "next/link";
import { GALLERY_INFO } from "@/data/artworks";
import { Instagram, MapPin, Phone, Star, ArrowUpRight, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0908] border-t border-white/10 pt-20 pb-12 text-gallery-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-block group mb-4">
                <span className="font-serif text-2xl tracking-tight text-gallery-white group-hover:text-gallery-brass transition-colors">
                  OPS ART GALLERY
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-gallery-brass font-medium">
                  New Delhi
                </span>
              </Link>
              <p className="text-sm text-gallery-muted leading-relaxed max-w-md">
                A sanctuary for contemporary visual arts, cultural dialogues, and fine art collections in the historic artistic quarter of Shahpur Jat.
              </p>
            </div>

            <div className="inline-flex items-center space-x-3 bg-[#141311] border border-gallery-brass/20 px-4 py-2 text-xs">
              <div className="flex items-center text-[#B08D57]">
                <Star size={14} className="fill-[#B08D57] mr-1" />
                <span className="font-semibold text-gallery-white">{GALLERY_INFO.googleRating}</span>
              </div>
              <span className="text-gallery-muted">•</span>
              <span className="text-gallery-muted">{GALLERY_INFO.googleReviewCount} Verified Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Hours & Visit Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="eyebrow-label block">Hours & Visiting</span>
            <div className="space-y-2 text-xs text-gallery-muted">
              {GALLERY_INFO.hoursList.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                  <span>{item.day}</span>
                  <span className="text-gallery-white">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="eyebrow-label block">Contact & Location</span>
            <div className="space-y-3 text-xs text-gallery-muted">
              <a
                href={GALLERY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gallery-white hover:text-gallery-brass transition-colors group"
              >
                <Instagram size={14} className="text-gallery-brass" />
                <span>{GALLERY_INFO.instagramHandle}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`tel:${GALLERY_INFO.phoneRaw}`}
                className="flex items-center space-x-2 text-gallery-white hover:text-gallery-brass transition-colors"
              >
                <Phone size={14} className="text-gallery-brass" />
                <span>{GALLERY_INFO.phone}</span>
              </a>
              <div className="flex items-start space-x-2 pt-1 text-gallery-muted">
                <MapPin size={14} className="text-gallery-brass flex-shrink-0 mt-0.5" />
                <span>{GALLERY_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gallery-muted gap-4">
          <p>© {new Date().getFullYear()} OPS Art Gallery. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-gallery-white transition-colors">Home</Link>
            <Link href="/gallery" className="hover:text-gallery-white transition-colors">Gallery</Link>
            <Link href="/about" className="hover:text-gallery-white transition-colors">About & Visit</Link>
            <Link href="/contact" className="hover:text-gallery-white transition-colors">Contact</Link>
            <Link href="/admin" className="text-gallery-brass hover:underline flex items-center space-x-1">
              <Shield size={12} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
