"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.35, speedY: -(Math.random() * 0.5 + 0.15),
      opacity: Math.random(), fadeSpeed: Math.random() * 0.007 + 0.003,
    }));
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`; ctx.fill();
        p.x += p.speedX; p.y += p.speedY; p.opacity -= p.fadeSpeed;
        if (p.opacity <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 10;
          p.opacity = Math.random() * 0.7 + 0.2; p.size = Math.random() * 2 + 0.5;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <main>
      {/* ══ HERO ══ */}
      <section style={{
        minHeight: "100vh", position: "relative", display: "flex",
        alignItems: "center", overflow: "hidden",
        background: "linear-gradient(135deg, #050810 0%, #0A0F1E 40%, #0F1528 70%, #0A0C18 100%)",
      }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />

        {/* Floating diamonds — hidden on mobile via .bg-diamonds class */}
        <div className="bg-diamonds" style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: `${70 + i * 55}px`, height: `${70 + i * 55}px`,
              border: `1px solid rgba(201,168,76,${0.055 - i * 0.008})`,
              transform: "rotate(45deg)",
              top: `${[10, 60, 15, 70, 40][i]}%`, left: `${[5, 78, 42, 12, 68][i]}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </div>

        {/* Radial glow */}
        <div style={{
          position: "absolute", right: "50%", top: "50%",
          transform: "translate(50%,-50%)",
          width: "clamp(280px, 50vw, 580px)", height: "clamp(280px, 50vw, 580px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          zIndex: 1, pointerEvents: "none",
        }} />

        {/* Content */}
        <div
          className="hero-grid page-wrap"
          style={{
            position: "relative", zIndex: 2,
            display: "grid",
            padding: "calc(var(--nav-h) + 2.5rem) 1.5rem 3rem",
            direction: "rtl",
          }}
        >
          {/* ── Text ── */}
          <div className="hero-text fade-in">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "1.4rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
              <span style={{ color: "var(--gold)", fontSize: "0.78rem", fontFamily: "Cairo, sans-serif", letterSpacing: "0.08em" }}>
                خبراء التصميم الداخلي الفاخر
              </span>
            </div>

            <h1 className="amiri page-title" style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              lineHeight: 1.45, marginBottom: "1.2rem", color: "var(--ivory)",
            }}>
              نحوّل مساحتك إلى{" "}
              <span className="gold-text">تحفة فنية</span>
              {" "}لا تُنسى
            </h1>

            <p style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 2, color: "rgba(232,228,220,0.75)",
              marginBottom: "2rem", fontFamily: "Cairo, sans-serif", fontWeight: 300,
              maxWidth: 480,
            }}>
              في Diamond Nest نقدم حلول ديكور داخلي متكاملة تجمع بين الفخامة والأناقة، لتعكس شخصيتك وتُعبّر عن ذوقك الرفيع في كل زاوية.
            </p>

            {/* Phone Numbers */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {["+966 56 577 4098", "+966 56 604 3115"].map((phone, i) => (
                <a key={i} href={`tel:${phone}`} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "10px", padding: "10px 18px",
                  color: "var(--gold)", textDecoration: "none",
                  fontFamily: "Cairo, sans-serif", fontWeight: 600,
                  fontSize: "0.95rem", direction: "ltr",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.18)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13 19.79 19.79 0 0 1 1.93 4.4 2 2 0 0 1 3.9 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {phone}
                </a>
              ))}
            </div>

            <div className="cta-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/gallery" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                color: "#0A0F1E", fontFamily: "Cairo, sans-serif",
                fontWeight: 700, fontSize: "0.95rem",
                padding: "13px 28px", borderRadius: "12px", textDecoration: "none",
                boxShadow: "0 8px 28px rgba(201,168,76,0.35)", minHeight: "48px",
                transition: "all 0.3s ease",
              }}>
                استعرض أعمالنا
              </Link>
              <Link href="/about" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "transparent", color: "var(--gold)",
                fontFamily: "Cairo, sans-serif", fontWeight: 600, fontSize: "0.95rem",
                padding: "13px 28px", borderRadius: "12px", textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.4)", minHeight: "48px",
                transition: "all 0.3s ease",
              }}>
                تعرّف علينا
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-row" style={{
              display: "flex", gap: "2rem", flexWrap: "wrap",
              marginTop: "2.5rem", paddingTop: "2rem",
              borderTop: "1px solid rgba(201,168,76,0.15)",
            }}>
              {[
                { num: "+٢٠٠", label: "مشروع منجز" },
                { num: "+٥", label: "سنوات خبرة" },
                { num: "١٠٠٪", label: "رضا العملاء" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="amiri gold-text stat-num" style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 700 }}>{s.num}</div>
                  <div className="stat-label" style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "Cairo, sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Logo ── */}
          <div className="hero-logo" style={{ display: "flex", justifyContent: "center", alignItems: "center", animation: "float 5s ease-in-out infinite" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)" }} />
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute", width: 7, height: 7, background: "var(--gold)",
                  clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                  top: `${[0, 22, 80, 60][i]}%`, left: `${[70, 0, 80, 10][i]}%`,
                  animation: `sparkle ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }} />
              ))}
              <Image src="/logo.png" alt="Diamond Nest" width={380} height={380}
                style={{ objectFit: "contain", filter: "drop-shadow(0 18px 50px rgba(201,168,76,0.4))", position: "relative", zIndex: 1, maxWidth: "min(380px, 65vw)", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          color: "rgba(201,168,76,0.45)", fontSize: "0.68rem", fontFamily: "Cairo, sans-serif",
          animation: "fadeInUp 1s 1.5s ease both",
        }}>
          <span>مرر للأسفل</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)" }} />
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0D1220 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.04), transparent)", pointerEvents: "none" }} />
        <div className="section-pad page-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="amiri section-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", color: "var(--ivory)" }}>
              لماذا <span className="gold-text">Diamond Nest</span>؟
            </h2>
            <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "1rem auto" }} />
          </div>
          <div className="grid-3">
            {[
              { icon: "◆", title: "تصميم فريد", desc: "نصمم لك مساحة لا تشبه أي مكان آخر، تعكس هويتك وتُبهر كل من يزورك." },
              { icon: "✦", title: "جودة لا تُضاهى", desc: "نختار أجود المواد وأرقى التشطيبات لضمان نتيجة تدوم وتبهر عبر السنين." },
              { icon: "❋", title: "فريق متخصص", desc: "مصممون وحرفيون من أصحاب الخبرة العميقة يرافقونك من الفكرة حتى التسليم." },
            ].map((f) => (
              <div key={f.title} className="glass" style={{ padding: "2rem 1.6rem", borderRadius: "18px", textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", color: "var(--gold)", marginBottom: "0.9rem" }}>{f.icon}</div>
                <h3 className="amiri" style={{ fontSize: "1.2rem", color: "var(--ivory)", marginBottom: "0.7rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "0.9rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
