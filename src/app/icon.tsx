import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram favicon, matching the site's accent. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16181c",
          color: "#5cc8f0",
          fontSize: 19,
          fontWeight: 600,
          fontFamily: "monospace",
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        AD
      </div>
    ),
    size,
  );
}
