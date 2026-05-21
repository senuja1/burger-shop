import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin, Phone, Mail,
  ChevronDown, Star, Users, Bed, Wifi, UtensilsCrossed,
  Car, Sparkles, Coffee, Clock, ArrowRight, MessageCircle,
  Calendar, Waves, Sun, Globe, Send, Menu, X,
} from "lucide-react";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  gold: "#C9A96E",
  goldLight: "#E8D5A3",
  charcoal: "#1A1A18",
  beige: "#F5F0E8",
  ivory: "#FAF8F3",
  sand: "#E8DDD0",
  brown: "#2D1F14",
  muted: "#8B7D6B",
};

/* ─────────────────────────── ANIMATION VARIANTS ────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
function useReveal(margin = "-100px 0px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

/* ─────────────────────────── SHARED STYLE CONSTANTS ─────────────────── */
const label = {
  display: "block",
  fontFamily: "'Jost', sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: C.gold,
  marginBottom: "7px",
};
const inputWrap = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "11px 14px",
  background: "rgba(250,248,243,0.05)",
  border: `1px solid rgba(201,169,110,0.22)`,
  borderRadius: "4px",
};
const inputField = {
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#FAF8F3",
  fontFamily: "'Jost', sans-serif",
  fontSize: "0.88rem",
  width: "100%",
  colorScheme: "dark",
};
const ctrBtn = {
  background: "rgba(201,169,110,0.14)",
  border: "none",
  color: C.gold,
  width: "22px",
  height: "22px",
  borderRadius: "2px",
  cursor: "pointer",
  fontSize: "1rem",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/* ════════════════════════════ NAVBAR ════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", h);
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Villas", "Experiences", "Gallery", "Location", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 48px" : "26px 48px",
        background: scrolled ? "rgba(26,26,24,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,169,110,0.14)` : "none",
        transition: "all 0.45s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: C.gold, marginBottom: 1 }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem",
          fontWeight: 500, color: C.ivory, letterSpacing: "0.05em",
        }}>Aureva Villas</span>
      </a>

      <div className="hidden md:flex" style={{ alignItems: "center", gap: "36px" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{
              color: "rgba(250,248,243,0.68)", fontFamily: "'Jost', sans-serif",
              fontSize: "0.78rem", fontWeight: 400, letterSpacing: "0.12em",
              textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,248,243,0.68)")}
          >{l}</a>
        ))}
        <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            padding: "9px 24px",
            border: `1px solid ${C.gold}`, color: C.gold,
            fontFamily: "'Jost', sans-serif", fontSize: "0.76rem",
            fontWeight: 500, letterSpacing: "0.12em", textDecoration: "none",
            textTransform: "uppercase", borderRadius: "2px", transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.charcoal; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}
        >Book Now</motion.a>
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", color: C.ivory, cursor: "pointer" }}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(26,26,24,0.98)", backdropFilter: "blur(20px)",
              padding: "24px 48px", display: "flex", flexDirection: "column", gap: "18px",
            }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{
                  color: C.ivory, fontFamily: "'Jost', sans-serif", fontSize: "1rem",
                  letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase",
                }}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ════════════════════════════ HERO ════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fadeOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <motion.div style={{
        position: "absolute", inset: "-20%", y: imgY,
        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80&auto=format&fit=crop')`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom,rgba(26,26,24,0.38) 0%,rgba(26,26,24,0.52) 45%,rgba(26,26,24,0.88) 100%)",
      }} />

      <motion.div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "0 24px",
        y: textY, opacity: fadeOp,
      }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "0.72rem",
            letterSpacing: "0.32em", color: C.gold, textTransform: "uppercase", marginBottom: "24px",
          }}>Mirissa Coast · Sri Lanka</p>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem,7.5vw,6.2rem)", fontWeight: 300,
            color: C.ivory, lineHeight: 1.08, maxWidth: "820px",
            margin: "0 auto 30px", letterSpacing: "-0.01em",
          }}>
            Escape to a Private<br />
            <em style={{ fontStyle: "italic", color: C.goldLight }}>Coastal Sanctuary</em>
          </h1>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(0.9rem,1.8vw,1.08rem)",
            color: "rgba(250,248,243,0.66)", maxWidth: "560px",
            margin: "0 auto 50px", lineHeight: 1.78, fontWeight: 300,
          }}>
            A boutique villa stay crafted for slow mornings, ocean air,
            private pools, and unforgettable evenings.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="#villas" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 42px", background: C.gold, color: C.charcoal,
                fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none",
                borderRadius: "2px", display: "inline-block",
              }}>Explore Villas</motion.a>
            <motion.a href="https://wa.me/94771234567" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "16px 42px", background: "transparent",
                border: "1px solid rgba(250,248,243,0.45)", color: C.ivory,
                fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", fontWeight: 400,
                letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none",
                borderRadius: "2px", display: "flex", alignItems: "center", gap: "9px",
              }}><MessageCircle size={15} />Book on WhatsApp</motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
          style={{
            position: "absolute", right: "5%", bottom: "16%",
            background: "rgba(26,26,24,0.68)", backdropFilter: "blur(24px)",
            border: `1px solid rgba(201,169,110,0.32)`, borderRadius: "10px",
            padding: "26px 30px", textAlign: "left",
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem",
            fontWeight: 500, color: C.gold, marginBottom: "14px",
          }}>From Rs. 42,000
            <span style={{ fontSize: "0.82rem", color: "rgba(250,248,243,0.48)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}> / night</span>
          </p>
          {["🏊  Private Pool", "🌊  Ocean View", "🛎  Concierge 24/7"].map(t => (
            <p key={t} style={{
              color: "rgba(250,248,243,0.76)", fontFamily: "'Jost', sans-serif",
              fontSize: "0.78rem", letterSpacing: "0.05em", marginBottom: "7px",
            }}>{t}</p>
          ))}
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          position: "absolute", bottom: "38px", left: "50%", transform: "translateX(-50%)",
          zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "7px",
        }}>
        <p style={{ color: "rgba(250,248,243,0.36)", fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</p>
        <div style={{ width: 1, height: 38, background: `linear-gradient(to bottom,rgba(201,169,110,0.55),transparent)` }} />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════ BOOKING BAR ═══════════════════════════ */
function BookingBar() {
  const [guests, setGuests] = useState(2);
  const [villa, setVilla] = useState("");
  return (
    <div style={{
      background: C.charcoal, position: "sticky", top: 0, zIndex: 80,
      borderBottom: `1px solid rgba(201,169,110,0.12)`, padding: "18px 48px",
    }}>
      <div style={{
        maxWidth: 1140, margin: "0 auto",
        display: "flex", gap: "14px", alignItems: "flex-end", flexWrap: "wrap",
      }}>
        {[
          { lbl: "Check-in", type: "date" },
          { lbl: "Check-out", type: "date" },
        ].map(f => (
          <div key={f.lbl} style={{ flex: "1 1 130px" }}>
            <label style={label}>{f.lbl}</label>
            <div style={inputWrap}>
              <Calendar size={13} color={C.gold} style={{ flexShrink: 0 }} />
              <input type={f.type} style={inputField} />
            </div>
          </div>
        ))}

        <div style={{ flex: "1 1 130px" }}>
          <label style={label}>Guests</label>
          <div style={{ ...inputWrap, justifyContent: "space-between" }}>
            <Users size={13} color={C.gold} style={{ flexShrink: 0 }} />
            <span style={{ color: C.ivory, fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", flex: 1, marginLeft: 8 }}>
              {guests} Guest{guests !== 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button style={ctrBtn} onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <button style={ctrBtn} onClick={() => setGuests(Math.min(12, guests + 1))}>+</button>
            </div>
          </div>
        </div>

        <div style={{ flex: "1 1 160px" }}>
          <label style={label}>Villa Type</label>
          <div style={inputWrap}>
            <Globe size={13} color={C.gold} style={{ flexShrink: 0 }} />
            <select value={villa} onChange={e => setVilla(e.target.value)}
              style={{ ...inputField, background: "transparent" }}>
              <option value="">Any Villa</option>
              <option>Ocean Pearl Suite</option>
              <option>Garden Pool Villa</option>
              <option>Sunset Residence</option>
            </select>
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            padding: "13px 32px", background: C.gold, color: C.charcoal,
            border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif",
            fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.13em",
            textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
          }}>Check Availability</motion.button>
      </div>
    </div>
  );
}

/* ════════════════════════════ ABOUT ═══════════════════════════════════ */
function About() {
  const [ref, inView] = useReveal();
  return (
    <section id="about" style={{ background: C.ivory, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="grid md:grid-cols-2" style={{ gap: "88px", alignItems: "center" }}>
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "20px" }}>Our Story</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.3rem)", fontWeight: 400, color: C.charcoal, lineHeight: 1.18, marginBottom: "28px" }}>
              Where the Indian Ocean<br /><em>meets quiet luxury</em>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.98rem", color: C.muted, lineHeight: 1.9, marginBottom: "18px", fontWeight: 300 }}>
              Aureva Villas was born from a simple belief — that a truly special stay should feel like coming home to a version of the world you've always wished existed. Set along the southern coast of Sri Lanka, our villas sit quietly between swaying palms and the ocean.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.98rem", color: C.muted, lineHeight: 1.9, marginBottom: "52px", fontWeight: 300 }}>
              Each villa is privately designed, locally built, and personally managed. No crowds, no rush — just the sound of the sea, a cold drink by your pool, and evenings that slip into the horizon.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2" style={{ gap: "28px" }}>
              {[
                ["12", "Private Villas"],
                ["4.9 ★", "Average Rating"],
                ["2 min", "Walk to Beach"],
                ["On request", "Private Chef"],
              ].map(([num, lbl]) => (
                <motion.div key={lbl} variants={fadeUp}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.1rem", fontWeight: 500, color: C.charcoal, marginBottom: "5px" }}>{num}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", color: C.muted, letterSpacing: "0.09em", textTransform: "uppercase" }}>{lbl}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 44 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80"
              alt="Villa pool" style={{ width: "82%", borderRadius: "8px", display: "block", boxShadow: "0 32px 80px rgba(26,26,24,0.14)" }} />
            <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80"
              alt="Villa terrace" style={{
                width: "54%", borderRadius: "8px", position: "absolute",
                bottom: "-44px", right: 0, boxShadow: "0 22px 64px rgba(26,26,24,0.18)",
                border: `6px solid ${C.ivory}`,
              }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ VILLAS ══════════════════════════════════ */
const VILLAS = [
  {
    name: "Ocean Pearl Suite",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&auto=format&fit=crop",
    price: "Rs. 68,000", guests: 4, beds: 2,
    tags: ["Private Pool", "Ocean View", "King Bed"],
    desc: "A generous two-bedroom suite elevated above the treeline, with a wraparound terrace that frames the horizon perfectly. Mornings here taste of sea salt and good coffee.",
  },
  {
    name: "Garden Pool Villa",
    img: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
    price: "Rs. 42,000", guests: 2, beds: 1,
    tags: ["Plunge Pool", "Garden", "Open Bathroom"],
    desc: "Tucked into a quiet corner of the estate, this villa is all about intimacy. The open-air bathroom, tropical garden, and private plunge pool make it impossible to leave.",
  },
  {
    name: "Sunset Residence",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    price: "Rs. 95,000", guests: 6, beds: 3,
    tags: ["Infinity Pool", "Full Kitchen", "Event Space"],
    desc: "Our most sought-after villa. Three bedrooms, a full kitchen, and an infinity pool that seems to pour straight into the sea. Best experienced with people you love.",
  },
];

function VillaCard({ v, delay, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.ivory, borderRadius: "12px", overflow: "hidden",
        border: `1px solid ${hov ? "rgba(201,169,110,0.5)" : "transparent"}`,
        boxShadow: hov ? "0 32px 80px rgba(26,26,24,0.14),0 0 0 1px rgba(201,169,110,0.28)" : "0 8px 32px rgba(26,26,24,0.06)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
      <div style={{ overflow: "hidden", height: "264px", position: "relative" }}>
        <img src={v.img} alt={v.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.09)" : "scale(1)",
          transition: "transform 0.85s cubic-bezier(0.22,1,0.36,1)",
        }} />
        <div style={{
          position: "absolute", top: "16px", right: "16px",
          background: "rgba(26,26,24,0.62)", backdropFilter: "blur(14px)",
          padding: "6px 14px", borderRadius: "20px",
          color: C.gold, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 500,
        }}>
          {v.price}<span style={{ fontSize: "0.68rem", color: "rgba(250,248,243,0.55)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>/night</span>
        </div>
      </div>
      <div style={{ padding: "28px 28px 30px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", fontWeight: 500, color: C.charcoal, marginBottom: "13px" }}>{v.name}</h3>
        <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px", color: C.muted, fontFamily: "'Jost', sans-serif", fontSize: "0.79rem" }}><Users size={12} /> {v.guests} guests</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px", color: C.muted, fontFamily: "'Jost', sans-serif", fontSize: "0.79rem" }}><Bed size={12} /> {v.beds} bed{v.beds > 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "18px" }}>
          {v.tags.map(t => (
            <span key={t} style={{
              padding: "4px 12px", background: "rgba(201,169,110,0.09)",
              border: "1px solid rgba(201,169,110,0.28)", borderRadius: "20px",
              color: C.muted, fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.06em",
            }}>{t}</span>
          ))}
        </div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.87rem", color: C.muted, lineHeight: 1.73, marginBottom: "26px", fontWeight: 300 }}>{v.desc}</p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{
            flex: 1, padding: "11px", border: `1px solid ${C.charcoal}`,
            background: "transparent", color: C.charcoal,
            fontFamily: "'Jost', sans-serif", fontSize: "0.73rem",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer",
          }}>View Details</button>
          <button style={{
            flex: 1, padding: "11px", background: C.charcoal, border: "none",
            color: C.gold, fontFamily: "'Jost', sans-serif", fontSize: "0.73rem",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer",
          }}>Book Now</button>
        </div>
      </div>
    </motion.div>
  );
}

function Villas() {
  const [ref, inView] = useReveal();
  return (
    <section id="villas" style={{ background: C.beige, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Our Collection</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.charcoal, lineHeight: 1.15 }}>
            Villas for every kind of stay
          </motion.h2>
        </motion.div>
        <div className="grid md:grid-cols-3" style={{ gap: "32px" }}>
          {VILLAS.map((v, i) => <VillaCard key={v.name} v={v} delay={i * 0.14} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ AMENITIES ══════════════════════════════ */
const AMENITIES = [
  { icon: Waves, lbl: "Private Infinity Pool", desc: "Each villa has its own pool. No sharing, ever." },
  { icon: Sun, lbl: "Ocean View Terrace", desc: "Sunrise to sunset, the view is entirely yours." },
  { icon: UtensilsCrossed, lbl: "Private Chef", desc: "Available on request, with a locally sourced menu." },
  { icon: Car, lbl: "Airport Pickup", desc: "Seamless private transfers, door to door." },
  { icon: Sparkles, lbl: "Spa Treatments", desc: "In-villa Ayurvedic and deep-tissue therapies." },
  { icon: Wifi, lbl: "High-Speed WiFi", desc: "100 Mbps throughout all villa spaces." },
  { icon: Coffee, lbl: "Breakfast Included", desc: "Fresh tropical breakfast delivered every morning." },
  { icon: Clock, lbl: "24 / 7 Concierge", desc: "A real person. Always available, never scripted." },
];

function Amenities() {
  const [ref, inView] = useReveal();
  return (
    <section style={{ background: C.charcoal, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Included in Every Stay</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.ivory, lineHeight: 1.15 }}>
            Everything you need.<br />
            <em style={{ color: C.goldLight }}>Nothing you don't.</em>
          </motion.h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "22px" }}>
          {AMENITIES.map(({ icon: Icon, lbl, desc }, i) => (
            <motion.div key={lbl}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, backgroundColor: "rgba(201,169,110,0.07)", borderColor: "rgba(201,169,110,0.3)" }}
              style={{
                padding: "32px 24px", background: "rgba(250,248,243,0.04)",
                border: "1px solid rgba(201,169,110,0.11)", borderRadius: "8px", transition: "all 0.3s",
              }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: "rgba(201,169,110,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",
              }}><Icon size={18} color={C.gold} /></div>
              <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", fontWeight: 500, color: C.ivory, marginBottom: "9px", letterSpacing: "0.02em" }}>{lbl}</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.79rem", color: "rgba(250,248,243,0.42)", lineHeight: 1.65, fontWeight: 300 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ EXPERIENCES ════════════════════════════ */
const EXPERIENCES = [
  { title: "Sunrise Breakfast", sub: "On your private terrace", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" },
  { title: "Candlelit Dinner", sub: "Private beachfront setting", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80" },
  { title: "Lagoon Kayaking", sub: "Guided morning expedition", img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80" },
  { title: "In-Villa Spa", sub: "Ayurvedic & deep tissue", img: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=700&q=80" },
  { title: "Beach Picnic", sub: "Curated hamper, your spot", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&q=80" },
  { title: "Cultural Tour", sub: "Galle Fort & spice trails", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=80" },
];

function Experiences() {
  const [ref, inView] = useReveal();
  return (
    <section id="experiences" style={{ background: C.ivory, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Curated For You</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.charcoal, lineHeight: 1.15 }}>
            Moments that stay with you
          </motion.h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "22px" }}>
          {EXPERIENCES.map((e, i) => (
            <motion.div key={e.title}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
              style={{ borderRadius: "10px", overflow: "hidden", position: "relative", height: "320px", cursor: "pointer" }}>
              <motion.img src={e.img} alt={e.title}
                variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.65 }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,24,0.82) 0%,rgba(26,26,24,0.08) 62%)" }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: C.ivory, marginBottom: "5px" }}>{e.title}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", color: C.gold, letterSpacing: "0.12em" }}>{e.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ GALLERY ════════════════════════════════ */
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop", cap: "The pool deck", h: "380px" },
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&auto=format&fit=crop", cap: "Morning light", h: "280px" },
  { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80", cap: "Ocean terrace", h: "280px" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80", cap: "Private dining", h: "380px" },
  { src: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80", cap: "Garden suite", h: "280px" },
  { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", cap: "Sunset hour", h: "280px" },
];

function Gallery() {
  const [ref, inView] = useReveal();
  return (
    <section id="gallery" style={{ background: C.beige, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Visual Stories</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.charcoal }}>A glimpse inside Aureva</motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "16px" }}>
          {GALLERY.map((g, i) => (
            <motion.div key={g.cap}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
              style={{ borderRadius: "10px", overflow: "hidden", position: "relative", height: g.h, cursor: "pointer" }}>
              <motion.img src={g.src} alt={g.cap}
                variants={{ hover: { scale: 1.07 } }} transition={{ duration: 0.55 }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <motion.div
                initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }}
                style={{
                  position: "absolute", inset: 0, background: "rgba(26,26,24,0.38)",
                  display: "flex", alignItems: "flex-end", padding: "20px",
                }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.98rem", color: C.ivory, fontStyle: "italic" }}>{g.cap}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ REVIEWS ═══════════════════════════════ */
const REVIEWS = [
  {
    name: "Camille & James", from: "Paris, France", stars: 5, stay: "Sunset Residence · 7 nights",
    text: "The villa was quiet, private, and beautifully kept. We spent most evenings by the pool watching the sky change colour. Nothing felt rushed. The team knew exactly when to appear and when to leave you to it.",
  },
  {
    name: "Rohan Mehta", from: "Mumbai, India", stars: 5, stay: "Ocean Pearl Suite · 4 nights",
    text: "I've stayed at a few high-end resorts in Sri Lanka but Aureva is different. It feels like your own home — just cleaner and with better views. The private chef was the real highlight.",
  },
  {
    name: "Sarah Lin", from: "Singapore", stars: 5, stay: "Garden Pool Villa · 5 nights",
    text: "We came for a long weekend and ended up extending by three days. The Garden Villa felt designed for us. The breakfast, the outdoor shower, the little details — all done with genuine care.",
  },
];

function Reviews() {
  const [ref, inView] = useReveal();
  return (
    <section style={{ background: C.charcoal, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Guest Words</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.ivory }}>What they said</motion.h2>
        </motion.div>
        <div className="grid md:grid-cols-3" style={{ gap: "26px" }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "36px 32px", background: "rgba(250,248,243,0.04)",
                border: "1px solid rgba(201,169,110,0.11)", borderRadius: "10px",
              }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                {Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={13} fill={C.gold} color={C.gold} />)}
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem",
                color: "rgba(250,248,243,0.84)", lineHeight: 1.82,
                fontStyle: "italic", marginBottom: "28px", fontWeight: 400,
              }}>"{r.text}"</p>
              <div style={{ borderTop: "1px solid rgba(201,169,110,0.14)", paddingTop: "20px" }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", color: C.ivory, fontWeight: 500, marginBottom: "3px" }}>{r.name}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.74rem", color: "rgba(250,248,243,0.38)", letterSpacing: "0.06em" }}>{r.from}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: C.gold, letterSpacing: "0.06em", marginTop: "7px" }}>{r.stay}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ LOCATION ══════════════════════════════ */
function Location() {
  const [ref, inView] = useReveal();
  return (
    <section id="location" style={{ background: C.ivory, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="grid md:grid-cols-2" style={{ gap: "88px", alignItems: "center" }}>
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "20px" }}>Where to Find Us</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: C.charcoal, marginBottom: "24px", lineHeight: 1.2 }}>
              Mirissa Coast,<br />Southern Sri Lanka
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.96rem", color: C.muted, lineHeight: 1.9, marginBottom: "42px", fontWeight: 300 }}>
              Nestled between the whale-watching town of Mirissa and the colonial beauty of Galle, Aureva Villas sits in a quiet pocket of the southern coast — close enough to explore, private enough to disappear.
            </motion.p>
            <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "44px" }}>
              {[
                [Waves, "2 min walk to the beach"],
                [MapPin, "18 min drive to Mirissa town"],
                [Car, "45 min to airport transfer point"],
              ].map(([Icon, txt]) => (
                <motion.div key={txt} variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,169,110,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={13} color={C.gold} />
                  </div>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", color: C.charcoal }}>{txt}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.a variants={fadeUp} href="https://maps.google.com" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "9px",
                padding: "14px 32px", background: C.charcoal, color: C.gold,
                fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.13em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px",
              }}><MapPin size={13} />Get Directions</motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 44 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ height: "460px", borderRadius: "12px", overflow: "hidden", position: "relative", boxShadow: "0 22px 64px rgba(26,26,24,0.12)" }}>
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop"
              alt="Southern Sri Lanka coast" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
            <div style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                background: "rgba(26,26,24,0.7)", backdropFilter: "blur(18px)",
                border: `1px solid rgba(201,169,110,0.3)`, borderRadius: "8px",
                padding: "22px 32px", textAlign: "center",
              }}>
                <MapPin size={24} color={C.gold} style={{ display: "block", margin: "0 auto 9px" }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: C.ivory, marginBottom: "5px" }}>Aureva Villas</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.73rem", color: "rgba(250,248,243,0.48)" }}>Mirissa · Galle Coast, Sri Lanka</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ BOOKING FORM ══════════════════════════ */
function BookingForm() {
  const [ref, inView] = useReveal();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", checkin: "", checkout: "", guests: "", message: "" });
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <section id="contact" style={{ background: C.beige, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 880, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "66px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Reserve Your Stay</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.charcoal }}>Plan your visit</motion.h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "80px 40px", background: C.ivory, borderRadius: "12px", border: `1px solid rgba(201,169,110,0.28)` }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", background: "rgba(201,169,110,0.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Sparkles size={26} color={C.gold} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: C.charcoal, marginBottom: "13px" }}>Request Received</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", color: C.muted, lineHeight: 1.75, maxWidth: 440, margin: "0 auto" }}>
                Thank you, {form.name || "there"}. We'll be in touch within a few hours to confirm your booking details and answer any questions.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: C.ivory, borderRadius: "12px", padding: "52px", border: `1px solid rgba(201,169,110,0.18)`, boxShadow: "0 20px 60px rgba(26,26,24,0.05)" }}>
              <div className="grid md:grid-cols-2" style={{ gap: "18px", marginBottom: "18px" }}>
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+94 77 XXX XXXX" },
                  { name: "guests", label: "Number of Guests", type: "number", placeholder: "2" },
                  { name: "checkin", label: "Check-in Date", type: "date", placeholder: "" },
                  { name: "checkout", label: "Check-out Date", type: "date", placeholder: "" },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ ...label, color: C.muted }}>{f.label}</label>
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={onChange}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", padding: "13px 16px",
                        background: C.beige, border: `1px solid rgba(45,31,20,0.14)`,
                        borderRadius: "4px", fontFamily: "'Jost', sans-serif",
                        fontSize: "0.9rem", color: C.charcoal, outline: "none", boxSizing: "border-box",
                      }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "26px" }}>
                <label style={{ ...label, color: C.muted }}>Message / Special Requests</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={4}
                  placeholder="Let us know about special occasions, dietary preferences, or anything else we should prepare..."
                  style={{
                    width: "100%", padding: "13px 16px", background: C.beige,
                    border: `1px solid rgba(45,31,20,0.14)`, borderRadius: "4px",
                    fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", color: C.charcoal,
                    outline: "none", resize: "vertical", boxSizing: "border-box",
                  }} />
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setDone(true)}
                  style={{
                    padding: "15px 40px", background: C.charcoal, color: C.gold,
                    border: "none", borderRadius: "2px", fontFamily: "'Jost', sans-serif",
                    fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.13em",
                    textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
                  }}><Send size={14} />Send Booking Request</motion.button>
                <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", color: C.muted, fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", textDecoration: "none" }}>
                  <MessageCircle size={16} color="#25D366" />
                  Prefer quick replies? Book directly on WhatsApp.
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════════════════════════ FAQ ════════════════════════════════════ */
const FAQS = [
  { q: "What time is check-in?", a: "Check-in is from 2:00 PM. Early check-in from 10:00 AM can usually be arranged — just mention it when you book and we'll do our best to accommodate you." },
  { q: "Is breakfast included?", a: "Yes. A fresh tropical breakfast is prepared and delivered to your villa every morning. We cater to all dietary preferences — just let us know when booking." },
  { q: "Do you offer airport pickup?", a: "We do. Our team can arrange a private transfer from Bandaranaike International Airport directly to the villa. Please share your arrival details when confirming your booking." },
  { q: "Can we request a private chef?", a: "Absolutely. A private chef is available on request for in-villa lunches, dinners, and special occasions. We use seasonal, locally sourced ingredients whenever possible." },
  { q: "Is the villa suitable for families?", a: "Yes — especially the Sunset Residence, which has three bedrooms and generous living space. Baby cots, high chairs, and babysitting services can all be arranged on request." },
  { q: "How do we confirm a booking?", a: "Send us an inquiry via the form or WhatsApp. We'll reply within a few hours with availability and rates. A 30% deposit confirms the reservation, with the balance due on arrival." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, inView] = useReveal();
  return (
    <section style={{ background: C.ivory, padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 780, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
          style={{ textAlign: "center", marginBottom: "76px" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginBottom: "16px" }}>Before You Arrive</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400, color: C.charcoal }}>Common questions</motion.h2>
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
          {FAQS.map((f, i) => (
            <motion.div key={f.q}
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: `1px solid ${open === i ? "rgba(201,169,110,0.42)" : "rgba(45,31,20,0.11)"}`,
                borderRadius: "8px", overflow: "hidden",
                background: open === i ? "rgba(201,169,110,0.04)" : C.ivory, transition: "all 0.3s ease",
              }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", padding: "22px 28px",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.94rem", fontWeight: 500, color: C.charcoal }}>{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={17} color={C.gold} />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 28px 24px", fontFamily: "'Jost', sans-serif", fontSize: "0.87rem", color: C.muted, lineHeight: 1.82, fontWeight: 300 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════ FOOTER ════════════════════════════════ */
function Footer() {
  const socials = [
    { Icon: Globe, href: "#", label: "Website" },
    { Icon: Mail, href: "mailto:hello@aurevavillas.com", label: "Email" },
    { Icon: MessageCircle, href: "https://wa.me/94771234567", label: "WhatsApp" },
  ];

  return (
    <footer style={{ background: C.charcoal, borderTop: `1px solid rgba(201,169,110,0.1)`, padding: "80px 48px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="grid md:grid-cols-4" style={{ gap: "52px", marginBottom: "68px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "15px" }}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: C.gold }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: C.ivory, letterSpacing: "0.04em" }}>Aureva Villas</span>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.81rem", color: "rgba(250,248,243,0.38)", lineHeight: 1.82, fontWeight: 300 }}>
              A boutique collection of private villas along the southern coast of Sri Lanka.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "22px" }}>
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label}
                  style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(250,248,243,0.38)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"; e.currentTarget.style.color = "rgba(250,248,243,0.38)"; }}>
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.66rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: "20px" }}>Explore</p>
            {["Villas", "Experiences", "Gallery", "About Us", "Location"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                style={{ display: "block", fontFamily: "'Jost', sans-serif", fontSize: "0.83rem", color: "rgba(250,248,243,0.46)", textDecoration: "none", marginBottom: "12px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ivory)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,248,243,0.46)")}>{l}</a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.66rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: "20px" }}>Contact</p>
            {[
              [MapPin, "Mirissa, Southern Province, Sri Lanka"],
              [Phone, "+94 77 XXX XXXX"],
              [Mail, "hello@aureavavillas.com"],
            ].map(([Icon, txt]) => (
              <div key={txt} style={{ display: "flex", gap: "10px", marginBottom: "13px", alignItems: "flex-start" }}>
                <Icon size={12} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(250,248,243,0.46)", lineHeight: 1.5 }}>{txt}</p>
              </div>
            ))}
            <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 20px", background: "#25D366", color: "#fff", borderRadius: "4px", fontFamily: "'Jost', sans-serif", fontSize: "0.73rem", fontWeight: 500, textDecoration: "none", letterSpacing: "0.06em", marginTop: "10px" }}>
              <MessageCircle size={13} />WhatsApp Us
            </a>
          </div>

          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.66rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: "20px" }}>Stay Connected</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(250,248,243,0.38)", lineHeight: 1.75, marginBottom: "20px", fontWeight: 300 }}>
              Seasonal offers and quiet news from the coast. No clutter.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="email" placeholder="your@email.com"
                style={{ flex: 1, padding: "11px 14px", background: "rgba(250,248,243,0.06)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px", color: C.ivory, fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", outline: "none", minWidth: 0 }} />
              <button style={{ padding: "11px 14px", background: C.gold, border: "none", borderRadius: "2px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <ArrowRight size={14} color={C.charcoal} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(250,248,243,0.06)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.73rem", color: "rgba(250,248,243,0.22)" }}>
            © {new Date().getFullYear()} Aureva Villas. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.73rem", color: "rgba(250,248,243,0.22)" }}>
            Developed by{" "}
            <a href="https://vasterglobal.com" target="_blank" rel="noreferrer" style={{ color: C.gold, textDecoration: "none" }}>Vaster Global</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════ ROOT APP ══════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#F5F0E8;overflow-x:hidden}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#1A1A18}
        ::-webkit-scrollbar-thumb{background:#C9A96E;border-radius:3px}
        input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(0.5);cursor:pointer}
        select option{background:#1A1A18;color:#FAF8F3}
        a{cursor:pointer}
        .grid{display:grid}
        .grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
        .hidden{display:none}
        @media (min-width:640px){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (min-width:768px){
          .md\\:flex{display:flex}
          .md\\:hidden{display:none}
          .md\\:block{display:block}
          .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
          .md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
        }
        @media (min-width:1024px){
          .lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
          .lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
        }
        @media (max-width:767px){
          nav{padding-left:24px!important;padding-right:24px!important}
          section{padding-left:24px!important;padding-right:24px!important}
          footer{padding-left:24px!important;padding-right:24px!important}
        }
      `}</style>
      <Navbar />
      <Hero />
      <BookingBar />
      <About />
      <Villas />
      <Amenities />
      <Experiences />
      <Gallery />
      <Reviews />
      <Location />
      <BookingForm />
      <FAQ />
      <Footer />
    </>
  );
}
