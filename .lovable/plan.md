
# Plano de Implementação — Otimização Completa do Site Projeto FÊNIX

## Visão Geral

Com base na análise completa do código, identificamos exatamente o que precisa ser feito em cada arquivo. Muitas mudanças do plano anterior já foram implementadas (52 crianças, TEMPO LIMITADO, QUERO FAZER PARTE, etc.). O foco agora é nas modificações ainda pendentes.

---

## Estado Atual vs. Pendências

### Já implementado (não precisa mudar):
- "52 crianças aguardando" no CTABox e UrgencySection
- "TEMPO LIMITADO" na UrgencySection e CTABox
- "QUERO FAZER PARTE" no CTABox
- "APOIE NOSSO TRABALHO" no FinalCTASection
- "Curitiba" em vários locais
- FAQ reformulado com objeções reais
- Bíblia, Nosso Amiguinho e carta na MathSection
- "alcançadas" na AlissaSection

### Pendente — o que este plano implementa:

---

## 1. Correção Global de Números (58 total, 6 apadrinhadas, 52 aguardando)

**UrgencySection.tsx** (linha 37 e 41-42)
- `sponsoredCount` inicial: `48` → `6`
- `maxChildren`: `100` → `58`
- Texto: "48 crianças em Curitiba já foram alcançadas" → "6 crianças em Curitiba já foram alcançadas"

**HeroSection.tsx** — Verificar e atualizar stats abaixo do vídeo:
- "58 Crianças atendidas" (já correto)
- "8 casas de apoio parceiras" (manter)

---

## 2. Remoção do Boleto e Integração WhatsApp no Checkout

**DonationForm.tsx** — 4 mudanças:

a) **Remover Boleto** do schema Zod e da lista de opções de pagamento (linha 20 e 358-361)

b) **Atualizar valores/opções** para refletir os preços corretos de R$ 259,75/criança em 12x:
```
1 criança → 12x de R$ 21,65 (total R$ 259,75)
2 crianças → 12x de R$ 43,29 (total R$ 519,50)
5 crianças → 12x de R$ 108,23 (total R$ 1.298,75)
7 crianças → 12x de R$ 151,52 (total R$ 1.818,25)
```

c) **Integração WhatsApp** — substituir `handleSubmit` para redirecionar ao WhatsApp:
```
https://wa.me/5519981481280?text=Oii, quero abençoar [X] crianças e vou fazer no [cartão/PIX]
```

d) **Atualizar nota de privacidade** (linha 469):
- Remover: "nunca serão compartilhados"
- Adicionar: "Os dados serão compartilhados para fins estritamente relacionados à compra e não serão publicados em hipótese alguma para outros fins"

---

## 3. Criar Seção de Preços com Parcelamento

**Novo componente: `PricingSection.tsx`** — inserido em `Index.tsx` antes do `DonationForm`

Cards clicáveis com:
- 🎁 1 Criança — **12x de R$ 21,65** — (Total: R$ 259,75)
- 🎁 2 Crianças — **12x de R$ 43,29** — (Total: R$ 519,50)
- 🎁 5 Crianças — **12x de R$ 108,23** — (Total: R$ 1.298,75)
- 🎁 7 Crianças — **12x de R$ 151,52** — (Total R$ 1.818,25)

Ao clicar em um card, redireciona para `#donation-form` e pré-seleciona o valor correspondente.

---

## 4. Autoplay do Vídeo

**VideoPlayer.tsx** — adicionar atributos `autoPlay muted` (autoplay requer muted para funcionar em todos os browsers)

**MariaStorySection.tsx** — mesmo ajuste na tag `<video>` da seção de história

---

## 5. Atualização de Texto dos Voluntários

**AlissaSection.tsx** (linha 138) — remover "pausaram a faculdade":
- Atual: "...que pausaram a faculdade para se dedicar ao Projeto FÊNIX."
- Novo: "...que trabalham nas férias com este projeto solidário para arrecadar fundos, continuar seus estudos e ajudar crianças a terem esperança."

---

## 6. FAQ — Remover Boleto da Resposta

**FAQSection.tsx** (linha 27) — na resposta sobre formas de pagamento:
- Remover "boleto bancário" da lista
- Manter apenas "cartão de crédito" e "PIX"

---

## 7. Botão Flutuante com Contador de 52 Crianças

Criar componente `FloatingCTAButton.tsx` — botão fixo no canto inferior direito mostrando "52 crianças aguardando" que leva ao `#donation-form`. Registrado em `Index.tsx`.

---

## Arquivos a Modificar/Criar

```text
src/components/DonationForm.tsx      — Remover boleto, WhatsApp, valores, privacidade
src/components/UrgencySection.tsx    — Corrigir números (6/58 em vez de 48/100)
src/components/AlissaSection.tsx     — Remover "pausaram a faculdade"
src/components/FAQSection.tsx        — Remover boleto da resposta
src/components/VideoPlayer.tsx       — Adicionar autoplay + muted
src/components/MariaStorySection.tsx — Adicionar autoplay + muted no vídeo
src/components/PricingSection.tsx    — NOVO: tabela de preços com parcelamento
src/components/FloatingCTAButton.tsx — NOVO: botão flutuante com contador
src/pages/Index.tsx                  — Adicionar PricingSection e FloatingCTAButton
```

---

## Ordem de Implementação

1. Corrigir números em UrgencySection (6 apadrinhadas, 58 total)
2. Remover boleto do DonationForm + integração WhatsApp + novos valores + privacidade
3. Remover "pausaram a faculdade" do AlissaSection
4. Remover boleto do FAQ
5. Adicionar autoplay+muted nos vídeos
6. Criar PricingSection com cards de parcelamento
7. Criar FloatingCTAButton
8. Atualizar Index.tsx

---

## Nota Técnica — Autoplay

Browsers modernos bloqueiam autoplay com som. A solução padrão é usar `autoPlay muted` juntos — o vídeo toca automaticamente sem som, e o usuário pode ativar o áudio manualmente. Isso garante compatibilidade com Chrome, Safari, Firefox e mobile.
