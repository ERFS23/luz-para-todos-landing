import { useEffect, useRef, useState } from "react";
import { Calendar, GraduationCap, Home, Heart, Quote } from "lucide-react";
import alissaPortrait from "@/assets/alissa-portrait.jpg";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const AlissaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      value: "22",
      label: "anos",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: "Psicologia",
      label: "universitária",
    },
    {
      icon: <Home className="w-6 h-6" />,
      value: "127",
      label: "abrigos visitados",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "23",
      label: "crianças esperando",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-b from-background via-cream-light to-background overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-amber/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-amber text-sm font-medium border border-gold/20 mb-4">
            Conheça Nossa Equipe
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
            Conheça <span className="text-gradient-gold">Alissa</span>
          </h2>
        </div>

        {/* Circular photo with gold glow */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-amber blur-xl opacity-50 animate-pulse-glow" />
            
            {/* Gold border ring */}
            <div className="relative w-[300px] h-[300px] rounded-full p-1.5 bg-gradient-to-br from-gold via-amber to-gold">
              <div className="w-full h-full rounded-full overflow-hidden bg-cream">
                <img
                  src={alissaPortrait}
                  alt="Alissa - Coordenadora de Voluntários"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-gold to-amber text-deep-brown font-semibold text-sm shadow-lg glow-gold whitespace-nowrap">
              Coordenadora de Voluntários
            </div>
          </div>
        </div>

        {/* Stats grid with stagger animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl bg-cream-light/80 backdrop-blur-sm border border-gold/10 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold/20 to-amber/20 flex items-center justify-center text-amber">
                {stat.icon}
              </div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Personal quote */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            <Quote className="absolute -top-6 -left-8 w-12 h-12 text-gold/30 rotate-180" />
            <blockquote className="font-serif text-xl md:text-2xl italic text-foreground leading-relaxed max-w-2xl mx-auto px-8">
              Cada vez que entro em um abrigo, vejo olhos cheios de esperança me
              pedindo uma chance. Minha missão é garantir que nenhuma criança
              seja esquecida.
            </blockquote>
            <Quote className="absolute -bottom-6 -right-8 w-12 h-12 text-gold/30" />
          </div>
          <p className="mt-8 text-muted-foreground">
            — Alissa Santos, estudante de Psicologia e voluntária desde 2020
          </p>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="btn-luminis">
            Seja voluntário como a Alissa
          </button>
        </div>
      </div>
    </section>
  );
};

export default AlissaSection;
