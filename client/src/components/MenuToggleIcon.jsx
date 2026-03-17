import React from "react";

export default function MenuToggleIcon({ open, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "transform 0.4s ease",
        transform: open ? "rotate(-45deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        style={{
          transition: "all 0.4s ease",
          strokeDasharray: open ? "20 300" : "12 63",
          strokeDashoffset: open ? "-32.42" : "0",
        }}
      />

      <path d="M7 16 27 16" />
    </svg>
  );
}
