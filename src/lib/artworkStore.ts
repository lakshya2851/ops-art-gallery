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

export async function saveNewArtwork(artwork: Omit<Artwork, "id">): Promise<Artwork> {
  const newId = `custom-art-${Date.now()}`;
  const fullArtwork: Artwork = { ...artwork, id: newId };

  // 1. Save locally for instant fallback
  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(CUSTOM_KEY);
      const parsed: Artwork[] = existing ? JSON.parse(existing) : [];
      const updated = [fullArtwork, ...parsed];
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving local artwork", e);
    }
  }

  // 2. Sync to Cloud API so all devices see it
  try {
    const res = await fetch("/api/artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artwork),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.artwork) return data.artwork;
    }
  } catch (err) {
    console.error("Cloud API sync error:", err);
  }

  return fullArtwork;
}

export async function deleteArtworkFromCatalogue(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      const customRaw = localStorage.getItem(CUSTOM_KEY);
      if (customRaw) {
        const parsed: Artwork[] = JSON.parse(customRaw);
        const updated = parsed.filter((item) => item.id !== id);
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated));
      }

      const deletedRaw = localStorage.getItem(DELETED_KEY);
      const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(DELETED_KEY, JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.error("Error updating local delete registry", e);
    }
  }

  // Sync DELETE to Cloud API
  try {
    await fetch(`/api/artworks?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return true;
  } catch (err) {
    console.error("Cloud API delete sync error:", err);
    return false;
  }
}

export function resetCatalogueToDefault(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CUSTOM_KEY);
    localStorage.removeItem(DELETED_KEY);
  }
}

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS);

  const fetchArtworks = async () => {
    try {
      const res = await fetch("/api/artworks", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.artworks && data.artworks.length > 0) {
          setArtworks(data.artworks);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch cloud artworks, using local backup:", err);
    }
    setArtworks(getStoredArtworks());
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return { artworks, refresh: fetchArtworks };
}
