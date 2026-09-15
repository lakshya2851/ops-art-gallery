"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/data/artworks";
import {
  saveNewArtwork,
  deleteArtworkFromCatalogue,
  resetCatalogueToDefault,
  useArtworks,
} from "@/lib/artworkStore";
import { Plus, Trash2, Lock, Image as ImageIcon, CheckCircle, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const { artworks, refresh } = useArtworks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [medium, setMedium] = useState("Oil & Pigment on Linen");
  const [dimensions, setDimensions] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("OPS Permanent Archive");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("ops_admin_authed");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "opsart2026" || passcode === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("ops_admin_authed", "true");
      setLoginError("");
    } else {
      setLoginError("Incorrect passcode. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (!altText) setAltText(`${title || "Artwork"} by ${artist || "Artist"}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert("Please upload an artwork image file");
      return;
    }

    setIsSubmitting(true);

    const newPiece = await saveNewArtwork({
      title,
      artist,
      year: Number(year),
      medium,
      dimensions: dimensions || undefined,
      price: price || undefined,
      collection: collection || "OPS Gallery Archive",
      imageSrc: imagePreview,
      altText: altText || `${title} by ${artist}`,
      description,
    });

    await refresh();
    setIsSubmitting(false);
    setSuccessMessage(`" ${newPiece.title} " published globally across all devices!`);

    // Reset Form
    setTitle("");
    setArtist("");
    setYear(new Date().getFullYear());
    setMedium("Oil & Pigment on Linen");
    setDimensions("");
    setPrice("");
    setDescription("");
    setImagePreview("");

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (confirm(`Are you sure you want to delete "${itemTitle}" from the public catalogue globally?`)) {
      await deleteArtworkFromCatalogue(id);
      await refresh();
      setSuccessMessage(`"${itemTitle}" removed from catalogue.`);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm("Reset catalogue back to original default archive?")) {
      resetCatalogueToDefault();
      await refresh();
      setSuccessMessage("Catalogue reset to default archive.");
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#12110F] border border-white/10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-none bg-gallery-brass/10 border border-gallery-brass/30 flex items-center justify-center text-gallery-brass mx-auto">
            <Lock size={24} />
          </div>
          <h1 className="font-serif text-2xl text-gallery-white">Gallery Admin Portal</h1>
          <p className="text-xs text-gallery-muted">
            Enter passcode to upload or delete paintings globally.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gallery-muted mb-2">
              Admin Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter admin passcode"
              className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none"
            />
          </div>

          {loginError && <p className="text-xs text-red-400">{loginError}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gallery-brass text-gallery-dark text-xs uppercase tracking-[0.2em] font-medium hover:bg-gallery-brass-hover transition-colors"
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <span className="eyebrow-label">Curatorial Cloud Management</span>
          <h1 className="heading-1 text-gallery-white">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.15em] px-4 py-2 border border-white/20 text-gallery-muted hover:text-gallery-brass hover:border-gallery-brass transition-colors"
            title="Restore default archive"
          >
            <RefreshCw size={13} />
            <span>Reset Defaults</span>
          </button>
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gallery-brass hover:text-gallery-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>View Live Gallery</span>
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="bg-[#161513] border border-gallery-brass p-4 text-xs text-gallery-brass flex items-center space-x-3">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-[#12110F] border border-white/10 p-8 sm:p-12 space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h2 className="font-serif text-2xl text-gallery-white flex items-center space-x-2">
            <Plus size={20} className="text-gallery-brass" />
            <span>Upload New Painting (Cloud Sync)</span>
          </h2>
          <p className="text-xs text-gallery-muted pt-1">
            Uploaded paintings automatically publish to cloud storage and sync across all phones and computers globally.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Artwork Title <span className="text-gallery-brass">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Symphony in Ochre"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Artist / Creator Name <span className="text-gallery-brass">*</span>
              </label>
              <input
                type="text"
                required
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g. M. F. Husain"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Creation Year <span className="text-gallery-brass">*</span>
              </label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Medium / Technique <span className="text-gallery-brass">*</span>
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              >
                <option value="Oil & Pigment on Linen">Oil & Pigment on Linen</option>
                <option value="Mixed Media & Gold Leaf">Mixed Media & Gold Leaf</option>
                <option value="Oxidized Bronze & Teakwood Base">Oxidized Bronze & Teakwood</option>
                <option value="Handwoven Silk & Wool">Handwoven Silk & Wool</option>
                <option value="Archival Inkjet Print">Archival Inkjet Print</option>
                <option value="Acrylic & Graphite on Canvas">Acrylic & Graphite on Canvas</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Collection Tag
              </label>
              <input
                type="text"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                placeholder="OPS Permanent Archive"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Size / Dimensions (Optional)
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 120 x 150 cm"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gallery-muted">
                Valuation / Price (Optional)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₹1,85,000 or Enquire"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gallery-muted">
              Painting Image File <span className="text-gallery-brass">*</span>
            </label>
            <div className="border-2 border-dashed border-white/20 p-6 text-center bg-[#0A0908] space-y-4">
              {imagePreview ? (
                <div className="relative w-48 h-48 mx-auto border border-gallery-brass">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon size={32} className="text-gallery-brass mx-auto" />
                  <p className="text-xs text-gallery-muted">Click below to upload painting image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="text-xs text-gallery-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-gallery-brass file:text-gallery-dark hover:file:bg-gallery-brass-hover cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gallery-muted">
              Curatorial Statement / Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe artwork techniques, inspiration, and provenance..."
              className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gallery-brass text-gallery-dark text-xs uppercase tracking-[0.25em] font-medium hover:bg-gallery-brass-hover transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Uploading To Cloud...</span>
              </>
            ) : (
              <span>Publish Painting Globally</span>
            )}
          </button>
        </form>
      </div>

      {/* Existing Artworks Table */}
      <div className="bg-[#12110F] border border-white/10 p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h3 className="font-serif text-xl text-gallery-white">Active Catalogue Paintings ({artworks.length})</h3>
          <span className="text-xs text-gallery-muted">Click Delete to remove any artwork from public catalogue globally</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gallery-muted">
            <thead className="bg-[#0A0908] uppercase text-[10px] text-gallery-brass">
              <tr>
                <th className="p-3">Preview</th>
                <th className="p-3">Title</th>
                <th className="p-3">Artist</th>
                <th className="p-3">Year</th>
                <th className="p-3">Medium</th>
                <th className="p-3">Type</th>
                <th className="p-3">Catalogue Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {artworks.map((item) => {
                const isCustom = item.id.startsWith("custom-art-") || item.id.startsWith("cloud-art-");
                return (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="p-3">
                      <div className="relative w-12 h-12 bg-black border border-white/10">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="p-3 text-gallery-white font-medium">{item.title}</td>
                    <td className="p-3">{item.artist}</td>
                    <td className="p-3">{item.year}</td>
                    <td className="p-3">{item.medium}</td>
                    <td className="p-3">
                      {isCustom ? (
                        <span className="text-gallery-brass font-medium">Cloud Upload</span>
                      ) : (
                        <span className="text-gallery-muted">Standard Archive</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="inline-flex items-center space-x-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 px-3 py-1.5 transition-colors"
                        title="Delete from public catalogue"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
