import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Flame, Clock, MapPin, Phone,
  ShoppingBag, MessageCircle, Star, ArrowRight,
  Plus, ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════════════ */
const CORAL   = "#EA9072";
const DARK    = "#0A0705";
const CREAM   = "#F5EDE4";
const BROWN   = "#1A0F08";
const E       = [0.16, 1, 0.3, 1];

const BURGERS = [
  { name:"The Smokehouse", type:"Signature Beef", price:"Rs. 1,450", heat:"Medium",
    desc:"Double smashed beef, aged cheddar, caramelised onion, smoked mayo on toasted brioche. The one that made us regulars.",
    img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90", no:"01" },
  { name:"Crispy Clucker", type:"Fried Chicken", price:"Rs. 1,250", heat:"Hot",
    desc:"Buttermilk fried chicken thigh, pickles, slaw, honey-chilli glaze, garlic aioli. Crispy even after delivery.",
    img:"https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=1200&q=90", no:"02" },
  { name:"Midnight Melt", type:"Cheese Loaded", price:"Rs. 1,590", heat:"Mild",
    desc:"Beef patty, triple cheese pull, grilled mushrooms, black pepper sauce, crispy onion rings. Dangerous after dark.",
    img:"https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=90", no:"03" },
  { name:"Green Beast",  type:"Plant-based",    price:"Rs. 1,050", heat:"Fresh",
    desc:"Crispy veggie patty, avocado herb sauce, fresh lettuce, tomato, charred onion relish. Doesn't apologise for being veggie.",
    img:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=90", no:"04" },
];

const STEPS = [
  { n:"01", title:"Cold patty, hot grill",      body:"Each beef patty hits a scorching surface and gets pressed hard. Crispy edges. Juicy centre. Real crust — not microwaved brown." },
  { n:"02", title:"Sauces made in-house",       body:"Smoked mayo, garlic aioli, pepper sauce, honey-chilli glaze — mixed fresh daily. Nothing here comes from a commercial bottle." },
  { n:"03", title:"Built only after you order", body:"No sad pre-stacked burgers. Your order triggers the build. Bun toasted, cheese melted, stacked, wrapped, yours." },
  { n:"04", title:"Hot in your hand",           body:"Walk in, WhatsApp ahead for pickup, or get hot delivery for office lunches and group orders. 12 minutes average." },
];

const REVIEWS = [
  { q:"The Smokehouse is the messiest and best thing I've eaten in Colombo. That patty crust was unreal.", name:"Naveen R.", sub:"Food writer" },
  { q:"Ordered the Clucker for delivery and it arrived crispy. That almost never happens. Sauce is genuinely great.", name:"Kavindi S.", sub:"Regular" },
  { q:"Big portions, proper flavour, and they actually reply fast on WhatsApp. That combination is rare.", name:"Dilan M.", sub:"Office lunch organiser" },
];

const GALLERY = [
  { img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1400&q=90", label:"The grill" },
  { img:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=90",  label:"Stacked" },
  { img:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=90",  label:"Sides" },
  { img:"https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1400&q=90", label:"Late night" },
];

/* ═══════════════════════════════════════════════════════════════════════
   PERMANENT REVEAL — NO whileInView, never resets
═══════════════════════════════════════════════════════════════════════ */
function useReveal(delay = 0, opts = {}) {
  const ref   = useRef(null);
  const seen  = useInView(ref, { once: true, margin: "-80px", ...opts });
  return { ref, seen, delay };
}

function FadeUp({ children, delay = 0, className = "", from = { opacity:0, y:40 }, opts = {} }) {
  const { ref, seen } = useReveal(delay, opts);
  return (
    <motion.div ref={ref}
      initial={from}
      animate={seen ? { opacity:1, y:0, x:0 } : from}
      transition={{ duration:0.85, delay, ease:E }}
      className={className}
    >{children}</motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   GRAIN OVERLAY (CSS only)
═══════════════════════════════════════════════════════════════════════ */
const Grain = () => (
  <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.032]"
    style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundRepeat:"repeat", backgroundSize:"200px" }}
  />
);

/* ═══════════════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const { scrollYProgress } = useScroll();
  const [mouse, setMouse]   = useState({ x: -999, y: -999 });
  const [activeMenu, setActiveMenu] = useState(0);
  const [menuOpen, setMenuOpen]     = useState(false);
  const cursorX = useSpring(mouse.x, { stiffness:120, damping:20 });
  const cursorY = useSpring(mouse.y, { stiffness:120, damping:20 });

  // parallax
  const heroTextY  = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const heroImgY   = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const heroOpacity= useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // reveal refs
  const statsRef   = useRef(null); const statsIn   = useInView(statsRef,   { once:true, margin:"-60px" });
  const storyRef   = useRef(null); const storyIn   = useInView(storyRef,   { once:true, margin:"-80px" });
  const processRef = useRef(null); const processIn = useInView(processRef, { once:true, margin:"-60px" });
  const reviewRef  = useRef(null); const reviewIn  = useInView(reviewRef,  { once:true, margin:"-60px" });
  const visitRef   = useRef(null); const visitIn   = useInView(visitRef,   { once:true, margin:"-60px" });
  const galleryRef = useRef(null); const galleryIn = useInView(galleryRef, { once:true, margin:"-60px" });

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background:DARK }} className="relative text-white overflow-x-hidden min-h-screen selection:bg-[#EA9072] selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: #EA9072; color: #000; }
      `}</style>
      <Grain />

      {/* ── custom cursor ─────────────────────────────────────────────── */}
      <motion.div className="pointer-events-none fixed z-[55] rounded-full mix-blend-difference"
        style={{ left: cursorX, top: cursorY, x:"-50%", y:"-50%",
          width:14, height:14, background:"white" }}
      />
      <motion.div className="pointer-events-none fixed z-[54] rounded-full border border-white/30"
        style={{ left: cursorX, top: cursorY, x:"-50%", y:"-50%",
          width:44, height:44 }}
        transition={{ type:"spring", stiffness:80, damping:18 }}
      />

      {/* ── ambient glow ──────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div animate={{ scale:[1,1.25,1], opacity:[0.22,0.4,0.22] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut" }}
          className="absolute left-[12%] top-[8%] h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background:"radial-gradient(circle, rgba(234,144,114,0.28) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale:[1,1.18,1], opacity:[0.14,0.26,0.14] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:5 }}
          className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background:"radial-gradient(circle, rgba(255,200,100,0.18) 0%, transparent 70%)" }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:E }}
        className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10"
      >
        {/* glass pill */}
        <div className="absolute inset-0 backdrop-blur-2xl" style={{ background:"rgba(10,7,5,0.7)", maskImage:"linear-gradient(to bottom, black 80%, transparent)" }} />

        <a href="#top" className="relative z-10 flex items-center gap-3">
          <motion.div whileHover={{ rotate:15, scale:1.1 }} transition={{ type:"spring", stiffness:300 }}
            className="grid h-10 w-10 place-items-center rounded-full text-black shadow-lg"
            style={{ background:`linear-gradient(135deg, ${CORAL}, #f5b98e)` }}>
            <Flame className="h-4 w-4" />
          </motion.div>
          <div>
            <span className="block font-black leading-none tracking-tight">Ember Bun</span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-white/35">Burger House</span>
          </div>
        </a>

        <div className="relative z-10 hidden items-center gap-10 text-xs font-bold uppercase tracking-[0.25em] text-white/45 md:flex">
          {["story","menu","process","gallery","visit"].map(l => (
            <a key={l} href={`#${l}`} className="capitalize transition hover:text-white"
              onMouseEnter={e => { e.currentTarget.style.color = CORAL; }}
              onMouseLeave={e => { e.currentTarget.style.color = ""; }}
            >{l}</a>
          ))}
        </div>

        <motion.a href="https://wa.me/94706857171" target="_blank" rel="noreferrer"
          whileHover={{ scale:1.06 }} whileTap={{ scale:0.95 }}
          className="relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-black"
          style={{ background:`linear-gradient(135deg, ${CORAL}, #f0b080)` }}>
          <MessageCircle className="h-4 w-4" /> Order
        </motion.a>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section id="top" className="relative min-h-screen overflow-hidden">
        {/* Full-bleed hero image */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2000&q=90"
            alt="Ember Bun hero"
            className="h-full w-full object-cover object-center"
            style={{ filter:"brightness(0.38) saturate(1.1)" }}
          />
          {/* Gradient over */}
          <div className="absolute inset-0" style={{ background:`linear-gradient(180deg, rgba(10,7,5,0.2) 0%, rgba(10,7,5,0.1) 40%, rgba(10,7,5,0.95) 100%)` }} />
          <div className="absolute inset-0" style={{ background:`radial-gradient(ellipse at 60% 50%, rgba(234,144,114,0.12) 0%, transparent 65%)` }} />
        </motion.div>

        {/* Hero content */}
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-20 md:px-14 md:pb-28">
          {/* Scroll hint */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
            className="absolute left-1/2 top-28 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>

          <div className="mx-auto w-full max-w-7xl">
            {/* Overline */}
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3, ease:E }}
              className="mb-6 text-sm font-bold uppercase tracking-[-0.04em]" style={{ color: CORAL }}>
              Smash burgers · Hot grill · Colombo
            </motion.p>

            {/* Giant headline */}
            <div className="overflow-hidden">
              <motion.h1 initial={{ y:"105%", opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:1, delay:0.4, ease:E }}
                className="text-[18vw] font-black leading-[0.78] tracking-[-0.04em] md:text-[12vw] lg:text-[9.5vw]">
                Burgers
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y:"105%", opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:1, delay:0.55, ease:E }}
                className="text-[18vw] font-black leading-[0.78] tracking-[-0.04em] md:text-[12vw] lg:text-[9.5vw]"
                style={{ color: CORAL }}>
                made right.
              </motion.h1>
            </div>

            {/* Bottom row */}
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.85, ease:E }}
              className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
              <p className="max-w-sm text-base leading-relaxed text-white/55 md:text-lg">
                Hot smashed patties, house-made sauces, toasted buns — and every single burger built only after you order.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a href="#menu" whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
                  className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-black text-black shadow-2xl"
                  style={{ background:`linear-gradient(135deg, ${CORAL} 0%, #f5b074 100%)`, boxShadow:`0 20px 60px -10px rgba(234,144,114,0.5)` }}>
                  See the Menu <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </motion.a>
                <motion.a href="https://wa.me/94706857171" target="_blank" rel="noreferrer"
                  whileHover={{ scale:1.03 }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/15">
                  <MessageCircle className="h-4 w-4" style={{ color:CORAL }} /> Order on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RUNNING MARQUEE
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 overflow-hidden border-y border-white/8 py-4" style={{ background:"rgba(234,144,114,0.07)" }}>
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration:22, repeat:Infinity, ease:"linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({length:6}).map((_,i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-6 text-sm font-bold uppercase tracking-[0.3em] text-white/40">
              Smash burgers <span style={{ color:CORAL }}>✦</span>
              House sauces <span style={{ color:CORAL }}>✦</span>
              Built to order <span style={{ color:CORAL }}>✦</span>
              Hot grill <span style={{ color:CORAL }}>✦</span>
              Colombo <span style={{ color:CORAL }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative z-10 mx-auto grid max-w-7xl gap-px px-6 py-24 md:grid-cols-4">
        {[["2×","Smash patty options"],["7","House-made sauces"],["12 min","Avg. serve time"],["4.9★","Customer rating"]].map(([n,l],i) => (
          <motion.div key={l}
            initial={{ opacity:0, y:30 }}
            animate={statsIn ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.75, delay:i*0.12, ease:E }}
            className="group rounded-[2rem] border border-white/8 p-8 transition hover:border-[#EA9072]/40"
            style={{ background:"rgba(255,255,255,0.03)" }}>
            <motion.div className="text-6xl font-black tracking-[-0.06em]" style={{ color: CORAL }}
              initial={{ opacity:0, scale:0.6 }}
              animate={statsIn ? { opacity:1, scale:1 } : {}}
              transition={{ duration:0.6, delay:i*0.12+0.25, type:"spring" }}>
              {n}
            </motion.div>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-white/35">{l}</p>
          </motion.div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STORY — editorial split
      ══════════════════════════════════════════════════════════════ */}
      <section id="story" ref={storyRef} className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-28 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        {/* Left — big image */}
        <motion.div
          initial={{ opacity:0, x:-40 }}
          animate={storyIn ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.9, ease:E }}
          className="relative min-h-[70vh] overflow-hidden rounded-[2.5rem]">
          <motion.img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90"
            alt="Ember Bun story"
            className="h-full w-full object-cover"
            whileHover={{ scale:1.04 }}
            transition={{ duration:0.7 }}
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(10,7,5,0.85) 0%, transparent 55%)" }} />
          {/* Overlay text */}
          <div className="absolute bottom-8 left-8 right-8">
            <span className="mb-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em]" style={{ color: CORAL }}>
              Est. 2024 · Colombo
            </span>
            <p className="text-2xl font-black tracking-tight text-white/90 md:text-3xl">
              "Proper burgers for people who notice the difference."
            </p>
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity:0, x:40 }}
          animate={storyIn ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.9, delay:0.1, ease:E }}
          className="flex flex-col justify-center py-6">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em]" style={{ color:CORAL }}>Why we exist</p>
          <h2 className="text-5xl font-black leading-[0.88] tracking-[-0.07em] md:text-6xl">
            A burger that smells like the grill before you sit down.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-white/50">
            Ember Bun was built because we were tired of flat frozen patties under heat lamps and sauces from a commercial bottle. We wanted the crust, the cheese pull, the bite that makes you pause and look at the thing.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/40">
            So we built it. Open grill, fresh patties, house sauces, and a rule: nothing gets made until you order it.
          </p>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-3">
            {["No frozen patties","House-made daily","Built after order","Open grill"].map(t => (
              <span key={t} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/55">
                {t}
              </span>
            ))}
          </div>

          <motion.a href="#menu" whileHover={{ x:6 }} transition={{ type:"spring", stiffness:300 }}
            className="mt-10 inline-flex w-fit items-center gap-3 font-black text-white/70 transition hover:text-white">
            View the menu <ArrowRight className="h-5 w-5" style={{ color:CORAL }} />
          </motion.a>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MENU — light cream section
      ══════════════════════════════════════════════════════════════ */}
      <section id="menu" className="relative z-10 rounded-t-[3rem]" style={{ background: CREAM, color: BROWN }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          {/* Header */}
          <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <FadeUp className="max-w-xl">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-black/35">The menu</p>
              <h2 className="text-6xl font-black leading-[0.84] tracking-[-0.08em] md:text-8xl">
                Different cravings. Same serious energy.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="max-w-xs">
              <p className="text-lg leading-relaxed text-black/50">
                Each card is written like a real chef's menu — not a marketing bullet list.
              </p>
            </FadeUp>
          </div>

          {/* Menu item list — editorial style */}
          <div className="space-y-0">
            {BURGERS.map((b, i) => (
              <FadeUp key={b.name} delay={i * 0.08}>
                <motion.div
                  onClick={() => setActiveMenu(activeMenu === i ? -1 : i)}
                  whileHover={{ backgroundColor:"rgba(234,144,114,0.06)" }}
                  className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] border-t border-black/10 p-6 transition last:border-b md:p-8"
                >
                  <div className="flex items-center justify-between gap-6">
                    {/* Left */}
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="w-10 font-black text-black/20 text-lg">{b.no}</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/35 mb-1">{b.type}</p>
                        <h3 className="text-2xl font-black tracking-[-0.04em] md:text-3xl">{b.name}</h3>
                      </div>
                    </div>
                    {/* Right */}
                    <div className="flex items-center gap-8">
                      <span className="hidden text-xl font-black md:block" style={{ color:CORAL }}>{b.price}</span>
                      <motion.div animate={{ rotate: activeMenu === i ? 45 : 0 }} transition={{ duration:0.3 }}
                        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border-2 border-black/15 text-black/40 transition group-hover:border-[#EA9072] group-hover:text-[#EA9072]">
                        <Plus className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable */}
                  <AnimatePresence>
                    {activeMenu === i && (
                      <motion.div
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.45, ease:E }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                          <div className="flex items-start gap-6">
                            {/* Thumbnail */}
                            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl">
                              <img src={b.img} alt={b.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="text-base leading-relaxed text-black/55">{b.desc}</p>
                              <div className="mt-3 flex gap-2">
                                <span className="rounded-full bg-black/8 px-3 py-1 text-xs font-bold">Heat: {b.heat}</span>
                              </div>
                            </div>
                          </div>
                          <a href={`https://wa.me/94706857171?text=Hi, I'd like to order ${encodeURIComponent(b.name)}`}
                            target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-2 self-end rounded-full px-6 py-3 text-sm font-black text-black transition hover:opacity-90"
                            style={{ background:`linear-gradient(135deg, ${CORAL}, #f5b074)` }}>
                            <ShoppingBag className="h-4 w-4" /> Order this
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROCESS — dark, editorial numbered
      ══════════════════════════════════════════════════════════════ */}
      <section id="process" ref={processRef} className="relative z-10" style={{ background: CREAM, color: BROWN }}>
        <div className="mx-auto max-w-7xl px-6 pb-28">
          {/* Full-bleed dark block */}
          <div className="overflow-hidden rounded-[3rem]" style={{ background: DARK }}>
            <div className="px-8 py-16 md:px-14 md:py-20">
              <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <FadeUp className="max-w-xl">
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.3em]" style={{ color:CORAL }}>The process</p>
                  <h2 className="text-5xl font-black leading-[0.88] tracking-[-0.07em] text-white md:text-6xl">
                    From cold patty to your hand. No skipped steps.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1} className="max-w-xs">
                  <p className="text-base leading-relaxed text-white/40">
                    We're not hiding the process. Here it is, step by step, so you know why it takes 12 minutes.
                  </p>
                </FadeUp>
              </div>

              <div className="grid gap-px md:grid-cols-2 lg:grid-cols-4">
                {STEPS.map(({ n, title, body }, i) => (
                  <motion.div key={n}
                    initial={{ opacity:0, y:30 }}
                    animate={processIn ? { opacity:1, y:0 } : {}}
                    transition={{ duration:0.75, delay:i*0.12, ease:E }}
                    whileHover={{ backgroundColor:"rgba(234,144,114,0.05)" }}
                    className="rounded-[2rem] border border-white/6 p-8 transition"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-5xl font-black" style={{ color:CORAL, opacity:0.35 }}>{n}</span>
                    </div>
                    <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-white">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/40">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GALLERY — masonry feel
      ══════════════════════════════════════════════════════════════ */}
      <section id="gallery" ref={galleryRef} className="relative z-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6 pb-28">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <FadeUp>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-black/35">Inside the kitchen</p>
              <h2 className="max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-6xl" style={{ color:BROWN }}>
                Make people hungry before they read a word.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08} className="max-w-xs">
              <p className="text-base leading-relaxed text-black/45">Real shots. No filter hiding anything.</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2 auto-rows-[280px]">
            {/* Big item */}
            <FadeUp delay={0} className="col-span-2 row-span-2">
              <motion.div whileHover={{ scale:1.015 }} transition={{ duration:0.5 }} className="group relative h-full min-h-[320px] overflow-hidden rounded-[2.5rem]">
                <motion.img src={GALLERY[0].img} alt={GALLERY[0].label} className="h-full w-full object-cover" whileHover={{ scale:1.06 }} transition={{ duration:0.7 }} />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(10,7,5,0.7) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xl font-black text-white">{GALLERY[0].label}</p>
                </div>
              </motion.div>
            </FadeUp>
            {/* Smaller items */}
            {GALLERY.slice(1).map(({ img, label }, i) => (
              <FadeUp key={img} delay={(i+1)*0.09} className={i === 2 ? "col-span-2" : ""}>
                <motion.div whileHover={{ scale:1.02 }} transition={{ duration:0.4 }} className="group relative h-full min-h-[130px] overflow-hidden rounded-[2rem]">
                  <motion.img src={img} alt={label} className="h-full w-full object-cover" whileHover={{ scale:1.08 }} transition={{ duration:0.6 }} />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(10,7,5,0.65) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm font-black text-white">{label}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════════════════════ */}
      <section ref={reviewRef} className="relative z-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6 pb-28">
          <div className="overflow-hidden rounded-[3rem] px-8 py-16 md:px-14 md:py-20" style={{ background: DARK }}>
            <FadeUp className="mb-14">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em]" style={{ color:CORAL }}>People talk</p>
              <h2 className="max-w-2xl text-5xl font-black leading-[0.88] tracking-[-0.07em] text-white md:text-6xl">
                The kind of burger that becomes a group chat topic.
              </h2>
            </FadeUp>
            <div className="grid gap-5 md:grid-cols-3">
              {REVIEWS.map(({ q, name, sub }, i) => (
                <motion.div key={name}
                  initial={{ opacity:0, y:28 }}
                  animate={reviewIn ? { opacity:1, y:0 } : {}}
                  transition={{ duration:0.75, delay:i*0.12, ease:E }}
                  whileHover={{ y:-8, borderColor:"rgba(234,144,114,0.35)" }}
                  className="rounded-[2rem] border border-white/8 p-8 transition"
                  style={{ background:"rgba(255,255,255,0.03)" }}>
                  <div className="mb-5 flex gap-1">
                    {[0,1,2,3,4].map(j => <Star key={j} className="h-4 w-4 fill-[#EA9072] text-[#EA9072]" />)}
                  </div>
                  <p className="text-lg font-bold leading-relaxed text-white/70">"{q}"</p>
                  <div className="mt-8 border-t border-white/8 pt-5">
                    <p className="text-sm font-black" style={{ color:CORAL }}>{name}</p>
                    <p className="mt-0.5 text-xs text-white/30">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VISIT / CTA
      ══════════════════════════════════════════════════════════════ */}
      <section id="visit" ref={visitRef} className="relative z-10 pb-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={visitIn ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.85, ease:E }}
            className="overflow-hidden rounded-[3rem] p-10 md:p-16"
            style={{ background:`linear-gradient(135deg, ${CORAL} 0%, #f0a070 50%, #f5c070 100%)` }}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-black/45">Visit · Pre-order · Delivery</p>
                <h2 className="text-6xl font-black leading-[0.84] tracking-[-0.08em] text-black md:text-8xl">
                  Come hungry. Leave quiet.
                </h2>
                <p className="mt-6 max-w-lg text-lg font-bold text-black/55">
                  Walk in, WhatsApp ahead, or get hot delivery for the office. Proper portions. No sad tiny burger energy.
                </p>
              </div>
              <div className="space-y-4">
                {[[MapPin,"Location","Colombo, Sri Lanka"],[Clock,"Open hours","Every day — 11 AM to 11 PM"],[Phone,"WhatsApp","070 685 7171"]].map(([Icon,label,val]) => (
                  <div key={label} className="flex items-center gap-4 rounded-2xl bg-black/10 px-5 py-4 backdrop-blur-sm">
                    <Icon className="h-5 w-5 flex-shrink-0 text-black" />
                    <div>
                      <p className="font-black text-black">{label}</p>
                      <p className="font-bold text-black/60 text-sm">{val}</p>
                    </div>
                  </div>
                ))}
                <motion.a href="https://wa.me/94706857171" target="_blank" rel="noreferrer"
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-5 text-lg font-black text-white shadow-2xl"
                  style={{ background: DARK, boxShadow:"0 20px 50px -10px rgba(10,7,5,0.5)" }}>
                  <MessageCircle className="h-5 w-5" style={{ color:CORAL }} />
                  Order on WhatsApp
                  <ArrowUpRight className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 px-6 pb-8 pt-3" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-black/8 bg-white p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full text-black" style={{ background:`linear-gradient(135deg, ${CORAL}, #f5b074)` }}>
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <p className="font-black" style={{ color:BROWN }}>Ember Bun</p>
                <p className="text-xs text-black/35">Burger House · Colombo</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-[0.22em] text-black/35">
              {["story","menu","process","gallery","visit"].map(l => (
                <a key={l} href={`#${l}`} className="capitalize transition hover:text-black">{l}</a>
              ))}
            </div>
            <motion.a href="https://wa.me/94706857171" target="_blank" rel="noreferrer"
              whileHover={{ scale:1.05 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-black transition"
              style={{ background:`linear-gradient(135deg, ${CORAL}, #f5b074)` }}>
              <MessageCircle className="h-4 w-4" /> Order Now
            </motion.a>
          </div>
          <div className="mt-6 border-t border-black/8 pt-5 text-xs text-black/25">
            © 2025 Ember Bun · Built for people who take burgers seriously
          </div>
        </div>
      </footer>
    </div>
  );
}