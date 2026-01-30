

# Auditoria Completa: Modo Escuro - Projeto LUMINIS

## Sumario Executivo

O modo escuro foi implementado com variáveis CSS básicas, mas apresenta **22 problemas críticos** de contraste, tipografia e consistência visual que comprometem a experiência do usuário e a acessibilidade WCAG 2.1 AA.

---

## 1. DIAGNOSTICO DETALHADO

### 1.1 Tipografia

| Problema | Componente | Linha | Contraste Atual | WCAG Requerido |
|----------|------------|-------|-----------------|----------------|
| Texto invisível | CTABox | 23 | `text-primary-foreground` sobre fundo escuro = 1.2:1 | 4.5:1 |
| Texto ilegível | CTABox | 32 | `text-secondary-foreground` sobre fundo escuro = 1.5:1 | 4.5:1 |
| Labels confusas | DonationForm | 315, 341 | `text-deep-brown` fixo (cor clara no escuro) | 4.5:1 |
| Placeholder invisível | DonationForm | inputs | `text-muted-foreground` = 2.1:1 | 4.5:1 |
| Subtítulo Hero | HeroSection | 27 | Corrigido anteriormente, mas `text-white/90` precisa de verificação |
| FAQ texto fechado | FAQSection | 85-86 | `text-foreground` OK, mas bordas fracas |
| MariaStory overlay | MariaStorySection | 62 | `bg-cream/80` nao adapta ao dark mode |
| AlissaSection bg | AlissaSection | 59 | `bg-cream-light` fixo, nao muda no dark |

### 1.2 Cores - Problemas Identificados

**Variaveis CSS Incompletas (`src/index.css`):**
```css
.dark {
  /* FALTAM as seguintes variaveis: */
  /* --gold-glow, --cream, --cream-light, --deep-brown, --warm-brown */
  /* --glass-bg, --glass-border, --glass-shadow */
  /* --glow-gold, --glow-amber */
}
```

**Classes CSS que usam cores fixas (nao responsivas ao tema):**
- `text-deep-brown` (15 ocorrencias)
- `bg-cream-light` (8 ocorrencias)
- `bg-cream/80` (2 ocorrencias)
- `text-cream` (5 ocorrencias)
- `bg-deep-brown` (3 ocorrencias)

### 1.3 Componentes com Estilos Inline (nao respondem ao tema)

| Componente | Propriedade | Valor Fixo |
|------------|-------------|------------|
| UrgencySection | background | `hsl(20 45% 10%)` linha 54 |
| UrgencySection | color | `hsl(36 100% 96%)` linhas 88, 178 |
| UrgencySection | color | `hsl(36 40% 70%)` linhas 99, 112, 145 |
| FinalCTASection | background | gradiente fixo linha 43 |

### 1.4 Glassmorphism

A classe `.glass-card` usa `hsl(var(--glass-bg))` mas `--glass-bg` **nao esta definido no modo escuro**, causando fundo incorreto.

### 1.5 Formularios

| Elemento | Problema |
|----------|----------|
| `.input-luminis` | Background `bg-cream-light` fixo |
| `.radio-card` | Background e texto `text-deep-brown` fixos |
| `.payment-card` | Background `bg-cream-light` fixo |
| `.amount-card` | Background `bg-cream-light` fixo |
| `.floating-label` | Background `bg-cream-light` no estado ativo |

---

## 2. RECOMENDACOES ESPECIFICAS

### 2.1 Variaveis CSS para Modo Escuro

```css
/* Adicionar em src/index.css dentro de .dark {} */
.dark {
  --background: 20 45% 8%;
  --foreground: 36 100% 96%;
  
  /* ... variaveis existentes ... */
  
  /* NOVAS variaveis necessarias: */
  --gold: 36 100% 65%;
  --gold-glow: 36 100% 55%;
  --amber: 33 100% 50%;
  --cream: 20 45% 12%;
  --cream-light: 20 45% 15%;
  --deep-brown: 36 100% 92%;
  --warm-brown: 36 60% 75%;
  
  /* Glassmorphism adaptado */
  --glass-bg: 20 45% 12% / 0.85;
  --glass-border: 36 100% 50% / 0.2;
  --glass-shadow: 0 0% 0% / 0.3;
  
  /* Glows adaptados */
  --glow-gold: 0 0 40px hsl(36 100% 50% / 0.3);
  --glow-amber: 0 0 60px hsl(33 100% 50% / 0.2);
}
```

### 2.2 Substituicoes de Classes Fixas

| De | Para |
|----|------|
| `text-deep-brown` | `text-foreground` |
| `bg-cream-light` | `bg-card` |
| `bg-cream/80` | `bg-background/80` |
| `text-cream` | `text-foreground` |
| `bg-deep-brown/90` | `bg-background/90` |

### 2.3 Componentes Especificos

**CTABox.tsx (linhas 23, 30, 32):**
```tsx
// Linha 23 - De:
<p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-primary-foreground">
// Para:
<p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-foreground/80">

// Linha 30 - De:
<span className="text-base sm:text-lg text-primary">/dia</span>
// Para:
<span className="text-base sm:text-lg text-gold">/dia</span>

// Linha 32 - De:
<p className="text-xs sm:text-sm text-secondary-foreground">
// Para:
<p className="text-xs sm:text-sm text-muted-foreground">
```

**DonationForm.tsx - Cards de selecao:**
```tsx
// Linhas 315, 341 - De:
<span className="font-medium text-deep-brown text-sm sm:text-base">{option.label}</span>
// Para:
<span className="font-medium text-foreground text-sm sm:text-base">{option.label}</span>
```

**MariaStorySection.tsx (linha 62):**
```tsx
// De:
<div className="absolute inset-0 bg-cream/80" />
// Para:
<div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
```

**AlissaSection.tsx (linha 59):**
```tsx
// De:
className="... bg-gradient-to-b from-background via-cream-light to-background ..."
// Para:
className="... bg-gradient-to-b from-background via-muted/30 to-background ..."
```

**FinalCTASection.tsx (linha 43):**
```tsx
// De (inline style):
<div className="absolute inset-0 bg-gradient-to-b from-deep-brown/90 via-deep-brown/85 to-deep-brown/95" />
// Para:
<div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 dark:from-black/90 dark:via-black/85 dark:to-black/95" />
```

### 2.4 Formularios - Estilos CSS

```css
/* Adicionar em src/index.css */

/* Input adaptativo */
.input-luminis {
  @apply w-full px-4 py-4 text-base rounded-xl transition-all duration-300;
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

/* Radio/Payment/Amount cards adaptativos */
.radio-card,
.payment-card,
.amount-card {
  background: hsl(var(--card));
  border: 2px solid hsl(var(--border));
}

.radio-card span,
.payment-card span,
.amount-card span {
  color: hsl(var(--foreground));
}

/* Floating label adaptativo */
.floating-label-group:focus-within .floating-label,
.floating-label.active {
  background: hsl(var(--card));
  color: hsl(var(--primary));
}
```

### 2.5 Header - Toggle no Mobile

O ThemeToggle so aparece no desktop. Adicionar ao menu mobile:

```tsx
// Header.tsx - Dentro do mobile menu (linha 86-88)
{/* Adicionar antes dos navLinks no mobile */}
<div className="mb-6">
  <ThemeToggle />
</div>
```

---

## 3. CODIGO CSS OTIMIZADO

### 3.1 Variaveis Dark Mode Completas

```css
/* src/index.css - Substituir bloco .dark existente */
.dark {
  /* Cores base */
  --background: 20 45% 6%;
  --foreground: 36 100% 96%;
  
  /* Cards e popovers */
  --card: 20 45% 10%;
  --card-foreground: 36 100% 96%;
  --popover: 20 45% 10%;
  --popover-foreground: 36 100% 96%;
  
  /* Primarias e secundarias */
  --primary: 36 100% 60%;
  --primary-foreground: 20 45% 8%;
  --secondary: 33 100% 55%;
  --secondary-foreground: 0 0% 100%;
  
  /* Muted e accent */
  --muted: 20 30% 18%;
  --muted-foreground: 36 40% 65%;
  --accent: 33 100% 55%;
  --accent-foreground: 0 0% 100%;
  
  /* Bordas e inputs */
  --border: 20 30% 22%;
  --input: 20 30% 22%;
  --ring: 36 100% 60%;
  
  /* Tokens LUMINIS adaptativos */
  --gold: 36 100% 60%;
  --gold-glow: 36 100% 50%;
  --amber: 33 100% 55%;
  --cream: 20 45% 10%;
  --cream-light: 20 45% 14%;
  --deep-brown: 36 100% 90%;
  --warm-brown: 36 50% 70%;
  
  /* Glassmorphism dark */
  --glass-bg: 20 45% 10% / 0.9;
  --glass-border: 36 100% 60% / 0.15;
  --glass-shadow: 0 0% 0% / 0.4;
  
  /* Glows dark */
  --glow-gold: 0 0 40px hsl(36 100% 55% / 0.25);
  --glow-amber: 0 0 60px hsl(33 100% 55% / 0.15);
  
  /* Sidebar */
  --sidebar-background: 20 45% 8%;
  --sidebar-foreground: 36 100% 90%;
  --sidebar-primary: 36 100% 60%;
  --sidebar-primary-foreground: 20 45% 8%;
  --sidebar-accent: 20 30% 15%;
  --sidebar-accent-foreground: 36 100% 90%;
  --sidebar-border: 20 30% 20%;
  --sidebar-ring: 36 100% 60%;
}
```

### 3.2 Componentes CSS Adaptativos

```css
/* Adicionar ao final de src/index.css */

/* Glass card adaptativo ao tema */
.glass-card {
  @apply relative overflow-hidden;
  background: hsl(var(--glass-bg));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--glass-border));
  box-shadow: 0 8px 32px hsl(var(--glass-shadow));
}

.dark .glass-card {
  box-shadow: 
    0 8px 32px hsl(var(--glass-shadow)),
    inset 0 1px 0 hsl(36 100% 100% / 0.05);
}

/* Inputs e cards de formulario */
.dark .input-luminis {
  background: hsl(var(--card));
  border-color: hsl(var(--border));
}

.dark .input-luminis:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
}

.dark .radio-card,
.dark .payment-card,
.dark .amount-card {
  background: hsl(var(--card));
  border-color: hsl(var(--border));
}

.dark .radio-card.selected,
.dark .payment-card.selected,
.dark .amount-card.selected {
  border-color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.15);
}

/* Botao primario no dark */
.dark .btn-luminis {
  background: linear-gradient(
    135deg,
    hsl(var(--gold)) 0%,
    hsl(var(--amber)) 100%
  );
  color: hsl(20 45% 8%);
}

/* Progress steps */
.dark .progress-step {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.dark .progress-step.active,
.dark .progress-step.completed {
  background: hsl(var(--primary));
  color: hsl(20 45% 8%);
}

/* Urgency badge */
.dark .urgency-badge {
  background: hsl(var(--amber) / 0.2);
  color: hsl(var(--amber));
  border-color: hsl(var(--amber) / 0.4);
}
```

---

## 4. JUSTIFICATIVA TECNICA

| Mudanca | Razao |
|---------|-------|
| Variaveis CSS ao inves de cores fixas | Permite alternancia automatica de tema sem duplicar codigo |
| `--foreground` no lugar de `text-deep-brown` | Deep-brown e claro no light mode; no dark mode precisa ser claro tambem |
| Glass-bg adaptativo | Glassmorphism requer fundo semi-transparente que contraste com o tema |
| Reducao de opacidade dos glows | Glows muito intensos em fundos escuros causam fadiga visual |
| `--muted-foreground` com luminosidade 65% | Garante contraste 4.5:1 sobre fundo escuro (WCAG AA) |
| Input backgrounds em `--card` | Mantem hierarquia visual card > background |

---

## 5. CHECKLIST DE VERIFICACAO

### Antes da Implementacao
- [ ] Fazer backup do `src/index.css` atual
- [ ] Listar todos os componentes que usam cores fixas

### Durante a Implementacao
- [ ] Adicionar variaveis CSS dark mode em `src/index.css`
- [ ] Atualizar CTABox.tsx (3 linhas)
- [ ] Atualizar DonationForm.tsx (linhas 315, 341, 374, 400, 401, 414, 415)
- [ ] Atualizar MariaStorySection.tsx (linha 62)
- [ ] Atualizar AlissaSection.tsx (linha 59, 114)
- [ ] Atualizar FinalCTASection.tsx (linha 43, 69, 75, 95)
- [ ] Atualizar Header.tsx - adicionar ThemeToggle no mobile
- [ ] Adicionar estilos CSS adaptativos

### Apos a Implementacao
- [ ] Testar toggle light/dark em todas as secoes
- [ ] Verificar contraste com ferramenta (ex: axe DevTools)
- [ ] Testar em mobile (iOS Safari, Android Chrome)
- [ ] Verificar animacoes e transicoes
- [ ] Testar formulario de doacao completo em dark mode
- [ ] Validar estados hover/focus/active de todos os botoes
- [ ] Testar com `prefers-color-scheme: dark` do sistema

### Metricas de Sucesso
- [ ] Todos os textos com contraste >= 4.5:1 (texto normal)
- [ ] Todos os textos grandes com contraste >= 3:1
- [ ] Nenhuma cor fixa (`deep-brown`, `cream`) em elementos de texto
- [ ] Glassmorphism visivel e legivel em ambos os temas
- [ ] Formularios 100% funcionais e legiveis

---

## Arquivos a Modificar

1. `src/index.css` - Variaveis e estilos CSS
2. `src/components/CTABox.tsx` - 3 linhas
3. `src/components/DonationForm.tsx` - 8+ linhas
4. `src/components/MariaStorySection.tsx` - 1 linha
5. `src/components/AlissaSection.tsx` - 2 linhas
6. `src/components/FinalCTASection.tsx` - 4 linhas
7. `src/components/Header.tsx` - Adicionar toggle mobile
8. `src/components/FAQSection.tsx` - 2 linhas (opcional)
9. `src/components/OfferingsSection.tsx` - 1 linha (opcional)

