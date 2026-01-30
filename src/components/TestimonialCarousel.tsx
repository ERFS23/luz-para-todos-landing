import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Cláudia Mendes',
    role: 'Madrinha há 2 anos',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'Nunca imaginei que R$ 1,41 por dia pudesse fazer tanta diferença. Receber as cartinhas da Juliana me emociona toda vez.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Roberto Almeida',
    role: 'Padrinho há 8 meses',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'O projeto LUMINIS me mostrou que ser luz não exige grandes recursos, apenas um grande coração.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Carolina Silva',
    role: 'Madrinha há 1 ano',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'Conhecer o abrigo e ver os olhinhos brilhando com os presentes... essa é a melhor recompensa.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcos Oliveira',
    role: 'Padrinho há 3 anos',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'Minha família toda participa agora. Meus filhos aprenderam o valor de ajudar o próximo.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Fernanda Costa',
    role: 'Madrinha há 6 meses',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    quote: 'A transparência do projeto me conquistou. Sei exatamente para onde vai cada centavo.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Paulo Henrique',
    role: 'Padrinho há 1 ano',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: 'Comecei querendo ajudar uma criança. Hoje sou voluntário e minha vida ganhou novo propósito.',
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decorations - hidden on mobile */}
      <div className="hidden sm:block absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-xs sm:text-sm">
            Histórias Reais
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Vozes que <span className="text-gradient-gold">Iluminam</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Conheça as pessoas que já fazem parte dessa corrente de luz
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 text-center border border-primary/10">
                    {/* Photo */}
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 sm:border-4 border-primary/30 glow-gold">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 sm:w-5 sm:h-5 text-primary" 
                          fill="hsl(var(--primary))"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base sm:text-xl md:text-2xl text-foreground leading-relaxed mb-4 sm:mb-6 italic px-2">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Attribution */}
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, use swipe */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card border border-primary/20 items-center justify-center text-primary hover:glow-gold transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card border border-primary/20 items-center justify-center text-primary hover:glow-gold transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 sm:w-8 bg-primary' 
                  : 'w-2 bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
