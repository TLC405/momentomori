import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import headerGuys from "@/assets/header-guys-adventure.png";

const taglines = [
  "Life is short. Make it legendary.",
  "The bucket list engine for the brotherhood.",
  "Where legends are made, not born.",
];

const HeroBanner = () => {
  const [typedText, setTypedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userCity, setUserCity] = useState<string | null>(null);

  // Geolocation-aware headline
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          if (data.city) setUserCity(data.city);
        }
      } catch {
        // Silent fail — just use default headline
      }
    };
    fetchCity();
  }, []);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedText(taglines[0]);
      return;
    }

    const currentTagline = taglines[taglineIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && typedText === currentTagline) {
      setTimeout(() => setIsDeleting(true), 2500);
      return;
    }
    if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentTagline.substring(0, typedText.length - 1)
          : currentTagline.substring(0, typedText.length + 1)
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, taglineIndex]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex items-center justify-center" aria-label="Hero banner">
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ backgroundImage: `url(${headerGuys})` }}
        role="img"
        aria-label="Adventure crew illustration — friends enjoying epic outdoor experiences"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 60px hsl(var(--background))' }} />

      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden motion-reduce:hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="ember-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Memento Mori
          </span>
        </div>

        {/* Dynamic geo-aware subtitle */}
        {userCity && (
          <p className="text-sm md:text-base text-primary/80 font-medium tracking-wide mb-4 animate-fade-in-up">
            Ready for your next legend near {userCity}?
          </p>
        )}

        <h1 className="font-display text-7xl md:text-[10rem] lg:text-[14rem] font-black text-foreground tracking-tighter leading-[0.85] mb-6 drop-shadow-[0_4px_30px_hsl(var(--primary)/0.2)]">
          BEFORE
          <br />
          <span className="shimmer-text">YOU GO</span>
        </h1>

        <div className="h-8 flex items-center justify-center">
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide" aria-live="polite">
            {typedText}
            <span className="inline-block w-[2px] h-5 bg-primary/60 ml-1 animate-pulse motion-reduce:hidden" aria-hidden="true" />
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={scrollToContent}
            className="ripple-btn px-8 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl hover:brightness-110 transition-all btn-3d shadow-[0_4px_30px_hsl(var(--primary)/0.35)] text-sm tracking-wide"
          >
            Explore Adventures
          </button>
          <button
            onClick={scrollToContent}
            className="px-8 py-3.5 border border-border/50 text-foreground font-medium rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-sm tracking-wide"
          >
            View Map
          </button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce motion-reduce:animate-none" />
      </button>
    </section>
  );
};

export default HeroBanner;
