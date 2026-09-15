"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const searchParams = useSearchParams();
  const artworkQuery = searchParams.get("artwork");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: artworkQuery ? `Enquiry regarding: ${artworkQuery}` : "",
    message: artworkQuery
      ? `Hello OPS Art Gallery team,\n\nI am interested in acquiring or learning more about the piece "${artworkQuery}". Please send me pricing, provenance, and gallery viewing details.`
      : "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="bg-[#12110F] border border-white/10 p-8 sm:p-12 space-y-8 relative">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <span className="eyebrow-label">Private Enquiry Form</span>
        <h3 className="font-serif text-2xl text-gallery-white">Acquisitions & Advisory</h3>
        <p className="text-xs text-gallery-muted">
          Connect with our curatorial directors regarding artwork acquisition, private viewing appointments, or exhibition opportunities.
        </p>
      </div>

      {status === "success" ? (
        <div className="py-12 text-center space-y-4 animate-fadeIn">
          <CheckCircle2 size={48} className="text-gallery-brass mx-auto" />
          <h4 className="font-serif text-2xl text-gallery-white">Enquiry Transmitted</h4>
          <p className="text-xs text-gallery-muted max-w-md mx-auto">
            Thank you, {formData.name}. Your message regarding "{formData.subject || "Artwork Enquiry"}" has been received by our curatorial team. We will respond within 24 hours.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            }}
            className="mt-4 text-xs uppercase tracking-[0.2em] px-6 py-2.5 border border-gallery-brass text-gallery-brass hover:bg-gallery-brass/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gallery-muted">
                Full Name <span className="text-gallery-brass">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Gayatri Devi"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gallery-muted">
                Email Address <span className="text-gallery-brass">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. collector@artdomain.com"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gallery-muted">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gallery-muted">
                Subject / Artwork Title
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Private Viewing / Acquisition"
                className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gallery-muted">
              Message / Curatorial Note <span className="text-gallery-brass">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your inquiry, preferred viewing dates, or collection details..."
              className="w-full bg-[#0A0908] border border-white/15 focus:border-gallery-brass px-4 py-3 text-sm text-gallery-white placeholder:text-white/20 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.25em] py-4 bg-gallery-brass text-gallery-dark font-medium hover:bg-gallery-brass-hover transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08D57] disabled:opacity-50"
          >
            <Send size={16} />
            <span>{status === "submitting" ? "Transmitting..." : "Submit Enquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
