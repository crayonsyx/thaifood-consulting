import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ThaiFood Consulting";
  const subtitle =
    searchParams.get("subtitle") || "F&B Consulting with Michelin-Starred Experience";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#c4956a",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            ThaiFood Consulting
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#faf5f0",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a0998f",
              fontFamily: "sans-serif",
              maxWidth: "700px",
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              height: "3px",
              width: "80px",
              backgroundColor: "#c4956a",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
