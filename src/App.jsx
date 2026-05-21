import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  CheckCircle2,
} from "lucide-react";

const CORAL = "#EA9072";
const DARK = "#0A0705";
const CREAM = "#F5EDE4";
const BROWN = "#1A0F08";
const E = [0.16, 1, 0.3, 1];

const BURGERS = [
  {
    name: "The Smokehouse",
    type: "Signature Beef",
    price: "Rs. 1,450",
    heat: "Medium",
    desc: "Double smashed beef, aged cheddar, caramelised onion, smoked mayo on toasted brioche. The one that made us regulars.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90",
    no: "01",
  },
  {
    name: "Crispy Clucker",
    type: "Fried Chicken",
    price: "Rs. 1,250",
    heat: "Hot",
    desc: "Buttermilk fried chicken thigh, pickles, slaw, honey-chilli glaze, garlic aioli. Crispy even after delivery.",
    img: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=1200&q=90",
    no: "02",
  },
  {
    name: "Midnight Melt",
    type: "Cheese Loaded",
    price: "Rs. 1,590",
    heat: "Mild",
    desc: "Beef patty, triple cheese pull, grilled mushrooms, black pepper sauce, crispy onion rings. Dangerous after dark.",
    img: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=90",
    no: "03",
  },
  {
    name: "Green Beast",
    type: "Plant-based",
    price: "Rs. 1,050",
    heat: "Fresh",
    desc: "Crispy veggie patty, avocado herb sauce, fresh lettuce, tomato, charred onion relish. Doesn't apologise for being veggie.",
    img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=90",
    no: "04",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Cold patty, hot grill",
    body: "Each beef patty hits a scorching surface and gets pressed hard. Crispy edges. Juicy centre. Real crust — not microwaved brown.",
  },
  {
    n: "02",
    title: "Sauces made in-house",
    body: "Smoked mayo, garlic aioli, pepper sauce, honey-chilli glaze — mixed fresh daily. Nothing here comes from a commercial bottle.",
  },
  {
    n: "03",
    title: "Built only after you order",
    body: "No burgers waiting around. Your order triggers the build. Bun toasted, cheese melted, stacked, wrapped, yours.",
  },
  {
    n: "04",
    title: "Hot in your hand",
    body: "Walk in, WhatsApp ahead for pickup, or get hot delivery for office lunches and group orders. 12 minutes average.",
  },
];

const REVIEWS = [
  {
    q: "The Smokehouse is the messiest and best thing I've eaten in Colombo. That patty crust was unreal.",
    name: "Naveen R.",
    sub: "Food writer",
  },
  {
    q: "Ordered the Clucker for delivery and it arrived crispy. That almost never happens. Sauce is genuinely great.",
    name: "Kavindi S.",
    sub: "Regular",
  },
  {
    q: "Big portions, proper flavour, and they actually reply fast on WhatsApp. That combination is rare.",
    name: "Dilan M.",
    sub: "Office lunch organiser",
  },
];

const GALLERY = [
  {
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1400&q=90",
    label: "The grill",
  },
  {
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=90",
    label: "Stacked",
  },
  {
    img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=90",
    label: "Sides",
  },
  {
    img: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1400&q=90",
    label: "Late night",
  },
];

function useReveal(opts = {}) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-80px", ...opts });
  return { ref, seen };
}

function FadeUp({ children, delay = 0, className = "", from = { opacity: 0, y: 48 }, opts = {} }) {
  const { ref, seen } = useReveal(opts);

  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={seen ? { opacity: 1, y: 0, x: 0 } : from}
      transition={{ duration: 1.05, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Grain = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03]"
    style={{
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      backgroundRepeat: "repeat",
      backgroundSize: "200px",
    }}
  />
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [activeMenu, setActiveMenu] = useState(0);

  const cursorX = useSpring(mouse.x, { stiffness: 110, damping: 22 });
  const cursorY = useSpring(mouse.y, { stiffness: 110, damping: 22 });

  const heroTextY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const heroImgY = useTransform(scrollYProgress, [0, 0.4], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const statsRef = useRef(null);
  const storyRef = useRef(null);
  const processRef = useRef(null);
  const reviewRef = useRef(null);
  const visitRef = useRef(null);
  const galleryRef = useRef(null);

  const statsIn = useInView(statsRef, { once: true, margin: "-60px" });
  const storyIn = useInView(storyRef, { once: true, margin: "-80px" });
  const processIn = useInView(processRef, { once: true, margin: "-60px" });
  const reviewIn = useInView(reviewRef, { once: true, margin: "-60px" });
  const visitIn = useInView(visitRef, { once: true, margin: "-60px" });
  const galleryIn = useInView(galleryRef, { once: true, margin: "-60px" });

  return (
    <div
      style={{ fontFamily: "'Manrope', sans-serif", background: DARK }}
      className="relative min-h-screen overflow-x-hidden text-white selection:bg-[#EA9072] selection:text-black"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap');

        html { scroll-behavior: smooth; }
        body { font-family: 'Manrope', sans-serif; letter-spacing: -0.01em; }
        h1, h2, h3, .display-font {
          font-family: 'Sora', sans-serif;
          font-feature-settings: 'kern' 1, 'liga' 1;
          text-rendering: geometricPrecision;
        }
        p { text-wrap: pretty; }
        ::selection { background: #EA9072; color: #000; }

        .luxury-cta {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition: transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s cubic-bezier(.16,1,.3,1), opacity .3s ease;
        }
        .luxury-cta::after {
          content: '';
          position: absolute;
          inset: -60% -40%;
          z-index: -1;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%);
          transform: translateX(-140%) rotate(8deg);
          transition: transform .95s cubic-bezier(.16,1,.3,1);
        }
        .luxury-cta:hover::after { transform: translateX(140%) rotate(8deg); }

        .luxury-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          box-shadow: 0 28px 90px -62px rgba(0,0,0,.75);
          transition: transform .55s cubic-bezier(.16,1,.3,1), border-color .55s cubic-bezier(.16,1,.3,1), box-shadow .55s cubic-bezier(.16,1,.3,1), background-color .55s cubic-bezier(.16,1,.3,1);
        }
        .luxury-card:hover { box-shadow: 0 38px 110px -58px rgba(234,144,114,.34); }
        .soft-copy { line-height: 1.78; letter-spacing: -0.01em; }
        .micro-title { letter-spacing: .28em; }
      `}</style>

      <Grain />

      <motion.div
        className="pointer-events-none fixed z-[55] hidden rounded-full mix-blend-difference md:block"
        style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%", width: 14, height: 14, background: "white" }}
      />
      <motion.div
        className="pointer-events-none fixed z-[54] hidden rounded-full border border-white/30 md:block"
        style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%", width: 44, height: 44 }}
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.36, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-[8%] h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,144,114,0.26) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,200,100,0.18) 0%, transparent 70%)" }}
        />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: E }}
        className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10"
      >
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{ background: "rgba(10,7,5,0.72)", maskImage: "linear-gradient(to bottom, black 80%, transparent)" }}
        />

        <a href="#top" className="relative z-10 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="grid h-10 w-10 place-items-center rounded-full text-black shadow-lg"
            style={{ background: `linear-gradient(135deg, ${CORAL}, #f5b98e)` }}
          >
            <Flame className="h-4 w-4" />
          </motion.div>
          <div>
            <span className="block font-black leading-none tracking-tight">Ember Bun</span>
            <span className="micro-title block text-[9px] uppercase text-white/40">Burger House</span>
          </div>
        </a>

        <div className="relative z-10 hidden items-center gap-10 text-xs font-bold uppercase tracking-[0.25em] text-white/45 md:flex">
          {["story", "menu", "process", "gallery", "visit"].map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="capitalize transition duration-300 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = CORAL;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              {l}
            </a>
          ))}
        </div>

        <motion.a
          href="https://wa.me/94706857171"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="luxury-cta relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-black"
          style={{ background: `linear-gradient(135deg, ${CORAL}, #f0b080)` }}
        >
          <MessageCircle className="h-4 w-4" /> Order
        </motion.a>
      </motion.nav>

      <section id="top" className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2000&q=90"
            alt="Ember Bun hero"
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.38) saturate(1.1)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(10,7,5,0.2) 0%, rgba(10,7,5,0.1) 40%, rgba(10,7,5,0.95) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(234,144,114,0.12) 0%, transparent 65%)" }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-24 md:px-14 md:pb-36"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute left-1/2 top-28 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="micro-title text-[10px] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.7, repeat: Infinity }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>

          <div className="mx-auto w-full max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: E }}
              className="micro-title mb-7 text-sm font-bold uppercase"
              style={{ color: CORAL }}
            >
              Smash burgers · Hot grill · Colombo
            </motion.p>

            <div className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.4, ease: E }}
                className="text-[18vw] font-black leading-[0.9] tracking-[-0.04em] md:text-[12vw] lg:text-[9.5vw]"
              >
                Burgers
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.55, ease: E }}
                className="text-[18vw] font-black leading-[0.9] tracking-[-0.04em] md:text-[12vw] lg:text-[9.5vw]"
                style={{ color: CORAL }}
              >
                made right.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: E }}
              className="mt-14 flex flex-col items-start justify-between gap-10 border-t border-white/[0.10] pt-10 md:flex-row md:items-end"
            >
              <p className="soft-copy max-w-sm text-base text-white/60 md:text-lg">
                Hot smashed patties, house-made sauces, toasted buns — and every single burger built only after you order.
              </p>
              <div className="flex flex-wrap gap-6">
                <motion.a
                  href="#menu"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="luxury-cta group inline-flex items-center gap-3 rounded-full px-8 py-4 font-black text-black shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${CORAL} 0%, #f5b074 100%)`, boxShadow: "0 20px 60px -10px rgba(234,144,114,0.5)" }}
                >
                  See the Menu <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </motion.a>
                <motion.a
                  href="https://wa.me/94706857171"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="luxury-cta inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-8 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.15]"
                >
                  <MessageCircle className="h-4 w-4" style={{ color: CORAL }} /> Order on WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 overflow-hidden border-y border-white/[0.08] py-5" style={{ background: "rgba(234,144,114,0.07)" }}>
        <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="micro-title mx-10 inline-flex items-center gap-7 text-sm font-bold uppercase text-white/42">
              Smash burgers <span style={{ color: CORAL }}>✦</span>
              House sauces <span style={{ color: CORAL }}>✦</span>
              Built to order <span style={{ color: CORAL }}>✦</span>
              Hot grill <span style={{ color: CORAL }}>✦</span>
              Colombo <span style={{ color: CORAL }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <section ref={statsRef} className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 py-32 md:grid-cols-4 md:py-40">
        {[
          ["2×", "Smash patty options"],
          ["7", "House-made sauces"],
          ["12 min", "Avg. serve time"],
          ["4.9★", "Customer rating"],
        ].map(([n, l], i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 30 }}
            animate={statsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12, ease: E }}
            whileHover={{ y: -10, scale: 1.015 }}
            className="luxury-card group rounded-[2rem] border border-white/[0.08] p-9 transition hover:border-[#EA9072]/40"
            style={{ background: "rgba(255,255,255,0.035)" }}
          >
            <motion.div
              className="display-font text-6xl font-black tracking-[-0.035em]"
              style={{ color: CORAL }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={statsIn ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.25, type: "spring" }}
            >
              {n}
            </motion.div>
            <p className="micro-title mt-4 text-sm font-bold uppercase text-white/42">{l}</p>
          </motion.div>
        ))}
      </section>

      <section id="story" ref={storyRef} className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 pb-40 md:pb-48 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={storyIn ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: E }}
          className="relative min-h-[70vh] overflow-hidden rounded-[2.8rem]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90"
            alt="Ember Bun story"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.95, ease: E }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,7,5,0.85) 0%, transparent 55%)" }} />
          <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10">
            <span className="micro-title mb-4 inline-block rounded-full border border-white/20 px-5 py-2 text-xs font-black uppercase" style={{ color: CORAL }}>
              Est. 2024 · Colombo
            </span>
            <p className="text-2xl font-black tracking-tight text-white/90 md:text-3xl">
              "Proper burgers for people who notice the difference."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={storyIn ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: E }}
          className="flex flex-col justify-center py-8"
        >
          <p className="micro-title mb-7 text-sm font-bold uppercase" style={{ color: CORAL }}>
            Why we exist
          </p>
          <h2 className="text-5xl font-black leading-[0.96] tracking-[-0.04em] md:text-6xl">
            A burger that smells like the grill before you sit down.
          </h2>
          <p className="soft-copy mt-9 text-lg text-white/58">
            Ember Bun was built because we were tired of flat frozen patties under heat lamps and sauces from a commercial bottle. We wanted the crust, the cheese pull, the bite that makes you pause and look at the thing.
          </p>
          <p className="soft-copy mt-6 text-lg text-white/48">
            So we built it. Open grill, fresh patties, house sauces, and a rule: nothing gets made until you order it.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {["No frozen patties", "House-made daily", "Built after order", "Open grill"].map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white/58">
                {t}
              </span>
            ))}
          </div>

          <motion.a
            href="#menu"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 280 }}
            className="mt-12 inline-flex w-fit items-center gap-3 font-black text-white/72 transition hover:text-white"
          >
            View the menu <ArrowRight className="h-5 w-5" style={{ color: CORAL }} />
          </motion.a>
        </motion.div>
      </section>

      <section id="menu" className="relative z-10 rounded-t-[3.2rem]" style={{ background: CREAM, color: BROWN }}>
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <div className="mb-24 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <FadeUp className="max-w-xl">
              <p className="micro-title mb-5 text-sm font-black uppercase text-black/42">The menu</p>
              <h2 className="text-6xl font-black leading-[0.98] tracking-[-0.04em] md:text-8xl">
                Different cravings. Same serious energy.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="max-w-xs">
              <p className="soft-copy text-lg text-black/58">
                Each card is written like a real chef's menu — not a marketing bullet list.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-3">
            {BURGERS.map((b, i) => (
              <FadeUp key={b.name} delay={i * 0.08}>
                <motion.div
                  onClick={() => setActiveMenu(activeMenu === i ? -1 : i)}
                  whileHover={{ y: -3, backgroundColor: "rgba(234,144,114,0.06)" }}
                  transition={{ duration: 0.45, ease: E }}
                  className="group relative cursor-pointer overflow-hidden rounded-[1.7rem] border border-black/[0.08] p-7 transition md:p-10"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-7 md:gap-12">
                      <span className="display-font w-10 text-lg font-black text-black/20">{b.no}</span>
                      <div>
                        <p className="micro-title mb-2 text-xs font-bold uppercase text-black/42">{b.type}</p>
                        <h3 className="text-2xl font-black tracking-[-0.035em] md:text-3xl">{b.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="hidden text-xl font-black md:block" style={{ color: CORAL }}>
                        {b.price}
                      </span>
                      <motion.div
                        animate={{ rotate: activeMenu === i ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: E }}
                        className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border-2 border-black/15 text-black/40 transition group-hover:border-[#EA9072] group-hover:text-[#EA9072]"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeMenu === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: E }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                          <div className="flex items-start gap-7">
                            <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-3xl">
                              <motion.img src={b.img} alt={b.name} className="h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: E }} />
                            </div>
                            <div>
                              <p className="soft-copy text-base text-black/58">{b.desc}</p>
                              <div className="mt-4 flex gap-2">
                                <span className="rounded-full bg-black/[0.08] px-4 py-1.5 text-xs font-bold">Heat: {b.heat}</span>
                              </div>
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/94706857171?text=Hi, I'd like to order ${encodeURIComponent(b.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="luxury-cta inline-flex items-center gap-2 self-end rounded-full px-6 py-3 text-sm font-black text-black transition hover:opacity-90"
                            style={{ background: `linear-gradient(135deg, ${CORAL}, #f5b074)` }}
                          >
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

      <section id="process" ref={processRef} className="relative z-10" style={{ background: CREAM, color: BROWN }}>
        <div className="mx-auto max-w-7xl px-6 pb-40 md:pb-48">
          <div className="overflow-hidden rounded-[3.2rem]" style={{ background: DARK }}>
            <div className="px-8 py-20 md:px-16 md:py-24">
              <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <FadeUp className="max-w-xl">
                  <p className="micro-title mb-5 text-sm font-black uppercase" style={{ color: CORAL }}>
                    The process
                  </p>
                  <h2 className="text-5xl font-black leading-[0.96] tracking-[-0.04em] text-white md:text-6xl">
                    From cold patty to your hand. No skipped steps.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1} className="max-w-xs">
                  <p className="soft-copy text-base text-white/48">
                    We're not hiding the process. Here it is, step by step, so you know why it takes 12 minutes.
                  </p>
                </FadeUp>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {STEPS.map(({ n, title, body }, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, y: 30 }}
                    animate={processIn ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: E }}
                    whileHover={{ y: -8, scale: 1.012, backgroundColor: "rgba(234,144,114,0.06)" }}
                    className="luxury-card rounded-[2rem] border border-white/[0.06] p-9 transition"
                  >
                    <div className="mb-10 flex items-center justify-between">
                      <span className="display-font text-5xl font-black" style={{ color: CORAL, opacity: 0.35 }}>
                        {n}
                      </span>
                    </div>
                    <h3 className="text-xl font-black leading-[1.18] tracking-[-0.02em] text-white">{title}</h3>
                    <p className="soft-copy mt-5 text-sm text-white/48">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" ref={galleryRef} className="relative z-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6 pb-40 md:pb-48">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <FadeUp>
              <p className="micro-title mb-5 text-sm font-black uppercase text-black/42">Inside the kitchen</p>
              <h2 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl" style={{ color: BROWN }}>
                Let the kitchen do the talking.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08} className="max-w-xs">
              <p className="soft-copy text-base text-black/52">Real grill, real sauce, real rush-hour cravings.</p>
            </FadeUp>
          </div>

          <div className="grid auto-rows-[280px] grid-cols-2 gap-6 md:grid-cols-4 md:grid-rows-2">
            <FadeUp delay={0} className="col-span-2 row-span-2">
              <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.55, ease: E }} className="group relative h-full min-h-[320px] overflow-hidden rounded-[2.8rem]">
                <motion.img src={GALLERY[0].img} alt={GALLERY[0].label} className="h-full w-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.85, ease: E }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,7,5,0.72) 0%, transparent 55%)" }} />
                <div className="absolute bottom-7 left-7">
                  <p className="text-xl font-black text-white">{GALLERY[0].label}</p>
                </div>
              </motion.div>
            </FadeUp>

            {GALLERY.slice(1).map(({ img, label }, i) => (
              <FadeUp key={img} delay={(i + 1) * 0.09} className={i === 2 ? "col-span-2" : ""}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.45, ease: E }} className="group relative h-full min-h-[130px] overflow-hidden rounded-[2.1rem]">
                  <motion.img src={img} alt={label} className="h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.75, ease: E }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,7,5,0.68) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-sm font-black text-white">{label}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section ref={reviewRef} className="relative z-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6 pb-40 md:pb-48">
          <div className="overflow-hidden rounded-[3.2rem] px-8 py-20 md:px-16 md:py-24" style={{ background: DARK }}>
            <FadeUp className="mb-16">
              <p className="micro-title mb-5 text-sm font-bold uppercase" style={{ color: CORAL }}>
                People talk
              </p>
              <h2 className="max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.04em] text-white md:text-6xl">
                Burgers people remember after the last bite.
              </h2>
            </FadeUp>
            <div className="grid gap-8 md:grid-cols-3">
              {REVIEWS.map(({ q, name, sub }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 28 }}
                  animate={reviewIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: E }}
                  whileHover={{ y: -10, scale: 1.015, borderColor: "rgba(234,144,114,0.38)" }}
                  className="luxury-card rounded-[2rem] border border-white/[0.08] p-9 transition"
                  style={{ background: "rgba(255,255,255,0.035)" }}
                >
                  <div className="mb-6 flex gap-1">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <Star key={j} className="h-4 w-4 fill-[#EA9072] text-[#EA9072]" />
                    ))}
                  </div>
                  <p className="soft-copy text-lg font-bold text-white/72">"{q}"</p>
                  <div className="mt-9 border-t border-white/[0.08] pt-6">
                    <p className="text-sm font-black" style={{ color: CORAL }}>
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-white/35">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="visit" ref={visitRef} className="relative z-10 pb-12" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visitIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, ease: E }}
            className="overflow-hidden rounded-[3.2rem] p-12 md:p-20"
            style={{ background: `linear-gradient(135deg, ${CORAL} 0%, #f0a070 50%, #f5c070 100%)` }}
          >
            <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="micro-title mb-7 text-sm font-black uppercase text-black/52">Visit · Pre-order · Delivery</p>
                <h2 className="text-6xl font-black leading-[0.98] tracking-[-0.04em] text-black md:text-8xl">
                  Come hungry. Leave quiet.
                </h2>
                <p className="soft-copy mt-8 max-w-lg text-lg font-bold text-black/58">
                  Walk in, WhatsApp ahead, or get hot delivery for the office. Proper portions. No sad tiny burger energy.
                </p>
              </div>
              <div className="space-y-5">
                {[
                  [MapPin, "Location", "Colombo, Sri Lanka"],
                  [Clock, "Open hours", "Every day — 11 AM to 11 PM"],
                  [Phone, "WhatsApp", "070 685 7171"],
                ].map(([Icon, label, val]) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 6, backgroundColor: "rgba(0,0,0,0.14)" }}
                    transition={{ duration: 0.35, ease: E }}
                    className="flex items-center gap-5 rounded-3xl bg-black/[0.10] px-6 py-5 backdrop-blur-sm"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 text-black" />
                    <div>
                      <p className="font-black text-black">{label}</p>
                      <p className="text-sm font-bold text-black/60">{val}</p>
                    </div>
                  </motion.div>
                ))}
                <motion.a
                  href="https://wa.me/94706857171"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="luxury-cta inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-5 text-lg font-black text-white shadow-2xl"
                  style={{ background: DARK, boxShadow: "0 20px 50px -10px rgba(10,7,5,0.5)" }}
                >
                  <MessageCircle className="h-5 w-5" style={{ color: CORAL }} />
                  Order on WhatsApp
                  <ArrowUpRight className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 px-6 pb-10 pt-10" style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: E }}
            className="border-t border-black/[0.10] pt-14 md:pt-16"
          >
            <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-16">
              <div>
                <motion.a
                  href="#top"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="mb-8 inline-flex items-center gap-4"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full text-black shadow-lg shadow-black/5"
                    style={{ background: `linear-gradient(135deg, ${CORAL}, #f5b074)` }}
                  >
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black leading-none tracking-[-0.045em]" style={{ color: BROWN }}>
                      Ember Bun
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.36em] text-black/35">
                      Burger House
                    </p>
                  </div>
                </motion.a>

                <p className="max-w-sm text-[15px] leading-8 text-black/50 md:text-base">
                  Colombo's bold burger house. Hot grill, house sauces, toasted buns, and every stack built only after you order.
                </p>

                <div className="mt-9 flex gap-3">
                  <motion.a
                    href="https://wa.me/94706857171"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="grid h-11 w-11 place-items-center rounded-full bg-black/[0.06] text-black/50 transition hover:text-black"
                    aria-label="WhatsApp Ember Bun"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="tel:0706857171"
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="grid h-11 w-11 place-items-center rounded-full bg-black/[0.06] text-black/50 transition hover:text-black"
                    aria-label="Call Ember Bun"
                  >
                    <Phone className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>

              <div>
                <p className="mb-8 text-[12px] font-black uppercase tracking-[0.42em] text-black/35">
                  Navigate
                </p>
                <ul className="space-y-5">
                  {[
                    ["Our story", "#story"],
                    ["The menu", "#menu"],
                    ["How it works", "#process"],
                    ["Gallery", "#gallery"],
                    ["Visit us", "#visit"],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <motion.a
                        href={href}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 350, damping: 24 }}
                        className="inline-flex items-center gap-2 text-[15px] font-medium leading-7 text-black/50 transition hover:text-black md:text-base"
                      >
                        {label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-8 text-[12px] font-black uppercase tracking-[0.42em] text-black/35">
                  Contact
                </p>
                <ul className="space-y-5">
                  {[
                    [MapPin, "Colombo, Sri Lanka"],
                    [Clock, "Open daily · 11 AM – 11 PM"],
                    [Phone, "070 685 7171"],
                  ].map(([Icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-[15px] font-medium leading-7 text-black/50 md:text-base">
                      <Icon className="h-5 w-5 flex-shrink-0" style={{ color: CORAL }} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="https://wa.me/94706857171"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-white shadow-xl shadow-black/10"
                  style={{ background: DARK }}
                >
                  <MessageCircle className="h-4 w-4" style={{ color: CORAL }} />
                  Order Now
                </motion.a>
              </div>

              <div>
                <p className="mb-8 text-[12px] font-black uppercase tracking-[0.42em] text-black/35">
                  Our Promise
                </p>
                <ul className="space-y-5">
                  {[
                    "100% freshly grilled",
                    "House-made sauces",
                    "Built only after you order",
                    "Hot pickup & delivery",
                    "Big portions, no shortcuts",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium leading-7 text-black/50 md:text-base">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: CORAL }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-black/[0.10] pt-9">
              <div className="grid items-center gap-8 md:grid-cols-3">
                <p className="text-center text-xs font-medium tracking-wide text-black/35 md:text-left">
                  © 2025 Ember Bun · All rights reserved
                </p>

                <motion.a
                  href="https://vasterglobal.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    y: -4,
                    scale: 1.025,
                    boxShadow: "0 20px 46px -18px rgba(10,7,5,0.35), 0 0 36px rgba(234,144,114,0.14)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="mx-auto flex w-fit items-center gap-4 rounded-2xl border border-black/[0.10] bg-white/90 px-6 py-4 shadow-lg shadow-black/5 backdrop-blur-sm transition"
                  aria-label="Visit Vaster Global website"
                >
                  <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.42em] text-black/35">
                    Developed by
                  </span>

                  <svg
                    viewBox="0 0 260 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-auto"
                    aria-label="Vaster"
                  >
                    <path d="M2 8 L16 8 L28 40 L40 8 L54 8 L34 50 L22 50 Z" fill="#E31E25" />
                    <path d="M50 50 L64 8 L78 8 L92 50 L78 50 L74 38 L68 38 L64 50 Z" fill="#E31E25" />
                    <path d="M69 28 L71 18 L75 28 Z" fill="#F5EDE4" />
                    <path d="M96 40 C97 47 102 50 112 50 L124 50 C134 50 136 44 136 39 C136 33 130 30 122 28 L114 26 C108 24 106 22 106 19 C106 15 109 13 116 13 L128 13 C132 13 134 10 134 8 L98 8 C98 13 102 16 110 18 L118 20 C126 22 128 25 128 30 C128 35 124 37 116 37 L104 37 C100 37 99 38 99 41 Z" fill="#E31E25" />
                    <path d="M132 8 L132 18 L146 18 L146 50 L160 50 L160 18 L174 18 L174 8 Z" fill="#E31E25" />
                    <path d="M178 8 L178 50 L202 50 L202 41 L191 41 L191 33 L200 33 L200 25 L191 25 L191 17 L202 17 L202 8 Z" fill="#E31E25" />
                    <path d="M206 8 L206 50 L220 50 L220 35 L225 35 L236 50 L252 50 L238 33 C244 31 248 26 248 20 C248 13 243 8 233 8 Z M220 18 L231 18 C235 18 236 20 236 22 C236 25 234 28 231 28 L220 28 Z" fill="#E31E25" />
                  </svg>

                  <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.34em] text-black/35">
                    Global
                  </span>
                </motion.a>

                <div className="flex justify-center gap-7 text-xs font-medium tracking-wide text-black/35 md:justify-end">
                  <a href="#" className="transition hover:text-black/60">Privacy</a>
                  <a href="#" className="transition hover:text-black/60">Terms</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

