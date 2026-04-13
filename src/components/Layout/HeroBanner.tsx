import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex items-center justify-center" aria-label="Hero banner">
      {/* Dark cinematic BG */}
      <div className="absolute inset-0 bg-[hsl(220,15%,4%)]" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 30%, hsl(40 72% 52% / 0.06) 0%, transparent 70%)"
      }} />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(40 72% 52% / 0.04) 2px, hsl(40 72% 52% / 0.04) 4px)`
      }} />

      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden motion-reduce:hidden" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="ember-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="inline-block px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-[0.3em] uppercase font-sans">
            Memento Mori
          </span>
        </div>

        {userCity && (
          <p className="text-sm text-primary/60 font-medium tracking-widest mb-6 animate-fade-in-up uppercase font-sans">
            Your next legend awaits near {userCity}
          </p>
        )}

        <h1 className="font-display text-7xl md:text-[10rem] lg:text-[14rem] font-bold text-foreground tracking-tight leading-[0.85] mb-6" style={{ textShadow: '0 4px 30px hsl(40 72% 52% / 0.15), 0 2px 10px hsl(0 0% 0% / 0.5)' }}>
          LEGENDS
        </h1>

        <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />

        <div className="h-8 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide font-display italic leading-relaxed" aria-live="polite">
            {typedText}
            <span className="inline-block w-[2px] h-5 bg-primary/50 ml-1 animate-pulse motion-reduce:hidden" aria-hidden="true" />
          </p>
        </div>

        <div className="mt-14 flex items-center justify-center gap-4">
          <button
            onClick={scrollToContent}
            className="ripple-btn px-10 py-4 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all btn-3d shadow-[0_4px_30px_hsl(var(--gold)/0.3)] text-sm tracking-widest uppercase font-sans"
          >
            Explore Adventures
          </button>
          <button
            onClick={scrollToContent}
            className="px-10 py-4 border border-border text-foreground/70 font-medium rounded-lg hover:border-primary/40 hover:text-foreground transition-all text-sm tracking-widest uppercase font-sans"
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
