"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ARTWORKS } from "@/data/artworks";
import { ArrowRight, Sparkles } from "lucide-react";

export function GalleryCorridor({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("ops_corridor_seen");
      if (hasSeen === "true") {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        const timer = setTimeout(() => {
          handleSkip();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }

    const duration = 8000;
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const currentProgress = Math.min(1, elapsed / duration);
      setProgress(currentProgress);

      if (currentProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          handleSkip();
        }, 800);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleSkip = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ops_corridor_seen", "true");
    }
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  if (isReducedMotion) {
    return (
      <div
        className={`fixed inset-0 z-50 bg-[#0E0D0C] flex flex-col items-center justify-center transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center space-y-4 px-6">
          <span className="eyebrow-label">Welcome To</span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-gallery-white">
            OPS ART GALLERY
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-gallery-brass">
            New Delhi • Shahpur Jat
          </p>
        </div>
      </div>
    );
  }

  const cameraZ = -2000 + progress * 2100;

  const leftFrames = [
    { artwork: ARTWORKS[0], z: -400, y: -10 },
    { artwork: ARTWORKS[2], z: -900, y: 15 },
    { artwork: ARTWORKS[4], z: -1400, y: -20 },
  ];

  const rightFrames = [
    { artwork: ARTWORKS[1], z: -400, y: 10 },
    { artwork: ARTWORKS[3], z: -900, y: -15 },
    { artwork: ARTWORKS[5], z: -1400, y: 20 },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0E0D0C] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-editorial ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="OPS Art Gallery 3D Entry Experience"
    >
      <div className="corridor-viewport w-full h-full relative flex items-center justify-center">
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D0C] via-transparent to-[#0E0D0C] pointer-events-none z-10" />

        <div
          className="corridor-tunnel relative w-full h-full flex items-center justify-center will-change-transform"
          style={{
            transform: `translate3d(0, 0, ${cameraZ}px)`,
          }}
        >
          {leftFrames.map((item, index) => (
            <div
              key={`left-${index}`}
              className="corridor-frame absolute p-3 bg-[#161513] border border-gallery-brass/40 shadow-2xl transition-all"
              style={{
                width: "300px",
                height: "380px",
                transform: `translateX(-420px) translateY(${item.y}px) translateZ(${item.z}px) rotateY(40deg)`,
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-black/40">
                <Image
                  src={item.artwork.imageSrc}
                  alt={item.artwork.altText}
                  fill
                  className="object-cover"
                  sizes="300px"
                  unoptimized
                  priority
                />
              </div>
              <div className="mt-2 text-left">
                <p className="font-serif text-xs text-gallery-white truncate">{item.artwork.title}</p>
                <p className="text-[10px] text-gallery-brass">{item.artwork.artist}</p>
              </div>
            </div>
          ))}

          {rightFrames.map((item, index) => (
            <div
              key={`right-${index}`}
              className="corridor-frame absolute p-3 bg-[#161513] border border-gallery-brass/40 shadow-2xl transition-all"
              style={{
                width: "300px",
                height: "380px",
                transform: `translateX(420px) translateY(${item.y}px) translateZ(${item.z}px) rotateY(-40deg)`,
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-black/40">
                <Image
                  src={item.artwork.imageSrc}
                  alt={item.artwork.altText}
                  fill
                  className="object-cover"
                  sizes="300px"
                  unoptimized
                  priority
                />
              </div>
              <div className="mt-2 text-left">
                <p className="font-serif text-xs text-gallery-white truncate">{item.artwork.title}</p>
                <p className="text-[10px] text-gallery-brass">{item.artwork.artist}</p>
              </div>
            </div>
          ))}

          <div
            className="absolute text-center flex flex-col items-center justify-center space-y-4 px-6 z-30"
            style={{
              transform: "translateZ(-1200px)",
            }}
          >
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gallery-brass bg-black/80 border border-gallery-brass/30 px-5 py-2 backdrop-blur-md">
              <Sparkles size={14} />
              <span>Contemporary Fine Art</span>
            </div>

            <h1 className="font-serif text-6xl sm:text-8xl tracking-tight text-gallery-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] bg-black/40 px-8 py-4 backdrop-blur-sm border-y border-gallery-brass/20">
              OPS ART GALLERY
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-gallery-brass font-medium">
              129 A, Shahpur Jat • Siri Fort • New Delhi
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 z-50 flex items-center justify-between text-xs text-gallery-muted max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <span className="eyebrow-label text-[10px]">Corridor Journey</span>
          <div className="w-40 h-[1.5px] bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gallery-brass transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gallery-dark font-medium py-3 px-6 bg-gallery-brass hover:bg-gallery-brass-hover transition-colors shadow-lg focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          aria-label="Enter Main Gallery Site"
        >
          <span>Enter Gallery</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
