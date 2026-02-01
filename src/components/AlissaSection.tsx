import { useEffect, useRef, useState } from "react";
import { Calendar, GraduationCap, Home, Heart, Quote } from "lucide-react";
import eliasPortrait from "@/assets/elias-portrait.jpg";
import { useProjectStats } from "@/hooks/useProjectStats";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const AlissaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { stats: projectStats } = useProjectStats();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      icon: <Calendar className="w-6 h-6" />,
      value: "20",
      label: "anos",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: "Teologia",
      label: "iniciando em 2025",
    },
    {
      icon: <Home className="w-6 h-6" />,
      value: String(projectStats.totalShelters),
      label: "abrigos parceiros",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: String(projectStats.childrenRemaining),
      label: "crianças aguardando",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-24 px-3 sm:px-6 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden"
    >
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-20 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 right-1/4 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Section header */}
        <div
          className={`text-center mb-6 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold/10 text-amber text-[10px] sm:text-sm font-medium border border-gold/20 mb-2 sm:mb-4">
            Conheça Nossa Equipe
          </span>
          <h2 className="font-serif text-[1.5rem] sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Conheça <span className="text-gradient-gold">Elias</span>
          </h2>
        </div>

        {/* Circular photo with gold glow */}
        <div
          className={`flex justify-center mb-6 sm:mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Outer glow ring - reduced on mobile */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-amber blur-xl opacity-40 sm:opacity-50 sm:animate-pulse-glow" />
            
            {/* Gold border ring */}
            <div className="relative w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] rounded-full p-1 sm:p-1.5 bg-gradient-to-br from-gold via-amber to-gold">
              <div className="w-full h-full rounded-full overflow-hidden bg-cream">
                <img
                  src={eliasPortrait}
                  alt="Elias Serrano - Coordenador de Voluntários"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-gold to-amber text-deep-brown font-semibold text-[10px] sm:text-sm shadow-lg glow-gold whitespace-nowrap">
              Coordenador de Voluntários
            </div>
          </div>
        </div>

        {/* Stats grid with stagger animation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mb-6 sm:mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-2.5 sm:p-6 rounded-lg sm:rounded-2xl bg-card/80 backdrop-blur-sm border border-gold/10 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold/20 to-amber/20 flex items-center justify-center text-amber">
                {stat.icon}
              </div>
              <p className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Personal quote */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block max-w-full px-2">
            <Quote className="absolute -top-3 -left-2 sm:-top-6 sm:-left-8 w-6 h-6 sm:w-12 sm:h-12 text-gold/30 rotate-180" />
            <blockquote className="font-serif text-[15px] sm:text-xl md:text-2xl italic text-foreground leading-relaxed max-w-2xl mx-auto px-4 sm:px-8">
              Cada vez que entro em um abrigo, vejo olhos cheios de esperança me
              pedindo uma chance. Minha missão é garantir que nenhuma criança
              seja esquecida.
            </blockquote>
            <Quote className="absolute -bottom-3 -right-2 sm:-bottom-6 sm:-right-8 w-6 h-6 sm:w-12 sm:h-12 text-gold/30" />
          </div>
          <p className="mt-4 sm:mt-8 text-muted-foreground text-[11px] sm:text-base">
            — Elias Serrano, ex-estudante de Direito, iniciando Teologia em 2025
          </p>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-6 sm:mt-12 transition-all duration-700 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a href="#donation-form" className="btn-luminis text-sm sm:text-base py-3 sm:py-4 min-h-[48px]">
            Seja voluntário como o Elias
          </a>
        </div>
      </div>
    </section>
  );
};

export default AlissaSection;
