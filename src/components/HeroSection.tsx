import VideoPlayer from "./VideoPlayer";
import CTABox from "./CTABox";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background decorations - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top tagline */}
        <div className="text-center mb-6 sm:mb-12 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold/10 text-amber text-xs sm:text-sm font-medium border border-gold/20">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber animate-pulse" />
            Transformando vidas desde 2018
          </span>
        </div>

        {/* Main headline */}
        <div className="text-center mb-8 sm:mb-16 animate-fade-in-up-delay-1">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-4 sm:mb-6">
            Cada criança merece
            <br />
            <span className="text-gradient-gold">brilhar</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            O Projeto LUMINIS leva luz, esperança e oportunidades para crianças
            órfãs em situação de vulnerabilidade em todo o Brasil.
          </p>
        </div>

        {/* Mobile-first layout: CTA first on mobile, then video */}
        <div className="flex flex-col lg:grid lg:grid-cols-[70%_30%] gap-6 lg:gap-8 items-start animate-fade-in-up-delay-2">
          {/* CTA Box - First on mobile */}
          <div className="w-full lg:hidden order-1">
            <CTABox />
          </div>

          {/* Video section - 70% on desktop */}
          <div className="w-full order-2 lg:order-1">
            <VideoPlayer />

            {/* Stats below video */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 sm:mt-8">
              <div className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-cream-light/50">
                <p className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-gradient-gold">
                  2.847
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  Crianças atendidas
                </p>
              </div>
              <div className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-cream-light/50">
                <p className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-gradient-gold">
                  156
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  Abrigos parceiros
                </p>
              </div>
              <div className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-cream-light/50">
                <p className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-gradient-gold">
                  98%
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  Vai direto às crianças
                </p>
              </div>
            </div>
          </div>

          {/* CTA Box - 30% on desktop only */}
          <div className="hidden lg:block lg:sticky lg:top-28 order-3 lg:order-2 animate-fade-in-up-delay-3">
            <CTABox />
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground">Role para ver mais</span>
        <svg
          className="w-5 h-5 text-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
