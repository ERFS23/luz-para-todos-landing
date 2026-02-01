import { useState, useRef, useEffect } from "react";
import { Quote, ArrowLeftRight } from "lucide-react";
import mariaBefore from "@/assets/maria-before.jpg";
import mariaAfter from "@/assets/maria-after.jpg";
import watercolorTexture from "@/assets/watercolor-texture.jpg";

const MariaStorySection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setParallaxOffset(scrollProgress * 50 - 25);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${watercolorTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold/10 text-amber text-xs sm:text-sm font-medium border border-gold/20 mb-3 sm:mb-4">
            História Real
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-foreground">
            A História da <span className="text-gradient-gold">Maria</span>
          </h2>
        </div>

        {/* Mobile-first layout: Narrative first, then slider */}
        <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-8 lg:gap-16 items-center">
          {/* Emotional narrative - First on mobile */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            {/* Large quote */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-16 sm:h-16 text-gold/30" />
              <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight pl-6 sm:pl-8">
                Tia, eu não sei o que é{" "}
                <span className="text-gradient-gold italic">sonhar</span>...
              </blockquote>
            </div>

            {/* Narrative text */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Maria tinha 8 anos quando disse essa frase para uma de nossas
                voluntárias. Abandonada aos 3 anos, ela nunca tinha recebido um
                presente de aniversário ou ouvido alguém dizer "eu te amo".
              </p>
              <p>
                Hoje, com 10 anos, Maria{" "}
                <span className="text-foreground font-medium">
                  sonha em ser médica
                </span>
                . Ela faz aulas de reforço escolar, participa de atividades
                artísticas e, pela primeira vez, entende o que significa ter
                alguém que se importa.
              </p>
              <p className="text-foreground font-medium">
                A transformação de Maria começou com alguém como você.
              </p>
            </div>

            {/* Timeline - Scrollable on mobile */}
            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-xs sm:text-sm">
                  1
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">2021</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                    Chegou ao abrigo
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-xs sm:text-sm">
                  2
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">2022</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                    Conheceu o FÊNIX
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-xs sm:text-sm">
                  3
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Hoje</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                    Aprendendo a sonhar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="order-2 lg:order-1 w-full max-w-md lg:max-w-none mx-auto">
            <div
              ref={containerRef}
              className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none touch-pan-x"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            >
              {/* After image (background) */}
              <img
                src={mariaAfter}
                alt="Maria hoje - sorridente e feliz"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={mariaBefore}
                  alt="Maria antes - em situação de vulnerabilidade"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Before label */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-deep-brown/80 text-cream text-xs sm:text-sm font-medium backdrop-blur-sm">
                  Antes
                </div>
              </div>

              {/* After label */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gold/90 text-deep-brown text-xs sm:text-sm font-medium backdrop-blur-sm">
                Depois
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-cream shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                {/* Handle circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cream shadow-xl flex items-center justify-center border-2 border-gold glow-gold">
                  <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-deep-brown" />
                </div>
              </div>

              {/* Instruction text */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-deep-brown/80 text-cream text-[10px] sm:text-xs font-medium backdrop-blur-sm flex items-center gap-1.5 sm:gap-2">
                <ArrowLeftRight className="w-3 h-3 sm:w-4 sm:h-4" />
                Arraste para comparar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MariaStorySection;
