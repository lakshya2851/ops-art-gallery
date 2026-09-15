import { NextRequest, NextResponse } from "next/server";
import { Artwork, ARTWORKS } from "@/data/artworks";

// In-memory serverless cache
let globalCustomArtworks: Artwork[] = [];
let globalDeletedIds: string[] = [];

export async function GET() {
  const combined = [...globalCustomArtworks, ...ARTWORKS];
  const activeArtworks = combined.filter((art) => !globalDeletedIds.includes(art.id));
  return NextResponse.json({ artworks: activeArtworks }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, artist, year, medium, dimensions, price, collection, description, imageSrc, altText } = body;

    if (!title || !artist || !imageSrc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let finalImageUrl = imageSrc;

    // If image is a base64 Data URL, upload to free ImgBB cloud storage for a permanent HTTPS URL
    if (imageSrc.startsWith("data:image")) {
      try {
        const base64Data = imageSrc.split(",")[1];
        const formData = new FormData();
        formData.append("image", base64Data);

        // Upload to ImgBB free API (using public key)
        const imgRes = await fetch("https://api.imgbb.com/1/upload?key=6d257f6977d64d8eacad148c18696a31", {
          method: "POST",
          body: formData,
        });

        if (imgRes.ok) {
          const imgJson = await imgRes.json();
          if (imgJson.data && imgJson.data.url) {
            finalImageUrl = imgJson.data.url;
          }
        }
      } catch (err) {
        console.error("ImgBB upload error, falling back to direct URL:", err);
      }
    }

    const newId = `cloud-art-${Date.now()}`;
    const newArtwork: Artwork = {
      id: newId,
      title,
      artist,
      year: Number(year) || new Date().getFullYear(),
      medium: medium || "Oil & Pigment on Linen",
      dimensions: dimensions || undefined,
      price: price || undefined,
      collection: collection || "OPS Gallery Archive",
      imageSrc: finalImageUrl,
      altText: altText || `${title} by ${artist}`,
      description: description || undefined,
    };

    // Store at top of global custom artworks array
    globalCustomArtworks.unshift(newArtwork);

    const combined = [...globalCustomArtworks, ...ARTWORKS];
    const activeArtworks = combined.filter((art) => !globalDeletedIds.includes(art.id));

    return NextResponse.json({ success: true, artwork: newArtwork, artworks: activeArtworks });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing artwork ID" }, { status: 400 });
    }

    // Remove from global custom array
    globalCustomArtworks = globalCustomArtworks.filter((item) => item.id !== id);

    // Track in global deleted IDs
    if (!globalDeletedIds.includes(id)) {
      globalDeletedIds.push(id);
    }

    const combined = [...globalCustomArtworks, ...ARTWORKS];
    const activeArtworks = combined.filter((art) => !globalDeletedIds.includes(art.id));

    return NextResponse.json({ success: true, id, artworks: activeArtworks });
  } catch (error) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}
