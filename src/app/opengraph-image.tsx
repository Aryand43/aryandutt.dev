import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}, ${siteConfig.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card, generated at build time to match the site's monochrome system. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101114",
          padding: "80px",
          color: "#f7f7f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#8b8d94" }}>
          {siteConfig.url.replace("https://", "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, letterSpacing: "-0.035em" }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#b4b6bd" }}>
            {siteConfig.positioning}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8b8d94" }}>
          Scientific ML, LLM safety, low latency systems
        </div>
      </div>
    ),
    size,
  );
}
