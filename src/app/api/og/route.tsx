import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export const runtime = "nodejs";

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

function toBase64(buffer: ArrayBuffer | Uint8Array) {
  let binary = "";
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function detectImageType(bytes: Uint8Array) {
  if (bytes.length >= 12) {
    const riff = String.fromCharCode(...bytes.slice(0, 4));
    const webp = String.fromCharCode(...bytes.slice(8, 12));

    if (riff === "RIFF" && webp === "WEBP") {
      return "image/webp";
    }
  }

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (bytes.length >= 6) {
    const gif = String.fromCharCode(...bytes.slice(0, 6));

    if (gif === "GIF87a" || gif === "GIF89a") {
      return "image/gif";
    }
  }

  const textPrefix = new TextDecoder().decode(bytes.slice(0, 256)).trimStart();

  if (textPrefix.startsWith("<svg") || textPrefix.startsWith("<?xml")) {
    return "image/svg+xml";
  }

  return null;
}

async function readLocalAssetDataUrl(assetPath: string) {
  const filePath = path.join(process.cwd(), "public", assetPath.replace(/^\/+/, ""));
  const bytes = await readFile(filePath);
  const contentType = detectImageType(bytes);

  if (!contentType || !supportedOgLogoTypes.has(contentType)) {
    return null;
  }

  return `data:${contentType};base64,${toBase64(bytes)}`;
}

async function fetchRemoteAssetDataUrl(assetUrl: string) {
  const response = await fetch(assetUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(2500),
  });

  if (!response.ok) {
    return null;
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const contentType = detectImageType(bytes);

  if (!contentType || !supportedOgLogoTypes.has(contentType)) {
    return null;
  }

  return `data:${contentType};base64,${toBase64(bytes)}`;
}

async function resolveOgLogoDataUrl(logoUrl: string, siteUrl: string) {
  if (!logoUrl) {
    return null;
  }

  try {
    if (logoUrl.startsWith("data:image/")) {
      return logoUrl;
    }

    if (logoUrl.startsWith("/")) {
      return await readLocalAssetDataUrl(logoUrl);
    }

    const assetUrl = logoUrl.startsWith("http")
      ? logoUrl
      : absoluteUrl(logoUrl, siteUrl);

    return await fetchRemoteAssetDataUrl(assetUrl);
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
