import React from "react";
import { GALLERY_INFO } from "@/data/artworks";

export function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["ArtGallery", "LocalBusiness"],
    "name": GALLERY_INFO.name,
    "description": GALLERY_INFO.tagline,
    "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675",
    "telephone": GALLERY_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "129 A, Shahpur Jat, Siri Fort",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110049",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5482,
      "longitude": 77.2120
    },
    "url": "https://opsartgallery.com",
    "sameAs": [
      GALLERY_INFO.instagram
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": GALLERY_INFO.googleRating,
      "reviewCount": GALLERY_INFO.googleReviewCount
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "11:00",
        "closes": "20:30"
      }
    ],
    "priceRange": "₹₹₹"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
