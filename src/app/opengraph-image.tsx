import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}, ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE = "#16181c";
const INK = "#f5f4f1";
const MUTED = "#a8adb5";
const FAINT = "#767c86";
const ACCENT = "#5cc8f0";
const LINE = "#2b2f36";

/** Social card, generated at build time to match the site's visual system. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BASE,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        {/* Status strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            borderBottom: `1px solid ${LINE}`,
            padding: "24px 64px",
            fontSize: 20,
            letterSpacing: 2,
            color: FAINT,
          }}
        >
          <span>{`${siteConfig.name.toUpperCase()} / SINGAPORE`}</span>
          <span style={{ marginLeft: "auto", color: ACCENT }}>
            ● AVAILABLE
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 64px",
          }}
        >
          <div style={{ fontSize: 62, lineHeight: 1.1, letterSpacing: -2 }}>
            I build reliable systems at the
          </div>
          <div style={{ fontSize: 62, lineHeight: 1.1, letterSpacing: -2 }}>
            edge of research and performance.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: MUTED }}>
            {`${siteConfig.role} · Low-latency systems, scientific ML, LLM safety`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            borderTop: `1px solid ${LINE}`,
            padding: "24px 64px",
            fontSize: 20,
            color: FAINT,
          }}
        >
          <span>MIT JULIA LAB</span>
          <span>INTERSYSTEMS</span>
          <span>NTU CCDS</span>
          <span style={{ marginLeft: "auto", color: MUTED }}>
            {siteConfig.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
