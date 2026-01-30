import { Heart, Users, Sparkles } from "lucide-react";

const CTABox = () => {
  return (
    <div className="glass-card rounded-3xl p-8 animate-float">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-amber flex items-center justify-center glow-gold">
          <Heart className="w-7 h-7 text-deep-brown" fill="currentColor" />
        </div>

        {/* Headline */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Seja a <span className="text-gradient-gold">Luz</span>
            <br />
            de uma Criança
          </h2>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
            A partir de apenas
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-serif font-bold text-gradient-gold">
              R$ 1,41
            </span>
            <span className="text-muted-foreground text-lg">/dia</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Menos que um café para transformar uma vida
          </p>
        </div>

        {/* Urgency counter */}
        <div className="urgency-badge">
          <Users className="w-4 h-4" />
          <span className="font-semibold">23 vagas restantes hoje</span>
        </div>

        {/* CTA Button */}
        <button className="btn-luminis w-full group">
          <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
          QUERO SER LUZ
        </button>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 pt-2 text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Pagamento seguro
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Cancele quando quiser
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABox;
