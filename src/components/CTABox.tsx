import { Heart, Users, Sparkles } from "lucide-react";

const CTABox = () => {
  return (
    <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:animate-float bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl w-full">
      {/* Content */}
      <div className="relative z-10 space-y-3 sm:space-y-6">
        {/* Icon */}
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold to-amber flex items-center justify-center glow-gold">
          <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-deep-brown" fill="currentColor" />
        </div>

        {/* Headline */}
        <div>
          <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Seja a <span className="text-gradient-gold">Luz</span>
            <br />
            de uma Criança
          </h2>
        </div>

        {/* Price */}
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-sm uppercase tracking-wider font-medium text-foreground/80">
            A partir de apenas
          </p>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-3xl sm:text-5xl font-serif font-bold text-gradient-gold">
              R$ 0,70
            </span>
            <span className="text-sm sm:text-lg text-gold">/dia</span>
          </div>
          <p className="text-[10px] sm:text-sm text-muted-foreground leading-tight">
            Menos que um café para transformar uma vida
          </p>
        </div>

        {/* Urgency counter */}
        <div className="urgency-badge text-[10px] sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4">
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="font-semibold"> 52 crianças aguardando</span>
        </div>

        {/* CTA Button */}
        <a href="#donation-form" className="btn-luminis w-full group py-3 sm:py-4 text-sm sm:text-lg min-h-[48px]">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 transition-transform group-hover:rotate-12 flex-shrink-0" />
          QUERO FAZER PARTE
        </a>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pt-1 sm:pt-2 text-muted-foreground text-[9px] sm:text-xs flex-wrap">
          <div className="flex items-center gap-1 text-accent">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>TEMPO LIMITADO</span>
          </div>
        </div>
      </div>
    </div>);

};

export default CTABox;