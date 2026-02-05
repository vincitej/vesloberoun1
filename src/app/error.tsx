"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1f",
          color: "#f8fafc",
          padding: "24px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Něco se pokazilo</h1>
          <p style={{ opacity: 0.85, lineHeight: 1.6, marginBottom: 16 }}>
            Došlo k chybě při vykreslování stránky. Ostatní stránky zůstávají k dispozici.
          </p>
          <pre
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: 12,
              borderRadius: 12,
              overflowX: "auto",
              fontSize: 12,
              lineHeight: 1.5,
              marginBottom: 16,
              border: "1px solid rgba(255,255,255,0.08)",
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
                border: "1px solid rgba(255,255,255,0.2)",
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
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
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
      </body>
    </html>
  );
}
