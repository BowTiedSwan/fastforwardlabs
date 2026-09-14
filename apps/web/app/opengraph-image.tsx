import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { services } from "@/lib/services";
import { homeContent, site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = "Fast Forward Labs — Put AI to work in your business. AI advisory, automation, training, and content systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Like nnn-site's front-page card, render real site content at build time.
// Local fonts and the shared SVG keep image generation independent of remote services.
export default async function Image() {
  const [logo, regular, semibold, mono] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.svg")),
    readFile(join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff")),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f2f1ec", color: "#121212", fontFamily: "IBM Plex Sans" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 88, padding: "0 48px", borderBottom: "1px solid #d8d7d1" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* ImageResponse requires a native img, not next/image. */}
          <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} alt="" width={48} height={32} />
          <span style={{ fontFamily: "IBM Plex Mono", fontSize: 19, letterSpacing: 4 }}>{site.name.toUpperCase()}</span>
        </div>
        <span style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: "#62605a", letterSpacing: 1 }}>ADVISE / BUILD / TRAIN</span>
      </div>

      <div style={{ display: "flex", flex: 1, padding: "38px 48px 32px", gap: 38 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 736 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ display: "flex", width: 8, height: 8, background: "#bd3e0d" }} />
            <span style={{ fontFamily: "IBM Plex Mono", fontSize: 12, letterSpacing: 2, color: "#62605a" }}>{homeContent.eyebrow.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1.02, letterSpacing: -4.5, fontWeight: 600 }}>
            <span>{homeContent.headline[0]}</span>
            <div style={{ display: "flex" }}>{homeContent.headline[1]}<span style={{ color: "#bd3e0d" }}>.</span></div>
          </div>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: "#62605a", maxWidth: 690, margin: "24px 0 0" }}>{homeContent.introduction}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 330, paddingLeft: 28, borderLeft: "2px solid #bd3e0d" }}>
          <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11, letterSpacing: 2, color: "#62605a", marginBottom: 18 }}>SOUND FAMILIAR?</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 30, fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.8 }}>
            <span>You’ve tried the tools.</span>
            <span>The work still piles up.</span>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#62605a", margin: "20px 0 0" }}>The missed follow-up. The weekly report. The content backlog.</p>
          <div style={{ display: "flex", marginTop: 24, paddingTop: 18, borderTop: "1px solid #d8d7d1", fontSize: 17, color: "#62605a" }}>A clear scope. A useful outcome.</div>
        </div>
      </div>

      <div style={{ display: "flex", margin: "0 48px", borderTop: "1px solid #d8d7d1", padding: "22px 0 28px" }}>
        {services.map((service) => (
          <div key={service.slug} style={{ display: "flex", flexDirection: "column", flex: 1, gap: 8, paddingRight: 12 }}>
            <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11, letterSpacing: 2, color: "#bd3e0d" }}>/{service.number}</span>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4 }}>{service.name}</span>
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "IBM Plex Sans", data: regular, weight: 400, style: "normal" },
        { name: "IBM Plex Sans", data: semibold, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
