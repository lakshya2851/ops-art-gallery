import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_INFO, ARTWORKS } from "@/data/artworks";
import { GalleryCorridor } from "@/components/corridor/GalleryCorridor";
import { ArrowRight, MapPin, Phone, Star, Instagram, Compass, Calendar } from "lucide-react";

export default function HomePage() {
  const featuredArtworks = ARTWORKS.slice(0, 3);
  // Real CSV Google Photos URLs for static Instagram strip
  const instagramPhotos = [
    { src: ARTWORKS[6].imageSrc, alt: "OPS Art Gallery Exhibition Room" },
    { src: ARTWORKS[7].imageSrc, alt: "Sculpture Installation at Shahpur Jat" },
    { src: ARTWORKS[8].imageSrc, alt: "Artist Canvas Detail" },
    { src: ARTWORKS[9].imageSrc, alt: "Contemporary Painting Exhibition" },
  ];

  return (
    <>
      {/* Signature 3D Gallery Corridor Loader */}
      <GalleryCorridor />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-16">
        <div className="space-y-8 max-w-4xl">
          <div className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-gallery-brass bg-[#161513] border border-gallery-brass/20 px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-gallery-brass animate-pulse" />
            <span>New Delhi Contemporary • Shahpur Jat</span>
          </div>

          <h1 className="display-title text-gallery-white">
            Where Modern Fine Art Meets Cultural Heritage.
          </h1>

          <p className="text-base sm:text-lg text-gallery-muted leading-relaxed max-w-2xl font-light">
            OPS Art Gallery presents curated contemporary exhibitions, fine art paintings, and sculptural works in the heart of Siri Fort, New Delhi.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.25em] px-8 py-4 bg-gallery-brass text-gallery-dark font-medium hover:bg-gallery-brass-hover transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.25em] px-8 py-4 border border-white/20 text-gallery-white hover:border-gallery-brass hover:text-gallery-brass transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            >
              <span>Plan Your Visit</span>
            </Link>
          </div>
        </div>

        {/* Hero Footer Meta Strip */}
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 text-xs text-gallery-muted">
          <div className="flex items-center space-x-3">
            <Compass size={18} className="text-gallery-brass flex-shrink-0" />
            <div>
              <span className="text-gallery-white font-medium block">Shahpur Jat Enclave</span>
              <span className="text-[11px]">129 A, Siri Fort, New Delhi</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Star size={18} className="text-gallery-brass fill-gallery-brass flex-shrink-0" />
            <div>
              <span className="text-gallery-white font-medium block">{GALLERY_INFO.googleRating}★ Google Reputation</span>
              <span className="text-[11px]">{GALLERY_INFO.googleReviewCount} Verified Art Collector Reviews</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar size={18} className="text-gallery-brass flex-shrink-0" />
            <div>
              <span className="text-gallery-white font-medium block">Current Season</span>
              <span className="text-[11px]">Mon – Sat: 11 AM – 8:30 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exhibition Strip */}
      <section className="py-24 bg-[#0A0908] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="eyebrow-label">Spotlight Exhibition</span>
              <h2 className="heading-1 text-gallery-white">Featured Works</h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gallery-brass hover:text-gallery-white transition-colors"
            >
              <span>View All {ARTWORKS.length} Artworks</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((art) => (
              <Link
                key={art.id}
                href="/gallery"
                className="group bg-[#12110F] border border-white/10 hover:border-gallery-brass/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative w-full h-[380px] overflow-hidden bg-black/40">
                  <Image
                    src={art.imageSrc}
                    alt={art.altText}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-6 space-y-2 border-t border-white/5">
                  <span className="eyebrow-label text-[10px]">{art.artist}</span>
                  <h3 className="font-serif text-xl text-gallery-white group-hover:text-gallery-brass transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gallery-muted">{art.medium}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curatorial Statement / Story Teaser */}
      <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="eyebrow-label">Curatorial Philosophy</span>
            <h2 className="heading-1 text-gallery-white">
              Cultivating Artistic Innovation in Shahpur Jat.
            </h2>
            <p className="text-sm text-gallery-muted leading-relaxed font-light">
              Nestled within Shahpur Jat's historical medieval walls and contemporary design village, OPS Art Gallery serves as a sanctuary for emerging and master South Asian artists.
            </p>
            <p className="text-sm text-gallery-muted leading-relaxed font-light">
              Our curatorial programs bridge traditional craftsmanship with modern abstract idioms, celebrating rich pigment washes, bronze forms, and textile narratives.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-white/20 text-gallery-white hover:border-gallery-brass hover:text-gallery-brass transition-colors"
              >
                <span>Read Full Gallery Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[480px] border border-white/10 p-3 bg-[#12110F]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={ARTWORKS[0].imageSrc}
                alt="OPS Art Gallery Exhibition Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-24 bg-[#0A0908] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow-label">Physical Location</span>
            <h2 className="heading-1 text-gallery-white">Visit The Gallery</h2>
            <p className="text-xs text-gallery-muted">
              Located in Shahpur Jat near Siri Fort, New Delhi. Walk-ins and private collector appointments welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Direct Information Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#12110F] border border-white/10 p-8 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="eyebrow-label text-[10px]">Address</span>
                  <p className="text-sm text-gallery-white flex items-start space-x-2">
                    <MapPin size={16} className="text-gallery-brass flex-shrink-0 mt-0.5" />
                    <span>{GALLERY_INFO.address}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="eyebrow-label text-[10px]">Direct Phone</span>
                  <p className="text-sm text-gallery-white flex items-center space-x-2">
                    <Phone size={16} className="text-gallery-brass" />
                    <a href={`tel:${GALLERY_INFO.phoneRaw}`} className="hover:text-gallery-brass transition-colors">
                      {GALLERY_INFO.phone}
                    </a>
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="eyebrow-label text-[10px]">Weekly Hours</span>
                  <p className="text-xs text-gallery-white">Monday – Saturday: 11:00 AM – 8:30 PM</p>
                  <p className="text-xs text-gallery-muted">Sunday: 12:00 PM – 6:00 PM (By Appointment)</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=OPS+Art+Gallery+Shahpur+Jat+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] py-3.5 bg-gallery-brass text-gallery-dark font-medium hover:bg-gallery-brass-hover transition-colors"
              >
                <span>Open in Google Maps</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Google Map Embed (7 cols) */}
            <div className="lg:col-span-7 border border-white/10 min-h-[380px] relative bg-[#12110F]">
              <iframe
                title="OPS Art Gallery Map Location"
                src={GALLERY_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(90%) invert(90%) contrast(120%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Instagram Grid (Real CSV Photos Only) */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="eyebrow-label">Social Archive</span>
            <h2 className="heading-2 text-gallery-white">Follow {GALLERY_INFO.instagramHandle}</h2>
          </div>
          <a
            href={GALLERY_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gallery-brass hover:text-gallery-white transition-colors"
          >
            <Instagram size={14} />
            <span>Visit Instagram Profile</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPhotos.map((photo, idx) => (
            <a
              key={idx}
              href={GALLERY_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-64 overflow-hidden border border-white/10 bg-[#12110F]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#0E0D0C]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-gallery-brass">
                <Instagram size={24} />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
