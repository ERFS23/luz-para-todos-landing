import { Heart } from "lucide-react";

const WAITING_CHILDREN = 52;

const FloatingCTAButton = () => {
  const handleClick = () => {
    const el = document.getElementById("donation-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Apadrinhar uma criança"
      className="fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl btn-luminis text-xs sm:text-sm font-semibold animate-pulse-slow group transition-all duration-300 hover:scale-105 hover:animate-none"
      style={{
        boxShadow: "0 8px 30px hsl(var(--gold) / 0.4), 0 2px 8px hsl(0 0% 0% / 0.3)",
      }}
    >
      <Heart
        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground flex-shrink-0 group-hover:scale-110 transition-transform"
        fill="currentColor"
      />
      <span className="whitespace-nowrap">
        <span className="font-bold">{WAITING_CHILDREN} crianças</span> aguardando
      </span>
    </button>
  );
};

export default FloatingCTAButton;
