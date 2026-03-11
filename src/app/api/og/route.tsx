import { ImageResponse } from "next/og";

import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

const imageSize = {
  width: 1200,
  height: 630,
};

export async function GET() {
  const settings = await getSiteSettings();
  const logoUrl = settings.logoUrl.startsWith("http")
    ? settings.logoUrl
    : absoluteUrl(settings.logoUrl, settings.siteUrl);

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
              gap: "18px",
              fontSize: 28,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#d2a24a",
            }}
          >
            {settings.logoUrl ? (
              <img
                src={logoUrl}
                alt=""
                width="70"
                height="70"
                style={{
                  borderRadius: "999px",
                  objectFit: "cover",
                  border: "1px solid rgba(244, 237, 229, 0.12)",
                }}
              />
            ) : null}
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
