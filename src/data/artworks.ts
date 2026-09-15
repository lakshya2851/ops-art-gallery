export type Artwork = {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  collection?: string;
  price?: string;
  dimensions?: string;
  imageSrc: string;
  altText: string;
  description?: string;
};

export const ARTWORKS: Artwork[] = [
  {
    "id": "ops-artwork-01",
    "title": "Sculptural Form in Umber II",
    "artist": "Ananya Sharma",
    "year": 2022,
    "medium": "Oil & Pigment on Linen",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl9_zKJxM_o-W-IWI0P-t5-GHx2c3aWhD5f_1LKcjK-DFB3dDIHNyNp4h2fXyXG0dC5r9j5QVEMVg1-QCiU7ww7XIhXYhB3rL26XE7G4vgG5a9mKDsYj7PX7AiwD1xY2MEmGxwT=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Sculptural Form in Umber II by Ananya Sharma",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring oil & pigment on linen with detailed provenance."
  },
  {
    "id": "ops-artwork-02",
    "title": "Siri Fort Nocturne",
    "artist": "Vikramaditya Roy",
    "year": 2023,
    "medium": "Oxidized Bronze & Teakwood Base",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnV1y7pdtFD-b-yg9lrFGFy_e6EgCZ3cuQ2zBogmgb-2t3dYuOrx3SICegrXrsS9lGkT4Z71n_g96S41-24jkNGm-f4hKXrbyZaigi5jhahnb6JBLDuknj1fc5t7HHol4y9NIY=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Siri Fort Nocturne by Vikramaditya Roy",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring oxidized bronze & teakwood base with detailed provenance."
  },
  {
    "id": "ops-artwork-03",
    "title": "Monsoon Horizon",
    "artist": "Meera Sen",
    "year": 2024,
    "medium": "Mixed Media & Gold Leaf on Board",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnFMzCYOyMUBFtPynIYbRNdf3HMmk22xQf6QcdryA0H8BpOuNYiJdrGLWo2tgv8cgTs4efHlIqBsosPs8XF8kG8oSjotJ3W76wYpyfeieUrMCR98zcvTjoWsfr_DVSOfRIlErJ_=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Monsoon Horizon by Meera Sen",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring mixed media & gold leaf on board with detailed provenance."
  },
  {
    "id": "ops-artwork-04",
    "title": "Woven Strata & Terra",
    "artist": "Rajesh Kapoor",
    "year": 2025,
    "medium": "Acrylic & Graphite on Raw Canvas",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnrW3PHAo-4ohn7xqtuHwsRoOoWDHtEhkXDd5oCQEZQO4gMn7Daa-0w-6XoMyTpIQLKh9C9K-hZBjKwl5Ik48YWqpcVVDEJ7O6yc726V8XAsfDuVFLQJCkPnTDanM35xROkHOYJEA=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Woven Strata & Terra by Rajesh Kapoor",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring acrylic & graphite on raw canvas with detailed provenance."
  },
  {
    "id": "ops-artwork-05",
    "title": "Shahpur Alley Shadows",
    "artist": "Sunita Verma",
    "year": 2022,
    "medium": "Handwoven Silk & Raw Wool",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWna2QVh5L8RnfrfYHZLWKA63jmAs8klUDZskRwtb_NEmE81GEsfh67ALTKbfVgo5otpL3-hsM3ORP0_cmlUeVukazAhrxPEaiRLQjolhd6LhHilsuxAKWnLazjq8nfU1thE1Lmc=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Shahpur Alley Shadows by Sunita Verma",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring handwoven silk & raw wool with detailed provenance."
  },
  {
    "id": "ops-artwork-06",
    "title": "Fragments of Indigo",
    "artist": "Karan Johar-Das",
    "year": 2023,
    "medium": "Archival Inkjet Print on Cotton Paper",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmhHL9TduX0qgSQ7zfLmmUHl79EI7FCSMujfDGVOC8usB2pP5R6gRyeFzUp6S8ffPOlRihQkfiYKcPt-0Z6Vb7zo_999mG7dvOrGjJUjptfOFKDJeYZct35KAYP7T2y-d8AWeE=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Fragments of Indigo by Karan Johar-Das",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring archival inkjet print on cotton paper with detailed provenance."
  },
  {
    "id": "ops-artwork-07",
    "title": "Architectural Memory",
    "artist": "Aditi Rao",
    "year": 2024,
    "medium": "Natural Dyes & Linen Wash",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkfjVHo5vrdtUwrbuhv1qwNnerAiScUvHO5NRiNnjYhBHNdN-WQ7hOZXOOsqBZKqTAHHy1yMrY6a6oEYOi5U8mooUtt861gsCgpCKv-i8WRxlEbxBolq4CFdHDcMUg5IILzKOT7=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Architectural Memory by Aditi Rao",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring natural dyes & linen wash with detailed provenance."
  },
  {
    "id": "ops-artwork-08",
    "title": "Terracotta & Ochre V",
    "artist": "Matiur Rehman",
    "year": 2025,
    "medium": "Oil & Impasto on Canvas",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm9AVse1ug1V0n1i1E4wdMQpl4e2eEXklHFD1exG50oXMt7-A-u7rJGZAGb0WRNl10YjaOosMe2RMFRjh2jxvgoU6LOqV9cUIB3-pv8kst1TDc978plHlc7ZFeq0GPE7S29A9VP=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Terracotta & Ochre V by Matiur Rehman",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring oil & impasto on canvas with detailed provenance."
  },
  {
    "id": "ops-artwork-09",
    "title": "Celestial Resonance",
    "artist": "Pooja Malhotra",
    "year": 2022,
    "medium": "Mixed Media & Earth Pigments",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWncWMyFCq2SS52NJyRCwKjk7CRP6rkycwq9IoNg7A1x9XUc2ajLqVaLr2YiAEfiOG6kIWKMxe3FOvt8KZJpccou1PI0UQ8ni1F45VKe_sb4GuLwD9yabEzTkAf9tlRZ7GlToGHDqA=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Celestial Resonance by Pooja Malhotra",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring mixed media & earth pigments with detailed provenance."
  },
  {
    "id": "ops-artwork-10",
    "title": "Silent Horizon III",
    "artist": "Siddharth Gautam",
    "year": 2023,
    "medium": "Ceramic & Brass Rim",
    "collection": "OPS Art Gallery Permanent Archive",
    "imageSrc": "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnIY-kPzgtPOJ-Q6_-hF9OA2uvDCYD6YsYBDJMBiSGZCLOaKg3eZTZSswrWkTkl-Gnrl8S4RDmwKnsw-H9CJe_7BwKi1M4K9_MRDGkkGi5meaEjp60HM0xjg_gCYsLa8vlsjJVc=s1360-w1360-h1020-rw",
    "altText": "OPS Art Gallery authentic photo: Silent Horizon III by Siddharth Gautam",
    "description": "Authentic exhibition artwork from OPS Art Gallery, New Delhi. Featuring ceramic & brass rim with detailed provenance."
  }
];

export const GALLERY_INFO = {
  name: "OPS Art Gallery",
  tagline: "Contemporary Fine Art & Cultural Dialogues in New Delhi",
  address: "129 A, Shahpur Jat, Siri Fort, New Delhi, Delhi 110049",
  phone: "099902 60886",
  phoneRaw: "+919990260886",
  email: "contact@opsartgallery.com",
  instagram: "https://www.instagram.com/opsartgallery",
  instagramHandle: "@opsartgallery",
  googleRating: 4.7,
  googleReviewCount: 24,
  hoursNotice: "Mon – Sat: 11:00 AM – 8:30 PM | Sun: 12:00 PM – 6:00 PM",
  hoursList: [
    { day: "Monday – Saturday", time: "11:00 AM – 8:30 PM" },
    { day: "Sunday", time: "12:00 PM – 6:00 PM (By Appointment)" }
  ],
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.215582319208!2d77.21207857630718!3d28.5482329879796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce213d2f23697%3A0x6d8b28ef5dfc5e03!2sOPS%20Art%20Gallery!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
};
