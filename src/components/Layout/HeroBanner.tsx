import { useState, useEffect, useRef } from "react";
import { ChevronDown, Compass } from "lucide-react";

const taglines = [
  "Life is short. Make it legendary.",
  "The epic bro trip planner by TLC.",
  "Fortune favors the bold.",
];

const HeroBanner = () => {
  const [typedText, setTypedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          if (data.city) setUserCity(data.city);
        }
      } catch { /* silent */ }
    };
    fetchCity();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setTypedText(taglines[0]); return; }

    const current = taglines[taglineIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && typedText === current) { setTimeout(() => setIsDeleting(true), 2500); return; }
    if (isDeleting && typedText === "") { setIsDeleting(false); setTaglineIndex((p) => (p + 1) % taglines.length); return; }

    const timer = setTimeout(() => {
      setTypedText(isDeleting ? current.substring(0, typedText.length - 1) : current.substring(0, typedText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, taglineIndex]);

  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handleMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative w-full h-[92vh] min-h-[640px] overflow-hidden flex items-center justify-center" aria-label="Hero banner">
      {/* Cinematic deep base */}
      <div className="absolute inset-0 bg-[hsl(225,14%,5%)]" />

      {/* Layered parallax glow orbs */}
      <div
        className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full opacity-60 motion-reduce:hidden"
        style={{
          background: "radial-gradient(circle, hsl(40 72% 52% / 0.18), transparent 60%)",
          transform: `translate3d(${parallax.x * -40}px, ${parallax.y * -30}px, 0)`,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-20 w-[55vw] h-[55vw] rounded-full opacity-50 motion-reduce:hidden"
        style={{
          background: "radial-gradient(circle, hsl(22 65% 48% / 0.22), transparent 60%)",
          transform: `translate3d(${parallax.x * 50}px, ${parallax.y * 35}px, 0)`,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(40 72% 52% / 0.5) 2px, hsl(40 72% 52% / 0.5) 3px)`
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" aria-hidden="true" />

      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden motion-reduce:hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="ember-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{
          transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 8}px, 0)`,
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-[0.3em] uppercase font-sans backdrop-blur-sm">
            <Compass className="w-3 h-3 animate-compass-wobble" />
            Memento Mori
          </span>
        </div>

        {userCity && (
          <p className="text-sm text-primary/70 font-medium tracking-widest mb-6 animate-fade-in-up uppercase font-sans">
            Your next legend awaits near {userCity}
          </p>
        )}

        <h1
          className="font-display text-7xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tight leading-[0.85] mb-6 gold-gradient-text"
          style={{ filter: 'drop-shadow(0 6px 30px hsl(40 72% 52% / 0.25)) drop-shadow(0 2px 10px hsl(0 0% 0% / 0.6))' }}
        >
          LEGENDS
        </h1>

        <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-6" />

        <div className="h-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-foreground/80 font-light tracking-wide font-display italic leading-relaxed" aria-live="polite">
            {typedText}
            <span className="inline-block w-[2px] h-5 bg-primary/60 ml-1 animate-pulse motion-reduce:hidden" aria-hidden="true" />
          </p>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContent}
            className="ripple-btn premium-btn btn-3d px-10 py-4 rounded-lg text-sm"
          >
            Explore Adventures
          </button>
          <button
            onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 border border-border/60 text-foreground/80 font-semibold rounded-lg hover:border-primary/50 hover:text-foreground hover:bg-primary/5 transition-all text-sm tracking-[0.18em] uppercase font-sans backdrop-blur-sm"
          >
            View Map
          </button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce motion-reduce:animate-none" />
      </button>
    </section>
  );
};

export default HeroBanner;
