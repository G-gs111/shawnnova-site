import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0c0e13",
          color: "#f6f8ff",
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.06em",
          width: "100%",
        }}
      >
        SN
      </div>
    ),
    size,
  );
}
