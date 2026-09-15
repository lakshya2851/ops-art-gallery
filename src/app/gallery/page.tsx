import React from "react";
import Metadata from "next";
import { ArtworkGrid } from "@/components/gallery/ArtworkGrid";
import { ARTWORKS } from "@/data/artworks";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Gallery Collection & Catalogue | OPS Art Gallery",
  description:
    "Browse contemporary fine art paintings, modern sculptures, and mixed media installations at OPS Art Gallery, New Delhi.",
};

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gallery-brass bg-[#161513] border border-gallery-brass/20 px-4 py-2">
          <Sparkles size={14} />
          <span>Curated Permanent & Seasonal Works</span>
        </div>

        <h1 className="heading-1 text-gallery-white">The Collection</h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gallery-muted">
          <p className="max-w-xl font-light leading-relaxed">
            Exploring contemporary South Asian art, medium innovation, and sculptural materiality. Click any artwork to view complete provenance, dimensions, and acquisition details.
          </p>
          <div className="text-right sm:text-left">
            <span className="text-gallery-brass font-semibold block text-base">{ARTWORKS.length} Artworks</span>
            <span className="text-[11px]">Currently Exhibited</span>
          </div>
        </div>
      </div>

      {/* Interactive Artwork Grid & Lightbox */}
      <ArtworkGrid />
    </div>
  );
}
