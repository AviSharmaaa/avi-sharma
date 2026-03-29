import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avi Sharma — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C0A08",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Cormorant Garamond, Georgia, serif",
        }}
      >
        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            PORTFOLIO
          </span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, #DC143C, #D4AF37)" }} />
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "96px", fontWeight: "700", fontStyle: "italic", color: "#D4AF37", lineHeight: 0.9, letterSpacing: "-2px" }}>
            Avi Sharma
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#DC143C", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            SDE 2 · Questt AI
          </div>
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", marginTop: "8px", maxWidth: "640px", lineHeight: 1.6 }}>
            Building fast, thoughtful products across React, Next.js, Golang, Flutter & AWS.
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px", letterSpacing: "0.2em" }}>
            www.avisharma.xyz
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            {["React", "Next.js", "Golang", "Flutter", "AWS"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "6px 14px",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
