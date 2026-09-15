import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_INFO, ARTWORKS } from "@/data/artworks";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "About & Visit | OPS Art Gallery New Delhi",
  description:
    "Learn about OPS Art Gallery's history, curatorial mission, location in Shahpur Jat, and visiting hours.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-24">
      <div className="space-y-4 border-b border-white/10 pb-12">
        <span className="eyebrow-label">Heritage & Vision</span>
        <h1 className="heading-1 text-gallery-white">About OPS Art Gallery</h1>
        <p className="text-sm text-gallery-muted max-w-2xl font-light">
          A dedicated sanctuary for visual artists, collectors, and art enthusiasts in Shahpur Jat, Siri Fort, New Delhi.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="eyebrow-label">Curatorial Philosophy</span>
          <h2 className="heading-2 text-gallery-white">
            Bridging Heritage & Contemporary Expression
          </h2>

          <div className="space-y-4 text-sm text-gallery-muted leading-relaxed font-light">
            <p>
              OPS Art Gallery was established to foster meaningful artistic dialogues between traditional craftsmanship and modern visual idioms. Situated in Shahpur Jat—an urban village where 14th-century Siri Fort ruins meet thriving designer ateliers—the gallery provides a tranquil space for contemplation.
            </p>
            <p className="text-gallery-white/90">
              Our curatorial direction prioritizes tactile materiality, rich natural pigments, and sculptural forms. We partner with seasoned masters as well as emerging subcontinental voices to stage solo retrospectives and thematic group dialogues.
            </p>
            <p>
              Exhibitions at OPS Art Gallery showcase heavy impasto oils, oxidized bronze, woven silk installations, and fine art photography, celebrating the evolving landscape of Indian fine art.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[500px] border border-white/10 p-3 bg-[#12110F]">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={ARTWORKS[1].imageSrc}
              alt="OPS Art Gallery authentic exhibition piece"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0908] border-y border-white/10 p-8 sm:p-12 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="eyebrow-label">Visitor Information</span>
          <h2 className="heading-2 text-gallery-white">Plan Your Visit</h2>
          <p className="text-xs text-gallery-muted">
            We welcome art collectors, researchers, and art enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#12110F] border border-white/10 p-6 space-y-4">
            <div className="w-10 h-10 rounded-none bg-gallery-brass/10 border border-gallery-brass/30 flex items-center justify-center text-gallery-brass">
              <MapPin size={20} />
            </div>
            <h3 className="font-serif text-lg text-gallery-white">Location</h3>
            <p className="text-xs text-gallery-muted leading-relaxed">
              {GALLERY_INFO.address}
            </p>
            <p className="text-[11px] text-gallery-brass">
              Landmark: Near Siri Fort Auditorium & Shahpur Jat Design Market.
            </p>
          </div>

          <div className="bg-[#12110F] border border-white/10 p-6 space-y-4">
            <div className="w-10 h-10 rounded-none bg-gallery-brass/10 border border-gallery-brass/30 flex items-center justify-center text-gallery-brass">
              <Clock size={20} />
            </div>
            <h3 className="font-serif text-lg text-gallery-white">Opening Hours</h3>
            <div className="space-y-2 text-xs text-gallery-muted">
              {GALLERY_INFO.hoursList.map((h, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                  <span>{h.day}</span>
                  <span className="text-gallery-white font-medium">{h.time}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gallery-brass/80">
              * Walk-ins welcome. Private viewing by appointment.
            </p>
          </div>

          <div className="bg-[#12110F] border border-white/10 p-6 space-y-4">
            <div className="w-10 h-10 rounded-none bg-gallery-brass/10 border border-gallery-brass/30 flex items-center justify-center text-gallery-brass">
              <Phone size={20} />
            </div>
            <h3 className="font-serif text-lg text-gallery-white">Direct Advisory</h3>
            <p className="text-xs text-gallery-muted leading-relaxed">
              For private viewing appointments, price quotes, or press inquiries:
            </p>
            <p className="text-sm text-gallery-white font-mono">{GALLERY_INFO.phone}</p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gallery-brass hover:text-gallery-white transition-colors"
            >
              <span>Submit Inquiry →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
