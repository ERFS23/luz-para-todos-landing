import { useRef } from "react";
import { Quote, Play, MapPin } from "lucide-react";
import watercolorTexture from "@/assets/watercolor-texture.jpg";

const MariaStorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-24 px-3 sm:px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${watercolorTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />

      <div className="max-w-7xl mx-auto relative z-10 w-full overflow-hidden">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold/10 text-amber text-[11px] sm:text-sm font-medium border border-gold/20 mb-2 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            História Real • Curitiba
          </span>
          <h2 className="font-serif text-[1.5rem] sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            O Abrigo que <span className="text-gradient-gold">Transformamos</span>
          </h2>
        </div>

        {/* Main layout: Narrative + Video */}
        <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] gap-6 lg:gap-16 items-center">

          {/* Emotional narrative */}
          <div className="order-1 space-y-4 sm:space-y-8 w-full overflow-hidden">
            {/* Large quote */}
            <div className="relative pr-2">
              <Quote className="absolute -top-1 -left-1 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-16 sm:h-16 text-gold/30" />
              <blockquote className="font-serif text-lg sm:text-3xl md:text-4xl font-medium text-foreground leading-snug sm:leading-tight pl-5 sm:pl-8 break-words">
                "Eles nunca tinham recebido{" "}
                <span className="text-gradient-gold italic">uma Bíblia</span>{" "}
                antes..."
              </blockquote>
            </div>

            {/* Narrative text */}
            <div className="space-y-3 sm:space-y-6 text-[13px] sm:text-lg text-muted-foreground leading-relaxed pr-1">
              <p className="break-words">
                Em um dos abrigos parceiros em Curitiba, encontramos crianças que nunca
                haviam recebido um presente, ouvido histórias de esperança ou sentido
                que alguém se importava com o futuro delas.
              </p>
              <p className="break-words">
                Foi lá que o Projeto FÊNIX chegou com Bíblias ilustradas, revistas e
                muito amor. Os olhos das crianças brilharam ao segurar pela primeira vez
                um livro com o <span className="text-foreground font-medium">seu nome escrito</span> na capa.
              </p>
              <p className="text-foreground font-medium break-words">
                Esse momento foi possível graças a pessoas que decidiram fazer a diferença HOJE.
              </p>
            </div>

            {/* Timeline */}
            <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
              <div className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0 min-w-0">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-[10px] sm:text-sm flex-shrink-0">
                  1
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs text-muted-foreground">2022</p>
                  <p className="text-[11px] sm:text-sm font-medium text-foreground whitespace-nowrap">
                    Primeiro contato
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0 min-w-0">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-[10px] sm:text-sm flex-shrink-0">
                  2
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs text-muted-foreground">2023</p>
                  <p className="text-[11px] sm:text-sm font-medium text-foreground whitespace-nowrap">
                    Bíblias entregues
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gold/10 border border-gold/20 flex-shrink-0 min-w-0">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-deep-brown font-bold text-[10px] sm:text-sm flex-shrink-0">
                  3
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs text-muted-foreground">Hoje</p>
                  <p className="text-[11px] sm:text-sm font-medium text-foreground whitespace-nowrap">
                    52 aguardando
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Video section */}
          <div className="order-2 w-full max-w-md lg:max-w-none mx-auto">
            <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-deep-brown via-warm-brown to-deep-brown">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster=""
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>

              {/* Play overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-xl">
                  <Play className="w-7 h-7 text-deep-brown ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 italic">
              📹 Vídeo real da visita ao abrigo em Curitiba
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MariaStorySection;
