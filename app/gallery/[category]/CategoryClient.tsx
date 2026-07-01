"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Tab = "work" | "catalog";

const categoryMeta: Record<string, { label: string; labelEn: string; icon: string; accent: string; bg: string }> = {
  "interior-wood-alternative": { label: "بديل الخشب الداخلي", labelEn: "Interior Wood Alternative", icon: "🪵", accent: "#C9A84C", bg: "linear-gradient(135deg, #080806 0%, #0f0d08 40%, #14110a 100%)" },
  "paquet":                    { label: "الباركيه",             labelEn: "Parquet",                  icon: "🏠", accent: "#7EAFC9", bg: "linear-gradient(135deg, #060d10 0%, #0a1418 40%, #0d1c22 100%)" },
  "shepherd-tv":               { label: "شيبورد و خلفيات التيفي",             labelEn: "Shepherd-TV",              icon: "📺", accent: "#A87EC9", bg: "linear-gradient(135deg, #090610 0%, #100c1a 40%, #15102a 100%)" },
  "wood-plastic-composite":    { label: "بديل خشب خارجي", labelEn: "Wood Plastic Composite", icon: "🌿", accent: "#7EC987", bg: "linear-gradient(135deg, #060a06 0%, #0a100a 40%, #0d160d 100%)" },
};

interface Props { category: string; catalogFiles: string[]; workImages: string[]; }

export default function CategoryClient({ category, catalogFiles, workImages }: Props) {
  const meta = categoryMeta[category];
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null || workImages.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")  setLightbox(i => i === null ? null : (i + 1) % workImages.length);
      if (e.key === "ArrowRight") setLightbox(i => i === null ? null : (i - 1 + workImages.length) % workImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, workImages.length]);

  if (!meta) {
    return (
      <main style={{ minHeight: "100vh", paddingTop: "var(--nav-h)", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
        <div style={{ textAlign: "center" }}>
          <p className="amiri" style={{ fontSize: "2rem", color: "var(--ivory)", marginBottom: "1rem" }}>الصفحة غير موجودة</p>
          <Link href="/gallery" style={{ color: "var(--gold)", fontFamily: "Cairo, sans-serif" }}>العودة للمعرض</Link>
        </div>
      </main>
    );
  }

  const imgPath  = (f: string) => `/gallery/${category}/our-past-work/${f}`;
  const pdfPath  = (f: string) => `/gallery/${category}/catalogs/${f}`;

  return (
    <main style={{ minHeight: "100vh", background: meta.bg, paddingTop: "var(--nav-h)", direction: "rtl", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "min(450px,55vw)", height: "min(450px,55vw)", borderRadius: "50%", background: `radial-gradient(circle, ${meta.accent}0D 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <div className="section-pad page-wrap" style={{ position: "relative", zIndex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.8rem", flexWrap: "wrap" }}>
          <Link href="/gallery" style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            معرض الأعمال
          </Link>
          <span style={{ color: "rgba(201,168,76,0.35)" }}>/</span>
          <span style={{ color: meta.accent, fontFamily: "Cairo, sans-serif", fontSize: "0.85rem" }}>{meta.label}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}>{meta.icon}</span>
            <div>
              <div style={{ color: meta.accent, fontSize: "0.72rem", fontFamily: "Cairo, sans-serif", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{meta.labelEn}</div>
              <h1 className="amiri page-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "var(--ivory)" }}>{meta.label}</h1>
            </div>
          </div>
          <div style={{ width: 80, height: 2, background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)` }} />
        </div>

        {/* Tabs */}
        <div className="tab-switcher" style={{ marginBottom: "2rem" }}>
          <div className="glass" style={{ display: "inline-flex", borderRadius: "14px", padding: "5px", gap: "5px" }}>
            {([
              { key: "work" as Tab,    label: `أعمالنا السابقة (${workImages.length})`, icon: "◆" },
              { key: "catalog" as Tab, label: `الكتالوجات (${catalogFiles.length})`,      icon: "📋" },
            ]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "10px clamp(14px,3vw,22px)", borderRadius: "10px", border: "none",
                cursor: "pointer", fontFamily: "Cairo, sans-serif",
                fontWeight: 600, fontSize: "clamp(0.82rem,2.5vw,0.92rem)",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
                background: activeTab === tab.key ? `linear-gradient(135deg, ${meta.accent}, ${meta.accent}CC)` : "transparent",
                color: activeTab === tab.key ? "#0A0F1E" : "var(--text-muted)",
                boxShadow: activeTab === tab.key ? `0 4px 18px ${meta.accent}50` : "none",
                minHeight: "44px",
              }}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ OUR PAST WORK ══ */}
        {activeTab === "work" && (
          workImages.length > 0 ? (
            <>
              {/* Instructions hint */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: `rgba(${meta.accent === "#C9A84C" ? "201,168,76" : "126,175,201"},0.08)`,
                border: `1px solid ${meta.accent}30`,
                borderRadius: "10px", padding: "10px 16px",
                marginBottom: "1.5rem", color: "var(--text-muted)",
                fontFamily: "Cairo, sans-serif", fontSize: "0.82rem",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={meta.accent} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                اضغط على أي صورة لتكبيرها · اضغط ← → للتنقل بين الصور
              </div>

              {/* Photo Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 45vw), 1fr))",
                gap: "clamp(0.5rem, 2vw, 1rem)",
              }}>
                {workImages.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setLightbox(idx)}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      border: `1px solid ${meta.accent}${hovered === idx ? "55" : "18"}`,
                      borderRadius: "12px", overflow: "hidden",
                      cursor: "pointer", padding: 0, background: "rgba(255,255,255,0.03)",
                      aspectRatio: "1/1", position: "relative",
                      transition: "all 0.3s ease",
                      transform: hovered === idx ? "scale(1.04)" : "scale(1)",
                      boxShadow: hovered === idx ? `0 12px 30px rgba(0,0,0,0.5)` : "none",
                    }}
                  >
                    <Image src={imgPath(img)} alt={`${meta.label} - ${idx + 1}`} fill
                      sizes="(max-width:640px) 45vw, (max-width:900px) 30vw, 200px"
                      style={{ objectFit: "cover" }} loading="lazy"
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)",
                      opacity: hovered === idx ? 1 : 0, transition: "opacity 0.3s ease",
                    }} />
                    {hovered === idx && (
                      <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="glass" style={{
              borderRadius: "20px", padding: "clamp(3rem,8vw,5rem) 2rem",
              textAlign: "center", border: "2px dashed rgba(201,168,76,0.2)",
              background: "rgba(201,168,76,0.02)",
            }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1.2rem" }}>📁</div>
              <h3 className="amiri" style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", color: "var(--ivory)", marginBottom: "0.6rem" }}>
                لا توجد صور بعد
              </h3>
              <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.9 }}>
                لإضافة صور أعمالك، ضع ملفات{" "}
                <span style={{ color: meta.accent }}>PNG / JPG</span>{" "}
                داخل المجلد:<br />
                <code style={{ color: meta.accent, fontSize: "0.82rem" }}>
                  public/gallery/{category}/our-past-work/
                </code>
                <br />ثم شغّل <code style={{ color: meta.accent }}>npm run build</code>
              </p>
            </div>
          )
        )}

        {/* ══ CATALOGS ══ */}
        {activeTab === "catalog" && (
          <div>
            {catalogFiles.length > 0 ? (
              <div className="catalog-grid grid-3">
                {catalogFiles.map((file, idx) => (
                  <a key={file} href={pdfPath(file)} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(idx + 200)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      textDecoration: "none", display: "flex", flexDirection: "column",
                      borderRadius: "18px",
                      border: `1px solid ${meta.accent}${hovered === idx+200 ? "66" : "22"}`,
                      transition: "all 0.3s ease",
                      transform: hovered === idx+200 ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: hovered === idx+200 ? "0 16px 45px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.3)",
                      background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)",
                      padding: "clamp(1.4rem,3vw,2rem)", cursor: "pointer", minHeight: "160px",
                    }}
                  >
                    <div style={{
                      width: 50, height: 50, borderRadius: "13px",
                      background: `${meta.accent}18`, border: `1px solid ${meta.accent}33`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "1rem", fontSize: "1.5rem", flexShrink: 0,
                    }}>📄</div>
                    <h3 className="amiri" style={{ fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "var(--ivory)", marginBottom: "0.3rem", lineHeight: 1.5, flex: 1 }}>
                      كتالوج {meta.label}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontSize: "0.78rem", marginBottom: "1rem" }}>{file}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.9rem", borderTop: `1px solid ${meta.accent}18` }}>
                      <span style={{ color: meta.accent, fontSize: "0.8rem", fontFamily: "Cairo, sans-serif", fontWeight: 500 }}>عرض</span>
                      <div style={{
                        width: 32, height: 32, borderRadius: "8px",
                        background: hovered === idx+200 ? `linear-gradient(135deg, ${meta.accent}, ${meta.accent}BB)` : `${meta.accent}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hovered === idx+200 ? "#0A0F1E" : meta.accent} strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="glass" style={{ borderRadius: "18px", padding: "clamp(2.5rem,6vw,4rem) 2rem", textAlign: "center", border: "2px dashed rgba(201,168,76,0.2)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
                <h3 className="amiri" style={{ fontSize: "clamp(1.1rem,3vw,1.3rem)", color: "var(--ivory)", marginBottom: "0.5rem" }}>لا توجد كتالوجات حالياً</h3>
                <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.9 }}>
                  ضع ملفات PDF في:{" "}
                  <code style={{ color: meta.accent, fontSize: "0.8rem" }}>public/gallery/{category}/catalogs/</code>
                  <br />ثم شغّل <code style={{ color: meta.accent }}>npm run build</code>
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="glass" style={{
              marginTop: "1.8rem", borderRadius: "16px", padding: "clamp(1.8rem,4vw,2.5rem)",
              textAlign: "center", background: `linear-gradient(135deg, ${meta.accent}08, rgba(200,216,255,0.02))`,
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>✨</div>
              <h3 className="amiri" style={{ fontSize: "clamp(1.1rem,3vw,1.2rem)", color: "var(--ivory)", marginBottom: "0.4rem" }}>هل تريد عرض سعر مخصص؟</h3>
              <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontWeight: 300, marginBottom: "1.3rem", fontSize: "0.87rem" }}>تواصل معنا عبر إنستغرام</p>
              <a href="https://www.instagram.com/diamond_nest2030?igsh=Z3Q5NXg3b3ViNWFn" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: `linear-gradient(135deg, ${meta.accent}, ${meta.accent}CC)`,
                  color: "#0A0F1E", fontFamily: "Cairo, sans-serif",
                  fontWeight: 700, fontSize: "0.9rem",
                  padding: "11px 24px", borderRadius: "10px", textDecoration: "none",
                  boxShadow: `0 6px 22px ${meta.accent}40`, minHeight: "44px",
                }}>
                تواصل معنا
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ══ LIGHTBOX ══ */}
      {lightbox !== null && workImages.length > 0 && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(5,7,14,0.96)", display: "flex",
          alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)", padding: "1rem",
        }}>
          {/* Close */}
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} style={{
            position: "absolute", top: "1.2rem", left: "1.2rem", zIndex: 10,
            width: 42, height: 42, borderRadius: "10px",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Counter */}
          <div style={{
            position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 10,
            padding: "8px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            color: "white", fontFamily: "Cairo, sans-serif", fontSize: "0.85rem",
          }}>
            {lightbox + 1} / {workImages.length}
          </div>

          {/* Prev */}
          {workImages.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + workImages.length) % workImages.length); }} style={{
              position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              width: 46, height: 46, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}

          {/* Next */}
          {workImages.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % workImages.length); }} style={{
              position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              width: 46, height: 46, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(900px,90vw)", height: "min(80vh,90vw)" }}>
            <Image src={imgPath(workImages[lightbox])} alt={`${meta.label} ${lightbox + 1}`} fill
              sizes="90vw" style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
