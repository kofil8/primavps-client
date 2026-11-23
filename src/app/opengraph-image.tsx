import { ImageResponse } from "next/og";

export const alt =
  "primavps — survey VPS and clean residential ISP IPs in Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #172554 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#2563eb",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            primavps
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(96,165,250,0.45)",
              background: "rgba(37,99,235,0.18)",
              color: "#93c5fd",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Survey VPS · Bangladesh
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Clean residential ISP IPs for survey work
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 880 }}>
            AT&amp;T · Comcast · Verizon · BT — Windows 11 RDP from BDT 2,999/mo,
            paid with bKash or Nagad.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22 }}>
          {["IPQS 0/100 clean IP", "90-second setup", "7-day IP swap"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(148,163,184,0.35)",
                  color: "#e2e8f0",
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
