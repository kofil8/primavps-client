import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #2563EB 0%, #1D4ED8 55%, #3730A3 100%)",
      }}
    >
      <svg
        width="156"
        height="156"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.5H17.5A7.75 7.75 0 0 1 17.5 21H12V25.25A1.25 1.25 0 0 1 10.75 26.5H10A1.25 1.25 0 0 1 8.75 25.25V8.75L12 5.5ZM12 8.75V17.75H17.5A4.5 4.5 0 0 0 17.5 8.75H12Z"
          fill="#FFFFFF"
        />
        <circle cx="17.5" cy="13.25" r="2.25" fill="#67E8F9" />
      </svg>
    </div>,
    { ...size },
  );
}
