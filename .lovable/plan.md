
# Plan: Final Hero CTA Section, Multi-Step Form & Page Optimizations

## Summary
Add two final sections to complete the landing page: an emotional Hero CTA with a powerful quote and trust badges, and a 3-step multi-step donation form. Also implement smooth scrolling and performance optimizations across the entire page.

---

## Section 1: Hero CTA Section (FinalCTASection)

### Design
- Full-width section with a warm, emotional background (gradient overlay on textured image)
- Large centered quote in Playfair Display italic: "Porque no final, a gente não lembra do dinheiro..."
- Two action buttons side-by-side:
  - Primary: "SIM, QUERO SER LUZ" (gold gradient, glow effect)
  - Secondary: "FALAR COM ALISSA" (outlined, subtle hover)
- Trust badges row: Lock icon + "Seguro", Lightning icon + "Instantâneo"
- Final urgency text: "23 crianças esperam" with pulsing animation
- Fade-in animations triggered on scroll

### Visual Effects
- Subtle parallax on background
- Glassmorphism container for the quote
- Gold glow accents

---

## Section 2: Multi-Step Form (DonationForm)

### Step 1: Personal Information
- Nome (full name) - floating label input
- Email - email validation
- WhatsApp - phone mask format
- CPF - Brazilian CPF mask with validation
- All fields with gold border on focus state

### Step 2: Child Preferences  
- Gênero da criança (Radio buttons: Menino / Menina / Sem preferência)
- Faixa etária (Radio buttons: 0-3 anos / 4-7 anos / 8-12 anos / Sem preferência)

### Step 3: Payment Method
- Payment method cards (Cartão de Crédito, PIX, Boleto)
- Monthly amount selection (R$ 42,30 / R$ 84,60 / R$ 127,00 / Outro valor)

### Form UX Features
- Top progress indicator with 3 steps (gold filled for completed/current)
- Floating labels that animate up on focus/filled
- Gold border glow on input focus
- "Próximo" / "Voltar" navigation buttons
- Final "Confirmar Apadrinhamento" button with confetti trigger
- Form validation with error messages (using existing zod patterns)
- Mobile-friendly vertical layout

---

## Section 3: Page-Wide Optimizations

### Smooth Scrolling
- Add `scroll-behavior: smooth` to html element in CSS
- Implement smooth scroll for all anchor links in Header

### Mobile-First Enhancements
- Review all sections for proper mobile stacking
- Ensure form inputs are at least 44px touch targets
- Add mobile hamburger menu to Header

### Performance Optimizations
- Add `loading="lazy"` to images below the fold
- Use CSS `will-change` for animated elements
- Implement `prefers-reduced-motion` media query fallbacks
- Add intersection observer-based lazy animations

---

## Technical Details

### New Files to Create
1. `src/components/FinalCTASection.tsx` - Emotional hero CTA section
2. `src/components/DonationForm.tsx` - Multi-step form component

### Files to Modify
1. `src/pages/Index.tsx` - Add new sections after FAQ
2. `src/index.css` - Add smooth scroll, floating label styles, mobile menu styles
3. `src/components/Header.tsx` - Add mobile hamburger menu

### Component Architecture

```text
DonationForm
├── Progress Indicator (3 dots/bars)
├── Step 1: PersonalInfoStep
│   ├── FloatingLabelInput (Nome)
│   ├── FloatingLabelInput (Email)
│   ├── FloatingLabelInput (WhatsApp)
│   └── FloatingLabelInput (CPF)
├── Step 2: PreferencesStep
│   ├── RadioGroup (Gênero)
│   └── RadioGroup (Idade)
├── Step 3: PaymentStep
│   ├── PaymentMethodCards
│   └── AmountSelector
└── Navigation Buttons
```

### Validation Schema (Zod)
- Name: required, min 3 chars, max 100 chars
- Email: valid email format
- WhatsApp: valid Brazilian phone
- CPF: valid CPF format (11 digits)
- Preferences: optional
- Payment: required selection

### CSS Additions
- `.floating-label` class for animated labels
- `.input-luminis` class for gold-bordered inputs
- `@media (prefers-reduced-motion)` for accessibility
- Mobile hamburger menu styles
- `.scroll-smooth` behavior on html

---

## Implementation Order
1. Add smooth scroll and floating label CSS utilities
2. Create FinalCTASection component
3. Create DonationForm component with all 3 steps
4. Update Header with mobile menu
5. Integrate new sections into Index.tsx
6. Add lazy loading and performance attributes

---

## Page Structure After Implementation

```text
Header (fixed, with mobile menu)
├── Hero Section
├── Offerings Section  
├── Math Section
├── Maria Story Section
├── Alissa Section
├── Testimonial Carousel
├── Urgency Section
├── FAQ Section
├── Final CTA Section (NEW)
└── Donation Form (NEW)
```
