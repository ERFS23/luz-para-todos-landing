import { useEffect, useRef, useState } from "react";
import { Gift, ArrowRight } from "lucide-react";

const plans = [
  {
    children: 1,
    emoji: "🎁",
    installment: "12x de R$ 21,65",
    total: "R$ 259,75",
    highlight: false,
  },
  {
    children: 2,
    emoji: "🎁",
    installment: "12x de R$ 43,29",
    total: "R$ 519,50",
    highlight: false,
  },
  {
    children: 5,
    emoji: "🎁",
    installment: "12x de R$ 108,23",
    total: "R$ 1.298,75",
    highlight: true,
  },
  {
    children: 7,
    emoji: "🎁",
    installment: "12x de R$ 151,52",
    total: "R$ 1.818,25",
    highlight: false,
  },
];

const PricingSection = () => {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (children: number) => {
    window.dispatchEvent(
      new CustomEvent("selectDonationOption", { detail: { children } })
    );
    const el = document.getElementById("donation-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-10 sm:py-20 bg-background relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-6 sm:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold/10 text-amber text-[10px] sm:text-sm font-medium border border-gold/20 mb-3 sm:mb-5">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
            Apadrinhe e Transforme Vidas
          </span>
          <h2 className="font-serif text-[1.5rem] sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            Escolha <span className="text-gradient-gold">quantas crianças</span>
            <br className="hidden sm:block" /> deseja abençoar
          </h2>
          <p className="mt-3 sm:mt-5 text-muted-foreground text-[13px] sm:text-lg max-w-xl mx-auto">
            Cada criança recebe uma Bíblia Ilustrada, a revista Nosso Amiguinho e uma carta personalizada.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <button
              key={plan.children}
              onClick={() => handleSelect(plan.children)}
              className={`relative group rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                plan.highlight
                  ? "border-gold bg-gradient-to-b from-gold/10 to-amber/5 shadow-lg shadow-gold/10"
                  : "border-border bg-card hover:border-gold/40"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-gold to-amber text-deep-brown text-[10px] sm:text-xs font-bold whitespace-nowrap shadow">
                  ⭐ Mais escolhido
                </div>
              )}

              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{plan.emoji}</div>

              <p className="text-[11px] sm:text-sm font-semibold text-muted-foreground mb-1">
                {plan.children} {plan.children === 1 ? "Criança" : "Crianças"}
              </p>

              <p className="font-bold text-foreground text-sm sm:text-xl leading-tight">
                {plan.installment}
              </p>

              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Total: {plan.total}
              </p>

              <div className="mt-3 sm:mt-5 flex items-center gap-1 text-primary text-[11px] sm:text-sm font-semibold group-hover:gap-2 transition-all">
                Escolher
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </button>
          ))}
        </div>

        <p
          className={`text-center text-muted-foreground text-[11px] sm:text-sm mt-6 sm:mt-8 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Pagamento via Cartão de Crédito ou PIX • Sem burocracia
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
