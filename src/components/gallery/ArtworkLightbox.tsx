"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/data/artworks";
import { X, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  artworks: Artwork[];
  onClose: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export function ArtworkLightbox({
  artwork,
  artworks,
  onClose,
  onSelectArtwork,
}: ArtworkLightboxProps) {
  if (!artwork) return null;

  const currentIndex = artworks.findIndex((item) => item.id === artwork.id);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    onSelectArtwork(artworks[prevIndex]);
  }, [currentIndex, artworks, onSelectArtwork]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % artworks.length;
    onSelectArtwork(artworks[nextIndex]);
  }, [currentIndex, artworks, onSelectArtwork]);

  // Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0908]/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork detail view for ${artwork.title}`}
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <span className="eyebrow-label text-[10px]">Catalogue No. {currentIndex + 1} / {artworks.length}</span>
          <span className="text-gallery-muted">•</span>
          <span className="text-xs text-gallery-muted truncate max-w-[200px] sm:max-w-xs">{artwork.collection || "OPS Collection"}</span>
        </div>

        <button
          onClick={onClose}
          className="text-gallery-white hover:text-gallery-brass p-2 transition-colors border border-white/10 hover:border-gallery-brass rounded-none focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          aria-label="Close artwork detail view"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Lightbox Content Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Left Side: Image Display Container (7 cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[350px] sm:min-h-[500px] bg-[#12110F] border border-white/10 p-4 group">
          <div className="relative w-full h-[350px] sm:h-[500px]">
            <Image
              src={artwork.imageSrc}
              alt={artwork.altText}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 60vw"
              unoptimized
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-gallery-white hover:text-gallery-brass p-3 border border-white/10 hover:border-gallery-brass transition-all focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-gallery-white hover:text-gallery-brass p-3 border border-white/10 hover:border-gallery-brass transition-all focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            aria-label="Next artwork"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Right Side: Artwork Metadata & Curatorial Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <span className="eyebrow-label">{artwork.artist}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-gallery-white leading-tight">
              {artwork.title}
            </h2>
            <p className="text-xs text-gallery-brass font-medium uppercase tracking-wider">
              {artwork.year}
            </p>

            <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-gallery-muted">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="uppercase tracking-wider">Medium</span>
                <span className="text-gallery-white font-medium">{artwork.medium}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="uppercase tracking-wider">Provenance</span>
                <span className="text-gallery-brass font-medium">{artwork.collection || "OPS Art Gallery Collection"}</span>
              </div>
            </div>

            {artwork.description && (
              <div className="pt-4 text-xs text-gallery-muted leading-relaxed space-y-2">
                <span className="eyebrow-label text-[10px] block">Curatorial Statement</span>
                <p className="italic text-gallery-white/80">"{artwork.description}"</p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
              onClick={onClose}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] px-6 py-3.5 bg-gallery-brass text-gallery-dark font-medium hover:bg-gallery-brass-hover transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            >
              <MessageSquare size={16} />
              <span>Enquire About Piece</span>
            </Link>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto text-xs uppercase tracking-[0.2em] px-6 py-3.5 border border-white/20 text-gallery-white hover:border-gallery-brass hover:text-gallery-brass transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
            >
              Next Piece →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
