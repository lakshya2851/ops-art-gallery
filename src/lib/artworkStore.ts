"use client";

import { useState, useEffect } from "react";
import { Artwork, ARTWORKS } from "@/data/artworks";

const CUSTOM_KEY = "ops_custom_artworks";
const DELETED_KEY = "ops_deleted_artworks";

export function getStoredArtworks(): Artwork[] {
  if (typeof window === "undefined") return ARTWORKS;
  try {
    const customRaw = localStorage.getItem(CUSTOM_KEY);
    const customArtworks: Artwork[] = customRaw ? JSON.parse(customRaw) : [];

    const deletedRaw = localStorage.getItem(DELETED_KEY);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];

    const combined = [...customArtworks, ...ARTWORKS];
    return combined.filter((art) => !deletedIds.includes(art.id));
  } catch (e) {
    console.error("Error reading stored artworks", e);
    return ARTWORKS;
  }
}

export function saveNewArtwork(artwork: Omit<Artwork, "id">): Artwork {
  const newId = `custom-art-${Date.now()}`;
  const fullArtwork: Artwork = { ...artwork, id: newId };

  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(CUSTOM_KEY);
      const parsed: Artwork[] = existing ? JSON.parse(existing) : [];
      const updated = [fullArtwork, ...parsed];
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving new artwork", e);
    }
  }

  return fullArtwork;
}

export function deleteArtworkFromCatalogue(id: string): boolean {
  if (typeof window !== "undefined") {
    try {
      // 1. Remove from custom artworks if present
      const customRaw = localStorage.getItem(CUSTOM_KEY);
      if (customRaw) {
        const parsed: Artwork[] = JSON.parse(customRaw);
        const updated = parsed.filter((item) => item.id !== id);
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
      }

      // 2. Add ID to deleted items registry
      const deletedRaw = localStorage.getItem(DELETED_KEY);
      const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(DELETED_KEY, JSON.stringify(deletedIds));
      }

      return true;
    } catch (e) {
      console.error("Error deleting artwork", e);
    }
  }
  return false;
}

export function resetCatalogueToDefault(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CUSTOM_KEY);
    localStorage.removeItem(DELETED_KEY);
  }
}

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS);

  useEffect(() => {
    setArtworks(getStoredArtworks());
  }, []);

  const refresh = () => {
    setArtworks(getStoredArtworks());
  };

  return { artworks, refresh };
}
