import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';

const MathSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          
          // Start counter animation after a delay
          setTimeout(() => {
            const duration = 2000;
            const targetValue = 1.41;
            const steps = 60;
            const increment = targetValue / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= targetValue) {
                setCounterValue(targetValue);
                clearInterval(timer);
              } else {
                setCounterValue(current);
              }
            }, duration / steps);
          }, 800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background decorations - hidden on mobile */}
      <div className="hidden sm:block absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-8 sm:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-secondary font-medium tracking-widest uppercase text-xs sm:text-sm">
            Transparência Total
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Matemática do <span className="text-gradient-gold">Coração</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Veja como sua contribuição se multiplica quando doada com propósito
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto mb-8 sm:mb-16">
          {/* Left Card - Normal Purchase */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-xl sm:rounded-2xl p-5 sm:p-8 bg-muted/50 border border-border/50 opacity-60">
              {/* Crossed out effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-muted-foreground/30 rotate-[-5deg]" />
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-muted flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Compra comum</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-muted-foreground">R$ 21,20</h3>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/50" />
                  <span>Um lanche rápido</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/50" />
                  <span>Um café especial</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/50" />
                  <span>Satisfação momentânea</span>
                </li>
              </ul>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/30">
                <p className="text-muted-foreground text-xs sm:text-sm italic">
                  "Passou e foi esquecido..."
                </p>
              </div>
            </div>
          </div>

          {/* Right Card - LUMINIS Donation */}
          <div 
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-xl sm:rounded-2xl p-5 sm:p-8 glass-card border-2 border-primary/30 glow-gold">
              {/* Sparkle decorations */}
              <Sparkles className="absolute top-4 right-4 w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
              
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="hsl(var(--primary))" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-secondary font-medium">No Projeto LUMINIS</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">R$ 21,20</h3>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                  <span>1 Bíblia Ilustrada</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span>1 Cesta Básica completa</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span>Brinquedos para alegrar</span>
                </li>
              </ul>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary/20">
                <p className="text-gradient-gold font-semibold text-base sm:text-lg">
                  = 1 vida transformada ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Math Breakdown */}
        <div 
          className={`max-w-3xl mx-auto transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 text-center border border-primary/20">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-8 text-lg sm:text-2xl md:text-4xl font-bold">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-foreground">R$ 21,20</span>
                <span className="text-primary">÷</span>
                <span className="text-foreground">30 dias</span>
              </div>
              <span className="text-primary text-2xl sm:text-4xl">=</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl md:text-7xl text-gradient-gold tabular-nums">
                  R$ {counterValue.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-base sm:text-xl text-muted-foreground font-normal">/dia</span>
              </div>
            </div>

            <p className="text-muted-foreground mt-6 sm:mt-8 text-sm sm:text-lg px-2">
              Menos que um cafezinho. <span className="text-primary font-semibold">Uma vida inteira de impacto.</span>
            </p>

            <a href="#donation-form" className="btn-luminis mt-6 sm:mt-8 text-sm sm:text-base py-3 sm:py-4">
              Quero Transformar Vidas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MathSection;
