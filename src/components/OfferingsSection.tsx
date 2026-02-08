import { useState, useEffect, useRef } from 'react';
import { Book, ShoppingBasket, Gift } from 'lucide-react';

const offerings = [
  {
    icon: Book,
    title: 'Bíblia Ilustrada',
    subtitle: 'Luz Espiritual',
    description: 'Histórias de esperança e fé contadas de forma lúdica para iluminar o coração das crianças.',
  },
  {
    icon: ShoppingBasket,
    title: 'Cesta Básica',
    subtitle: 'Luz que Alimenta',
    description: 'Alimentos essenciais que nutrem o corpo e trazem dignidade para famílias em situação de vulnerabilidade.',
  },
  {
    icon: Gift,
    title: 'Brinquedos',
    subtitle: 'Luz que Brinca',
    description: 'Momentos de alegria e diversão que toda criança merece viver, independente de sua situação.',
  },
];

const OfferingsSection = () => {
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

  return (
    <section ref={sectionRef} className="py-10 sm:py-24 bg-background relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-6 sm:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-secondary font-medium tracking-widest uppercase text-[10px] sm:text-sm">
            Sua Doação em Ação
          </span>
          <h2 className="text-[1.5rem] sm:text-4xl md:text-5xl font-bold text-foreground mt-2 sm:mt-4 mb-3 sm:mb-6 leading-tight">
            O Que Você <span className="text-gradient-gold">Oferece</span>
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Com apenas R$ 0,70 por dia, você proporciona três presentes que transformam vidas
          </p>
        </div>

        {/* Cards Container - Stack on mobile */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-0">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            const offsetClass = index === 1 ? 'lg:-translate-y-8' : '';
            const marginClass = index > 0 ? 'lg:-ml-8' : '';
            
            return (
              <div
                key={offering.title}
                className={`
                  relative
                  w-full lg:w-80
                  ${marginClass}
                  ${offsetClass}
                  transition-all duration-500
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                  }
                `}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  zIndex: 10 + index,
                }}
              >
                <div className="group cursor-pointer h-full">
                  <div 
                    className="
                      glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 h-full
                      border border-border/50
                      transition-all duration-300
                      active:scale-[0.98] sm:group-hover:-translate-y-2
                      sm:group-hover:shadow-[0_20px_40px_-15px_hsl(var(--gold)/0.3)]
                      sm:group-hover:border-primary/30
                    "
                  >
                    {/* Icon Container */}
                    <div 
                      className="
                        w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl mb-4 sm:mb-6
                        flex items-center justify-center
                        bg-gradient-to-br from-primary/20 to-secondary/20
                        border border-primary/20
                        transition-all duration-300
                        group-hover:glow-gold
                        group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-secondary/30
                      "
                    >
                      <Icon 
                        className="w-7 h-7 sm:w-10 sm:h-10 text-primary transition-all duration-300 group-hover:scale-110" 
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 sm:space-y-3">
                      <span className="text-secondary text-xs sm:text-sm font-medium tracking-wide uppercase">
                        {offering.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {offering.title}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {offering.description}
                      </p>
                    </div>

                    {/* Decorative corner - hidden on mobile */}
                    <div 
                      className="
                        hidden sm:block absolute top-4 right-4 w-12 h-12 
                        border-t-2 border-r-2 border-primary/20 
                        rounded-tr-xl
                        transition-all duration-300
                        group-hover:border-primary/40
                        group-hover:w-16 group-hover:h-16
                      "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
