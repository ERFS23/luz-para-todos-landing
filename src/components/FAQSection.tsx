import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Como funciona o apadrinhamento?',
    answer: 'Ao se tornar padrinho ou madrinha, você contribui com R$ 21,00 por mês (apenas R$ 0,70 por dia). Esse valor é convertido em Bíblias Ilustradas, revistas "Nosso Amiguinho" e uma carta personalizada entregues diretamente às crianças em abrigos parceiros em Curitiba. Você recebe atualizações mensais sobre o impacto da sua doação.',
  },
  {
    question: 'Minha doação realmente chega às crianças?',
    answer: 'Sim, 100%. Somos uma equipe voluntária — nenhum salário é pago com sua doação. Publicamos mensalmente fotos, vídeos das entregas e notas fiscais de tudo que é comprado. Você pode inclusive nos visitar pessoalmente nos abrigos para ver com seus próprios olhos.',
  },
  {
    question: 'Por que devo confiar em dois universitários?',
    answer: 'Entendemos a dúvida — e ela é legítima. Elias e Alissa são universitários de Teologia e Medicina que pausaram parte da rotina acadêmica para dedicar tempo às crianças. O projeto existe desde 2018, já alcançou dezenas de crianças em Curitiba e opera com total transparência. Você pode nos ligar, visitar e verificar tudo.',
  },
  {
    question: 'E se eu não puder continuar doando?',
    answer: 'Sem problema algum. Não há contrato, multa ou obrigação de permanência. Se um mês ficar difícil, basta nos avisar. O que importa é que HOJE você faça a diferença — mesmo que seja por um único mês. Uma Bíblia entregue já muda uma história.',
  },
  {
    question: 'A doação é dedutível do Imposto de Renda?',
    answer: 'Sim! O Projeto FÊNIX possui registro como OSCIP (Organização da Sociedade Civil de Interesse Público). Suas doações podem ser deduzidas do IR até o limite permitido por lei. Enviamos automaticamente o comprovante anual.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartão de crédito (com opção de recorrência automática), PIX, boleto bancário e transferência bancária. Escolha a forma que for mais conveniente para você.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decorations - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-16">
          <span className="text-secondary font-medium tracking-widest uppercase text-[10px] sm:text-sm">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-[1.5rem] sm:text-4xl md:text-5xl font-bold text-foreground mt-2 sm:mt-4 mb-3 sm:mb-6 leading-tight">
            Perguntas <span className="text-gradient-gold">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-[13px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa saber sobre o Projeto FÊNIX
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`rounded-lg sm:rounded-xl overflow-hidden border transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/30 shadow-lg shadow-primary/10' 
                    : 'border-border/50'
                } ${isEven ? 'bg-background' : 'bg-muted/30'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left min-h-[56px]"
                >
                  <span className={`font-semibold text-sm sm:text-lg pr-3 sm:pr-4 transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-foreground'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    ${isOpen 
                      ? 'bg-primary text-primary-foreground rotate-0' 
                      : 'bg-primary/10 text-primary rotate-0'
                    }
                  `}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="h-px bg-border/50 mb-3 sm:mb-4" />
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Ainda tem dúvidas? Fale com a gente!
          </p>
          <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 text-sm sm:text-base min-h-[44px]">
            Entrar em Contato
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
