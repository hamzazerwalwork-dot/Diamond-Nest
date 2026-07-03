"use client";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { id: "interior-wood-alternative", label: "بديل الخشب الداخلي", labelEn: "Interior Wood Alternative", icon: "🪵", gradient: "linear-gradient(135deg, #1a1810 0%, #2d2a18 60%, #1a1810 100%)", accent: "#C9A84C", desc: "حلول بديلة للخشب الطبيعي بجودة عالية وأسعار تنافسية" },
  { id: "paquet", label: "الباركيه", labelEn: "Parquet", icon: "🏠", gradient: "linear-gradient(135deg, #10181a 0%, #182428 60%, #10181a 100%)", accent: "#7EAFC9", desc: "أرضيات باركيه فاخرة بتصاميم متعددة تناسب كل ذوق" },
  { id: "shepherd-tv", label: "شيبورد و خلفيات التيفي", labelEn: "Shepherd-TV", icon: "📺", gradient: "linear-gradient(135deg, #12101a 0%, #201c2d 60%, #12101a 100%)", accent: "#A87EC9", desc: "تصاميم وحدات التلفزيون والمديا والجدران الخشبية المزخرفة" },
  { id: "wood-plastic-composite", label: " بديل الخشب الخارجي WPC", labelEn: "Wood Plastic Composite", icon: "🌿", gradient: "linear-gradient(135deg, #101810 0%, #1a2818 60%, #101810 100%)", accent: "#7EC987", desc: "مواد مركّبة بين الخشب والبلاستيك للاستخدام الداخلي والخارجي" },
];

export default function GalleryPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060810 0%, #0A0F1E 40%, #0C1228 70%, #060810 100%)",
      paddingTop: "var(--nav-h)", direction: "rtl", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", right: "5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="section-pad page-wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "100px", padding: "5px 16px", marginBottom: "1.2rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.78rem", fontFamily: "Cairo, sans-serif", letterSpacing: "0.08em" }}>كل ما نقدمه في مكان واحد</span>
          </div>
          <h1 className="amiri page-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--ivory)", marginBottom: "0.8rem" }}>معرض الأعمال</h1>
          <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "0.93rem" }}>اختر التصنيف لاستعراض الكتالوجات والأعمال السابقة</p>
        </div>

        {/* Category cards */}
        <div className="gallery-index-grid grid-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/gallery/${cat.id}`}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: "none", display: "block",
                borderRadius: "20px", overflow: "hidden",
                border: `1px solid rgba(201,168,76,${hovered === cat.id ? 0.45 : 0.15})`,
                transition: "all 0.35s ease",
                transform: hovered === cat.id ? "translateY(-7px)" : "translateY(0)",
                boxShadow: hovered === cat.id ? "0 20px 50px rgba(0,0,0,0.5)" : "0 4px 18px rgba(0,0,0,0.4)",
                background: cat.gradient,
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.3) 0px, rgba(201,168,76,0.3) 1px, transparent 1px, transparent 28px)" }} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${cat.accent}18 0%, transparent 70%)`, opacity: hovered === cat.id ? 1 : 0, transition: "opacity 0.4s ease" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", marginBottom: "1rem" }}>{cat.icon}</div>
                <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: "6px", background: `${cat.accent}18`, border: `1px solid ${cat.accent}40`, color: cat.accent, fontSize: "0.68rem", fontFamily: "Cairo, sans-serif", marginBottom: "0.7rem" }}>{cat.labelEn}</div>
                <h2 className="amiri" style={{ fontSize: "clamp(1.2rem, 3vw, 1.55rem)", color: "var(--ivory)", marginBottom: "0.6rem" }}>{cat.label}</h2>
                <p style={{ color: "rgba(232,228,220,0.6)", fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "clamp(0.82rem, 1.8vw, 0.9rem)", lineHeight: 1.7, marginBottom: "1.2rem" }}>{cat.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: cat.accent, fontFamily: "Cairo, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                  <span>استعرض الأعمال والكتالوجات</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
