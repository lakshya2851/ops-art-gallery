import React, { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { GALLERY_INFO } from "@/data/artworks";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";

export const metadata = {
  title: "Contact & Acquisitions | OPS Art Gallery New Delhi",
  description:
    "Contact OPS Art Gallery in Shahpur Jat, New Delhi for artwork inquiries, advisory, and private viewing appointments.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 border-b border-white/10 pb-12">
        <span className="eyebrow-label">Get In Touch</span>
        <h1 className="heading-1 text-gallery-white">Contact & Advisory</h1>
        <p className="text-sm text-gallery-muted max-w-2xl font-light">
          Whether you are acquiring fine art, seeking curatorial advice, or scheduling a gallery visit, our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#12110F] border border-white/10 p-8 space-y-6">
            <h3 className="font-serif text-xl text-gallery-white border-b border-white/10 pb-4">
              Direct Gallery Contacts
            </h3>

            {/* Address */}
            <div className="space-y-2">
              <span className="eyebrow-label text-[10px]">Location</span>
              <div className="flex items-start space-x-3 text-sm text-gallery-white">
                <MapPin size={18} className="text-gallery-brass flex-shrink-0 mt-0.5" />
                <span>{GALLERY_INFO.address}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <span className="eyebrow-label text-[10px]">Telephone</span>
              <div className="flex items-center space-x-3 text-sm text-gallery-white">
                <Phone size={18} className="text-gallery-brass flex-shrink-0" />
                <a href={`tel:${GALLERY_INFO.phoneRaw}`} className="hover:text-gallery-brass font-mono">
                  {GALLERY_INFO.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <span className="eyebrow-label text-[10px]">Email Address</span>
              <div className="flex items-center space-x-3 text-sm text-gallery-white">
                <Mail size={18} className="text-gallery-brass flex-shrink-0" />
                <span className="text-gallery-muted">{GALLERY_INFO.email}</span>
              </div>
              <span className="text-[10px] text-gallery-brass block">
                * Note: Email flagged {GALLERY_INFO.hoursNotice}
              </span>
            </div>

            {/* Instagram */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="eyebrow-label text-[10px]">Instagram</span>
              <a
                href={GALLERY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-gallery-white hover:text-gallery-brass transition-colors"
              >
                <Instagram size={18} className="text-gallery-brass flex-shrink-0" />
                <span>{GALLERY_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Opening Schedule Reminder */}
          <div className="bg-[#12110F] border border-white/10 p-8 space-y-4">
            <span className="eyebrow-label text-[10px]">Visiting Hours</span>
            <div className="space-y-2 text-xs text-gallery-muted">
              {GALLERY_INFO.hoursList.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                  <span>{item.day}</span>
                  <span className="text-gallery-white font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Component (7 cols) */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-12 text-gallery-muted text-xs">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
