import VideoPlayer from "./VideoPlayer";
import CTABox from "./CTABox";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top tagline */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-amber text-sm font-medium border border-gold/20">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            Transformando vidas desde 2018
          </span>
        </div>

        {/* Main headline */}
        <div className="text-center mb-16 animate-fade-in-up-delay-1">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6">
            Cada criança merece
            <br />
            <span className="text-gradient-gold">brilhar</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            O Projeto LUMINIS leva luz, esperança e oportunidades para crianças
            órfãs em situação de vulnerabilidade em todo o Brasil.
          </p>
        </div>

        {/* Asymmetric layout: Video + CTA */}
        <div className="grid lg:grid-cols-[70%_30%] gap-8 items-start animate-fade-in-up-delay-2">
          {/* Video section - 70% */}
          <div className="w-full">
            <VideoPlayer />

            {/* Stats below video */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-2xl bg-cream-light/50">
                <p className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
                  2.847
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Crianças atendidas
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-cream-light/50">
                <p className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
                  156
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Abrigos parceiros
                </p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-cream-light/50">
                <p className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
                  98%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Vai direto às crianças
                </p>
              </div>
            </div>
          </div>

          {/* CTA Box - 30% */}
          <div className="lg:sticky lg:top-28 animate-fade-in-up-delay-3">
            <CTABox />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
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
