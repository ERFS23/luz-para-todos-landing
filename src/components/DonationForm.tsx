import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { Check, CreditCard, QrCode, FileText, ChevronRight, ChevronLeft, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Validation schemas
const personalInfoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(15),
  cpf: z.string().min(11, "CPF inválido").max(14),
});

const preferencesSchema = z.object({
  genero: z.enum(["menino", "menina", "sem_preferencia"]),
  idade: z.enum(["0-3", "4-7", "8-12", "sem_preferencia"]),
});

const paymentSchema = z.object({
  metodo: z.enum(["cartao", "pix", "boleto"]),
  valor: z.number().min(1),
});

type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  genero: string;
  idade: string;
  metodo: string;
  valor: number;
  valorCustom: string;
};

const DonationForm = () => {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    cpf: "",
    genero: "sem_preferencia",
    idade: "sem_preferencia",
    metodo: "",
    valor: 42.30,
    valorCustom: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Input masks
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    let formattedValue = value;
    
    if (field === "whatsapp" && typeof value === "string") {
      formattedValue = formatWhatsApp(value);
    } else if (field === "cpf" && typeof value === "string") {
      formattedValue = formatCPF(value);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (currentStep: number): boolean => {
    try {
      if (currentStep === 1) {
        personalInfoSchema.parse({
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp.replace(/\D/g, ""),
          cpf: formData.cpf.replace(/\D/g, ""),
        });
      } else if (currentStep === 2) {
        preferencesSchema.parse({
          genero: formData.genero,
          idade: formData.idade,
        });
      } else if (currentStep === 3) {
        paymentSchema.parse({
          metodo: formData.metodo,
          valor: formData.valor,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step) && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      setShowConfetti(true);
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const amountOptions = [
    { value: 42.30, label: "R$ 42,30", description: "1 criança" },
    { value: 84.60, label: "R$ 84,60", description: "2 crianças" },
    { value: 127.00, label: "R$ 127,00", description: "3 crianças" },
  ];

  return (
    <section id="donation-form" className="py-12 sm:py-20 bg-card relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-gold" />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4">
        <div
          ref={formRef}
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gold/20 text-amber text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Seja um padrinho
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-3">
              Complete seu <span className="text-gradient-gold">apadrinhamento</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Preencha os dados abaixo para transformar uma vida
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10">
            {[1, 2, 3].map((num, index) => (
              <div key={num} className="flex items-center">
                <div
                  className={cn(
                    "progress-step w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base",
                    step === num && "active",
                    step > num && "completed"
                  )}
                >
                  {step > num ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : num}
                </div>
                {index < 2 && (
                  <div
                    className={cn(
                      "progress-line w-8 sm:w-16 md:w-24 mx-1 sm:mx-2",
                      step > num && "filled"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-5 animate-fade-in">
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                  Seus dados pessoais
                </h3>

                <div className="floating-label-group">
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className={cn("input-luminis text-base", errors.nome && "border-destructive")}
                    placeholder="Nome completo"
                  />
                  {errors.nome && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.nome}</p>
                  )}
                </div>

                <div className="floating-label-group">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn("input-luminis text-base", errors.email && "border-destructive")}
                    placeholder="E-mail"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="floating-label-group">
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className={cn("input-luminis text-base", errors.whatsapp && "border-destructive")}
                    placeholder="WhatsApp (00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.whatsapp}</p>
                  )}
                </div>

                <div className="floating-label-group">
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    className={cn("input-luminis text-base", errors.cpf && "border-destructive")}
                    placeholder="CPF 000.000.000-00"
                  />
                  {errors.cpf && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.cpf}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
                    Preferência de gênero
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                    {[
                      { value: "menino", label: "Menino" },
                      { value: "menina", label: "Menina" },
                      { value: "sem_preferencia", label: "Sem preferência" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleInputChange("genero", option.value)}
                        className={cn(
                          "radio-card min-h-[52px]",
                          formData.genero === option.value && "selected"
                        )}
                      >
                        <div className="radio-indicator" />
                        <span className="font-medium text-foreground text-sm sm:text-base">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
                    Faixa etária
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {[
                      { value: "0-3", label: "0-3 anos" },
                      { value: "4-7", label: "4-7 anos" },
                      { value: "8-12", label: "8-12 anos" },
                      { value: "sem_preferencia", label: "Qualquer" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleInputChange("idade", option.value)}
                        className={cn(
                          "radio-card min-h-[52px]",
                          formData.idade === option.value && "selected"
                        )}
                      >
                        <div className="radio-indicator" />
                        <span className="font-medium text-foreground text-xs sm:text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
                    Método de pagamento
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { value: "cartao", label: "Cartão", icon: CreditCard },
                      { value: "pix", label: "PIX", icon: QrCode },
                      { value: "boleto", label: "Boleto", icon: FileText },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleInputChange("metodo", option.value)}
                        className={cn(
                          "payment-card min-h-[80px] sm:min-h-[120px] p-3 sm:p-6",
                          formData.metodo === option.value && "selected"
                        )}
                      >
                        <option.icon className={cn(
                          "w-6 h-6 sm:w-8 sm:h-8",
                          formData.metodo === option.value ? "text-gold" : "text-muted-foreground"
                        )} />
                        <span className="font-medium text-foreground text-xs sm:text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                  {errors.metodo && (
                    <p className="text-destructive text-xs sm:text-sm mt-2">{errors.metodo}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
                    Valor mensal
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {amountOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          handleInputChange("valor", option.value);
                          handleInputChange("valorCustom", "");
                        }}
                        className={cn(
                          "amount-card min-h-[60px] sm:min-h-[auto]",
                          formData.valor === option.value && !formData.valorCustom && "selected"
                        )}
                      >
                        <span className="font-bold text-sm sm:text-lg text-foreground">{option.label}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        handleInputChange("valor", 0);
                        handleInputChange("valorCustom", "1");
                      }}
                      className={cn(
                        "amount-card min-h-[60px] sm:min-h-[auto]",
                        formData.valorCustom && "selected"
                      )}
                    >
                      <span className="font-bold text-sm sm:text-base text-foreground">Outro</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">valor</span>
                    </div>
                  </div>
                  
                  {formData.valorCustom && (
                    <div className="mt-3 sm:mt-4">
                      <input
                        type="number"
                        value={formData.valor || ""}
                        onChange={(e) => handleInputChange("valor", parseFloat(e.target.value) || 0)}
                        className="input-luminis text-base"
                        placeholder="Digite o valor desejado"
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-10">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[52px]"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Voltar
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 btn-luminis py-3 sm:py-4 text-sm sm:text-base min-h-[52px]"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 btn-luminis py-3 sm:py-4 group text-sm sm:text-base min-h-[52px]"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:scale-110" />
                  Confirmar
                </button>
              )}
            </div>
          </div>

          {/* Security note */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
            🔒 Seus dados estão protegidos e nunca serão compartilhados
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
