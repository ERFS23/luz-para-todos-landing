import { useEffect, useRef, useState } from "react";
import { Lock, Zap, Heart } from "lucide-react";
import watercolorTexture from "@/assets/watercolor-texture.jpg";

const FinalCTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("donation-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{ backgroundImage: `url(${watercolorTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(20_45%_12%/0.90)] via-[hsl(20_45%_12%/0.85)] to-[hsl(20_45%_12%/0.95)] dark:from-black/90 dark:via-black/85 dark:to-black/95" />

      {/* Floating gold particles - fewer on mobile */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Glassmorphism quote container */}
          <div className="glass-card rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-12 mb-5 sm:mb-10">
            <blockquote className="font-serif text-lg sm:text-3xl md:text-4xl lg:text-5xl text-cream italic leading-relaxed mb-3 sm:mb-6 font-semibold">
              "Porque no final, a gente não lembra do dinheiro que juntou...
              <span className="block mt-2 sm:mt-4 text-gold font-bold">
                mas sim das vidas que tocamos."
              </span>
            </blockquote>
            <p className="text-cream/70 text-[10px] sm:text-sm">— Alissa, Voluntária do Fênix • Curitiba</p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col gap-2.5 sm:gap-4 justify-center mb-5 sm:mb-10 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={scrollToForm}
              className="btn-luminis text-sm sm:text-lg px-5 sm:px-10 py-3.5 sm:py-5 group w-full min-h-[52px]"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 transition-transform group-hover:scale-110 flex-shrink-0" />
              APOIE NOSSO TRABALHO
            </button>
            <a
              href="https://wa.me/5500000000000?text=Olá%20Alissa,%20quero%20saber%20mais%20sobre%20o%20Fênix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-lg font-semibold rounded-xl border-2 border-cream/30 text-cream hover:bg-cream/10 hover:border-cream/50 transition-all duration-300 min-h-[52px]"
            >
              FALAR COM ALISSA
            </a>
          </div>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-10 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-2 text-cream/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <span className="font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <span className="font-medium">Transparência Total</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80 text-sm sm:text-base">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <span className="font-medium">Curitiba, PR</span>
            </div>
          </div>

          {/* Final urgency */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-cream/60 text-sm sm:text-lg mb-2">Neste momento...</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-gold animate-pulse-glow inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gold/30">
              52 crianças esperam por você 💛
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
