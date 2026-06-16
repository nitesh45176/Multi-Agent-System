"use client"
import api from "@/lib/api";
import { useState } from "react";

type ResearchResponse = {
  search_results: string;
  report: string;
  feedback: string;
}

function SectionCard({ label, icon, content }: { label: string; icon: string; content: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "28px 32px",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <span style={{ fontSize: "18px" }}>{icon}</span>
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#60a5fa",
          fontFamily: "monospace",
        }}>{label}</span>
      </div>
      <p style={{
        color: "#cbd5e1",
        fontSize: "15px",
        lineHeight: "1.8",
        fontFamily: "'Inter', system-ui, sans-serif",
        whiteSpace: "pre-wrap",
      }}>{content}</p>
    </div>
  );
}

export default function Home() {
  const [topic, setTopic] = useState("")
  const [data, setData] = useState<ResearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleResearch() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const result = await api.post("/research", { topic });
      setData(result.data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a0f1e 100%)",
      color: "#f1f5f9",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* Top nav bar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        background: "rgba(10,15,30,0.85)",
        backdropFilter: "blur(20px)",
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em" }}>ResearchAI</span>
        </div>
        <div style={{
          display: "flex", gap: "8px",
          fontSize: "12px", color: "#64748b",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-block",
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: loading ? "#f59e0b" : "#f59e0b", // Changed to amber to reflect demo/offline state
            boxShadow: loading ? "0 0 8px #f59e0b" : "0 0 8px #f59e0b",
          }} />
          {loading ? "Running agents..." : "Demo Mode / Offline"}
        </div>
      </nav>

      {/* Backend Status Notice Banner */}
      <div style={{
        background: "rgba(245, 158, 11, 0.06)",
        borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
        padding: "12px 24px",
        textAlign: "center",
        fontSize: "13px",
        color: "#fde047",
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}>
        <span>⚠️</span>
        <span><strong>Frontend UI Demo Only:</strong> The AI backend agents are not yet deployed. Submitting queries will result in an error.</span>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: "999px",
            padding: "6px 16px",
            fontSize: "12px",
            color: "#93c5fd",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "24px",
          }}>Multi-Agent AI System</div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "20px",
            background: "linear-gradient(135deg, #f1f5f9 30%, #94a3b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Research anything.<br />Instantly.
          </h1>

          <p style={{
            color: "#64748b",
            fontSize: "17px",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Autonomous agents search, scrape, summarize, and critique — delivering structured research in seconds.
          </p>
        </div>

        {/* Search bar */}
        <div style={{
          position: "relative",
          display: "flex",
          gap: "12px",
          alignItems: "stretch",
          marginBottom: "48px",
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleResearch()}
              placeholder="e.g. The future of quantum computing"
              style={{
                width: "100%",
                padding: "18px 24px",
                fontSize: "16px",
                background: "rgba(255,255,255,0.05)",
                border: loading
                  ? "1px solid rgba(59,130,246,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#f1f5f9",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                boxShadow: loading ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
              }}
            />
            {/* Scanning line animation */}
            {loading && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                borderRadius: "0 0 12px 12px",
                animation: "scan 1.4s ease-in-out infinite",
                width: "40%",
              }} />
            )}
          </div>

          <button
            onClick={handleResearch}
            disabled={loading || !topic.trim()}
            style={{
              padding: "18px 32px",
              background: loading
                ? "rgba(59,130,246,0.3)"
                : "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: loading || !topic.trim() ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              opacity: !topic.trim() && !loading ? 0.5 : 1,
              transition: "all 0.2s",
              letterSpacing: "-0.01em",
            }}
          >
            {loading ? "Researching..." : "Run Research →"}
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "40px",
          }}>
            {["🔍 Searching the web...", "🤖 Scraping sources...", "📝 Generating report...", "🧠 Running critic agent..."].map((step, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                animation: `fadeIn 0.4s ease ${i * 0.15}s both`,
              }}>
                <div style={{
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  background: "#3b82f6",
                  animation: "pulse 1s ease infinite",
                  animationDelay: `${i * 0.2}s`,
                }} />
                <span style={{ fontSize: "14px", color: "#94a3b8" }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            padding: "16px 20px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "10px",
            color: "#fca5a5",
            fontSize: "14px",
            marginBottom: "32px",
          }}>
            {error}
            <div style={{ marginTop: "4px", fontSize: "12px", color: "#f87171", opacity: 0.8 }}>
              (Note: This is expected because the backend service is currently offline)
            </div>
          </div>
        )}

        {/* Results */}
        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              fontSize: "12px",
              color: "#475569",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "4px",
            }}>Research complete · 3 agents ran</div>

            <SectionCard
              icon="🔍"
              label="Search Results"
              content={data.search_results}
            />
            <SectionCard
              icon="📄"
              label="Generated Report"
              content={data.report}
            />
            <SectionCard
              icon="🧠"
              label="Critic Feedback"
              content={data.feedback}
            />
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        input::placeholder { color: #475569; }

        @keyframes scan {
          0% { left: 0%; }
          50% { left: 60%; }
          100% { left: 0%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}