"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #080C17 0%, #0C1020 40%, #101528 70%, #0A0E1C 100%)",
      paddingTop: "var(--nav-h)", direction: "rtl", position: "relative", overflow: "hidden",
    }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "min(400px,50vw)", height: "min(400px,50vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,216,255,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="section-pad page-wrap" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "100px", padding: "5px 16px", marginBottom: "1.4rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.78rem", fontFamily: "Cairo, sans-serif", letterSpacing: "0.08em" }}>قصتنا ورؤيتنا</span>
          </div>
          <h1 className="amiri page-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "var(--ivory)", marginBottom: "1rem" }}>من نحن</h1>
          <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "0 auto" }} />
        </div>

        {/* Bio + logo */}
        <div className="about-grid grid-2" style={{ alignItems: "center", marginBottom: "3.5rem" }}>
          {/* text */}
          <div className="about-text">
            <h2 className="amiri section-title" style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "var(--ivory)", marginBottom: "1.2rem", lineHeight: 1.6 }}>
              أكثر من مجرد ديكور..{" "}<span className="gold-text">نصنع مشاعر</span>
            </h2>
            {[
              "Diamond Nest Decoration وُلدت من شغف حقيقي بالجمال والتفاصيل. منذ انطلاقتنا، اتخذنا من الفخامة الهادئة والأناقة العصرية نهجاً لا يتزحزح، نُقدّم من خلاله تجارب تصميم داخلي استثنائية في المنازل والفنادق والمحلات التجارية وقاعات الأفراح.",
              "يجمع فريقنا بين المعرفة الأكاديمية والخبرة الميدانية العميقة؛ كل مشروع نتولاه هو فرصة لنُبدع من جديد، نستمع فيها إلى أحلامك ونترجمها إلى مساحة تُبهرك في كل صباح.",
              "نؤمن بأن المكان الجميل لا يُقاس بثمنه، بل بما يُضيفه إلى حياتك — لذا نحرص دائماً على تحقيق التوازن المثالي بين الجمال والوظيفة.",
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "clamp(0.88rem, 2vw, 1rem)", lineHeight: 2, color: "rgba(232,228,220,0.78)", marginBottom: "1.1rem" }}>{p}</p>
            ))}
            <div className="cta-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <Link href="/gallery" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0F1E",
                fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: "0.93rem",
                padding: "12px 26px", borderRadius: "10px", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(201,168,76,0.3)", minHeight: "48px",
              }}>
                شاهد أعمالنا
              </Link>
            </div>
          </div>

          {/* logo */}
          <div className="about-logo" style={{ display: "flex", justifyContent: "center" }}>
            <div className="glass" style={{ borderRadius: "24px", padding: "2rem", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-16px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
              <Image src="/logo.png" alt="Diamond Nest" width={280} height={280}
                style={{ objectFit: "contain", filter: "drop-shadow(0 12px 35px rgba(201,168,76,0.32))", position: "relative", zIndex: 1, maxWidth: "min(280px, 60vw)", height: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="amiri section-title" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--ivory)" }}>قيمنا وفلسفتنا</h2>
            <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "1rem auto" }} />
          </div>
          <div className="grid-2">
            {[
              { icon: "◆", title: "رؤيتنا", desc: "أن نكون الاسم الأول المرتبط بالتصميم الداخلي الفاخر والمبتكر، وأن نترك بصمة جمالية في كل مشروع نلمسه." },
              { icon: "✦", title: "مهمتنا", desc: "تحويل المساحات إلى تجارب بصرية وحسية استثنائية، بأعلى معايير الجودة والاحترافية." },
              { icon: "❋", title: "قيمنا", desc: "الشفافية، الالتزام بالمواعيد، الانتباه للتفاصيل الدقيقة، والشغف الحقيقي بالإبداع." },
              { icon: "★", title: "وعدنا لك", desc: "من أول اجتماع حتى تسليم المفتاح، أنت في أيدٍ أمينة. نضمن أن النتيجة تتجاوز توقعاتك." },
            ].map((v) => (
              <div key={v.title} className="glass" style={{
                padding: "1.6rem", borderRadius: "16px",
                display: "flex", gap: "1rem", alignItems: "flex-start",
              }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: "12px",
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem", color: "var(--gold)",
                }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="amiri" style={{ fontSize: "1.1rem", color: "var(--ivory)", marginBottom: "0.4rem" }}>{v.title}</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontFamily: "Cairo, sans-serif", fontWeight: 300, fontSize: "0.87rem" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="glass" style={{
          borderRadius: "22px", padding: "clamp(2rem, 5vw, 3.5rem)",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(201,168,76,0.07), rgba(200,216,255,0.03))",
        }}>
          <h2 className="amiri section-title" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "var(--ivory)", marginBottom: "0.8rem" }}>
            هل أنت مستعد لتحويل مساحتك؟
          </h2>
          <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontWeight: 300, marginBottom: "1.8rem", fontSize: "0.93rem" }}>
            تواصل معنا اليوم وابدأ رحلتك نحو المكان الذي تستحقه.
          </p>
          <div className="cta-row" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://www.instagram.com/diamond_nest2030?igsh=Z3Q5NXg3b3ViNWFn"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#0A0F1E",
                fontFamily: "Cairo, sans-serif", fontWeight: 700, fontSize: "0.93rem",
                padding: "12px 26px", borderRadius: "10px", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(201,168,76,0.3)", minHeight: "48px",
              }}>
              تواصل معنا
            </a>
            <Link href="/gallery" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "transparent", color: "var(--gold)",
              fontFamily: "Cairo, sans-serif", fontWeight: 600, fontSize: "0.93rem",
              padding: "12px 26px", borderRadius: "10px", textDecoration: "none",
              border: "1px solid rgba(201,168,76,0.4)", minHeight: "48px",
            }}>
              معرض الأعمال
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
