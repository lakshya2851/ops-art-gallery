"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Artwork, ARTWORKS } from "@/data/artworks";
import { ArtworkLightbox } from "./ArtworkLightbox";
import { Eye } from "lucide-react";

export function ArtworkGrid() {
  const [selectedMedium, setSelectedMedium] = useState<string>("All");
  const [activeLightboxArtwork, setActiveLightboxArtwork] = useState<Artwork | null>(null);

  const mediumCategories = [
    "All",
    "Oil & Pigment",
    "Mixed Media",
    "Bronze & Sculpture",
    "Textile & Archival",
  ];

  const filteredArtworks = useMemo(() => {
    if (selectedMedium === "All") return ARTWORKS;
    return ARTWORKS.filter((art) => {
      const med = art.medium.toLowerCase();
      if (selectedMedium === "Oil & Pigment") return med.includes("oil") || med.includes("pigment");
      if (selectedMedium === "Mixed Media") return med.includes("mixed") || med.includes("acrylic");
      if (selectedMedium === "Bronze & Sculpture") return med.includes("bronze") || med.includes("wood") || med.includes("sculptur") || med.includes("ceramic");
      if (selectedMedium === "Textile & Archival") return med.includes("silk") || med.includes("wool") || med.includes("inkjet") || med.includes("print") || med.includes("textile") || med.includes("dye");
      return true;
    });
  }, [selectedMedium]);

  return (
    <div className="w-full space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/10 pb-8">
        {mediumCategories.map((medium) => {
          const isSelected = selectedMedium === medium;
          return (
            <button
              key={medium}
              onClick={() => setSelectedMedium(medium)}
              className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-[#B08D57] ${
                isSelected
                  ? "border-gallery-brass bg-gallery-brass text-gallery-dark font-medium"
                  : "border-white/10 text-gallery-white/70 hover:border-white/30 hover:text-gallery-white"
              }`}
            >
              {medium}
            </button>
          );
        })}
      </div>

      {/* Editorial Artwork Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((art, index) => {
          const isTall = index % 3 === 1;
          return (
            <div
              key={art.id}
              onClick={() => setActiveLightboxArtwork(art)}
              className="group cursor-pointer bg-[#12110F] border border-white/10 hover:border-gallery-brass/50 transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveLightboxArtwork(art);
                }
              }}
              aria-label={`View details for ${art.title} by ${art.artist}`}
            >
              {/* Image Aspect Container */}
              <div className={`relative w-full overflow-hidden bg-black/40 ${isTall ? "h-[450px]" : "h-[360px]"}`}>
                <Image
                  src={art.imageSrc}
                  alt={art.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0E0D0C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                  <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gallery-brass border border-gallery-brass px-4 py-2 bg-black/60 backdrop-blur-sm">
                    <Eye size={14} />
                    <span>View Catalogue Entry</span>
                  </div>
                </div>
              </div>

              {/* Artwork Caption — Title, Artist & Medium ONLY */}
              <div className="p-6 space-y-2 border-t border-white/5 bg-[#12110F]">
                <div className="flex justify-between items-start">
                  <span className="eyebrow-label text-[10px]">{art.artist}</span>
                  <span className="text-[10px] text-gallery-brass uppercase tracking-wider">{art.year}</span>
                </div>
                <h3 className="font-serif text-lg text-gallery-white group-hover:text-gallery-brass transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-gallery-muted truncate">{art.medium}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <ArtworkLightbox
        artwork={activeLightboxArtwork}
        artworks={filteredArtworks}
        onClose={() => setActiveLightboxArtwork(null)}
        onSelectArtwork={(artwork) => setActiveLightboxArtwork(artwork)}
      />
    </div>
  );
}
