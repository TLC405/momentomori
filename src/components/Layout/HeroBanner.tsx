import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import headerGuys from "@/assets/header-guys-adventure.png";

const taglines = [
  "Life is short. Make it legendary.",
  "The bucket list engine for the brotherhood.",
  "Remember you must die — so LIVE first.",
];

const HeroBanner = () => {
  const [typedText, setTypedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEmbers, setShowEmbers] = useState(true);

  useEffect(() => {
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
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ backgroundImage: `url(${headerGuys})` }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      
      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 60px hsl(var(--background))' }} />

      {/* Ember particles */}
      {showEmbers && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Memento Mori
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tight leading-[0.9] mb-6">
          BEFORE
          <br />
          <span className="shimmer-text">YOU GO</span>
        </h1>

        <div className="h-8 flex items-center justify-center">
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
            {typedText}
            <span className="inline-block w-[2px] h-5 bg-primary/60 ml-1 animate-pulse" />
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

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroBanner;