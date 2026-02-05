"use client";

import React from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          width: "100%",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
          Chyba v administraci
        </h1>
        <p style={{ color: "#334155", lineHeight: 1.6, marginBottom: 16 }}>
          Došlo k chybě při načítání této části administrace. Ostatní části
          zůstanou funkční.
        </p>
        <pre
          style={{
            background: "#f8fafc",
            padding: 12,
            borderRadius: 10,
            overflowX: "auto",
            fontSize: 12,
            lineHeight: 1.5,
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            marginBottom: 16,
          }}
        >
          {error?.message}
        </pre>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
              flex: 1,
            }}
          >
            Zkusit znovu
          </button>
          <a
            href="/"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              background: "#f1f5f9",
              color: "#0f172a",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: 600,
              flex: 1,
            }}
          >
            Domů
          </a>
        </div>
      </div>
    </div>
  );
}
