const phrases = [
  "VITA BREVIS",
  "FORTIS FORTUNA ADIUVAT",
  "CARPE DIEM",
  "MEMENTO MORI",
  "ARS LONGA",
  "DUM VIVIMUS VIVAMUS",
  "AUDENTES FORTUNA IUVAT",
  "VENI VIDI VICI",
  "AD ASTRA PER ASPERA",
  "SPES VINCIT OMNIA",
];

const separator = " · ";
const text = phrases.join(separator) + separator;

const MementoTicker = () => {
  return (
    <div className="w-full overflow-hidden bg-card/50 border-t border-b border-border/30 py-2.5 select-none" aria-hidden="true">
      <div className="ticker-strip">
        {[0, 1].map((i) => (
          <span key={i} className="flex-shrink-0 whitespace-nowrap text-[11px] tracking-[0.35em] text-muted-foreground/60 font-display italic px-2">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MementoTicker;
