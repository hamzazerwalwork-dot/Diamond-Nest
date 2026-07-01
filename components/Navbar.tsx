"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/gallery", label: "معرض الأعمال" },
];

const socials = [
  {
    href: "https://www.instagram.com/diamond_nest2030?igsh=Z3Q5NXg3b3ViNWFn",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/diamond.decor.2025",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: "https://www.google.com/maps/place/%D9%85%D8%B4%D8%B1%D9%81%D8%A9+%D8%B9%D9%86%D8%AF+%D9%85%D8%B1%D9%83%D8%B2+%D8%AF%D9%8A%D9%8A%E2%80%AD/@21.5445302,39.197864,17z",
    label: "موقعنا",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000,
        height: "var(--nav-h)",
        background: scrolled ? "rgba(10,15,30,0.97)" : "rgba(10,15,30,0.70)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
        transition: "background 0.4s ease",
        display: "flex", alignItems: "center",
        padding: "0 1.5rem",
      }}>
        {/* ── Logo ── */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
          <Image src="/logo.png" alt="Diamond Nest" width={46} height={46} style={{ objectFit: "contain" }} />
          <div>
            <div className="amiri gold-text" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.2 }}>Diamond Nest</div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>Decoration</div>
          </div>
        </Link>

        {/* ── Desktop nav (hidden on mobile) ── */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "1.6rem", marginRight: "auto", paddingRight: "2rem" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: "none",
              color: isActive(link.href) ? "var(--gold)" : "var(--text-light)",
              fontFamily: "Cairo, sans-serif",
              fontWeight: isActive(link.href) ? 600 : 400,
              fontSize: "0.93rem",
              position: "relative", paddingBottom: "4px",
              transition: "color 0.3s ease",
            }}>
              {link.label}
              {isActive(link.href) && (
                <span style={{
                  position: "absolute", bottom: 0, right: 0, left: 0, height: "2px",
                  background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                  borderRadius: "2px",
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* ── Desktop social buttons ── */}
        <div className="desktop-nav" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.label}
              style={{
                minWidth: 36, height: 36, borderRadius: "9px",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "5px",
                color: "var(--gold)", transition: "all 0.3s ease", cursor: "pointer",
                textDecoration: "none", padding: s.label === "موقعنا" ? "0 10px" : "0",
                fontSize: "0.78rem", fontFamily: "Cairo, sans-serif",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {s.icon}
              {s.label === "موقعنا" && <span>{s.label}</span>}
            </a>
          ))}
        </div>

        {/* ── Mobile hamburger (shown only on mobile) ── */}
        <button
          className="mobile-menu-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="فتح القائمة"
          style={{
            marginRight: "auto",
            width: 42, height: 42, borderRadius: "10px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "5px",
            cursor: "pointer", padding: 0,
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 20, height: 2, background: "var(--gold)", borderRadius: 2 }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1100,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* ── Mobile Drawer Panel ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1200,
        width: "min(320px, 85vw)",
        background: "linear-gradient(180deg, #0C1020 0%, #0A0F1E 100%)",
        borderLeft: "1px solid rgba(201,168,76,0.2)",
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        padding: "1.5rem",
        overflowY: "auto",
      }}>
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Image src="/logo.png" alt="Diamond Nest" width={40} height={40} style={{ objectFit: "contain" }} />
            <span className="amiri gold-text" style={{ fontSize: "1rem", fontWeight: 700 }}>Diamond Nest</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="إغلاق"
            style={{
              width: 36, height: 36, borderRadius: "8px",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.25)",
              color: "var(--gold)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2.5rem" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: "none",
              padding: "14px 16px",
              borderRadius: "12px",
              background: isActive(link.href) ? "rgba(201,168,76,0.12)" : "transparent",
              border: isActive(link.href) ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
              color: isActive(link.href) ? "var(--gold)" : "var(--text-light)",
              fontFamily: "Cairo, sans-serif",
              fontWeight: isActive(link.href) ? 600 : 400,
              fontSize: "1.05rem",
              transition: "all 0.2s ease",
              display: "flex", alignItems: "center",
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(201,168,76,0.15)", marginBottom: "2rem" }} />

        {/* Drawer social */}
        <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "Cairo, sans-serif", marginBottom: "1rem" }}>
          تواصل معنا
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "0.8rem",
                padding: "12px 16px", borderRadius: "12px",
                background: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--gold)", textDecoration: "none",
                fontFamily: "Cairo, sans-serif", fontWeight: 500, fontSize: "0.93rem",
              }}
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* CSS to toggle desktop vs mobile elements */}
      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
