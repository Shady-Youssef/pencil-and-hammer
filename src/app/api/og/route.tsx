import { ImageResponse } from "next/og";

import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

const imageSize = {
  width: 1200,
  height: 630,
};

const supportedOgLogoTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

function toBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

async function resolveOgLogoDataUrl(logoUrl: string, siteUrl: string) {
  const assetUrl = logoUrl.startsWith("http")
    ? logoUrl
    : absoluteUrl(logoUrl, siteUrl);

  try {
    const response = await fetch(assetUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type")?.split(";")[0]?.trim();

    if (!contentType || !supportedOgLogoTypes.has(contentType)) {
      return null;
    }

    const buffer = await response.arrayBuffer();

    if (!buffer.byteLength) {
      return null;
    }

    return `data:${contentType};base64,${toBase64(buffer)}`;
  } catch {
    return null;
  }
}

export async function GET() {
  const settings = await getSiteSettings();
  const ogLogoDataUrl = settings.logoUrl
    ? await resolveOgLogoDataUrl(settings.logoUrl, settings.siteUrl)
    : null;
  const initials = settings.siteName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #080605 0%, #1b1108 42%, #090807 100%)",
          color: "#f4ede5",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(210,162,74,0.35), transparent 30%), radial-gradient(circle at bottom left, rgba(210,162,74,0.12), transparent 35%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              fontSize: 28,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#d2a24a",
            }}
          >
            {ogLogoDataUrl ? (
              <img
                src={ogLogoDataUrl}
                alt=""
                width="74"
                height="74"
                style={{
                  display: "flex",
                  borderRadius: 18,
                  objectFit: "cover",
                  border: "1px solid rgba(244, 237, 229, 0.12)",
                  background: "rgba(255,255,255,0.02)",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 74,
                  height: 74,
                  borderRadius: 18,
                  border: "1px solid rgba(244, 237, 229, 0.12)",
                  background:
                    "linear-gradient(180deg, rgba(210,162,74,0.26) 0%, rgba(210,162,74,0.08) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  color: "#f4ede5",
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                {initials}
              </div>
            )}
            <div style={{ display: "flex" }}>{settings.ogKicker}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 600 }}>
              {settings.ogTitle}
            </div>
            <div
              style={{
                display: "flex",
                width: "76%",
                fontSize: 32,
                lineHeight: 1.4,
                color: "#d7c7b4",
                fontFamily: "sans-serif",
              }}
            >
              {settings.ogDescription}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#f4ede5",
            }}
          >
            <div style={{ display: "flex" }}>
              {settings.siteUrl.replace(/^https?:\/\//, "")}
            </div>
            <div style={{ display: "flex", color: "#d2a24a" }}>
              {settings.ogTagline}
            </div>
          </div>
        </div>
      </div>
    ),
    imageSize,
  );
}
