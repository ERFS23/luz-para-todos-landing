
# Plano de Otimização da Landing Page — Projeto FÊNIX

## Resumo das Mudanças

São 8 componentes a serem modificados, agrupados por tema:

---

## 1. Localização Geográfica (HeroSection + UrgencySection + FinalCTASection)

**HeroSection.tsx**
- Alterar "em todo o Brasil" → "em Curitiba"
- Inserir gatilho de urgência "decida fazer a diferença HOJE" no subtítulo ou abaixo do headline principal

**UrgencySection.tsx**
- Substituir badge "Vagas limitadas este mês" → "TEMPO LIMITADO"
- Alterar CTA "Garantir Minha Vaga Agora" → "Garantir Minha Participação"
- Ajustar contagem da barra de progresso para refletir 52 crianças aguardando (de 100 total, 48 apadrinhadas)
- Remover "Cancele quando quiser" do rodapé do botão

**FinalCTASection.tsx**
- Atualizar "23 crianças esperam por você" → "52 crianças esperam por você"

---

## 2. Botões e Call-to-Actions (CTABox + UrgencySection + FinalCTASection)

**CTABox.tsx**
- Alterar badge de urgência para mostrar "52 crianças aguardando"
- Alterar botão principal "QUERO SER LUZ" → "QUERO FAZER PARTE"
- Remover "Cancele quando quiser" dos trust indicators

**FinalCTASection.tsx**
- Alterar botão "SIM, QUERO SER LUZ" → "APOIE NOSSO TRABALHO"

---

## 3. Seção da História (MariaStorySection.tsx)

Substituir toda a narrativa fictícia da Maria por uma história real do abrigo:
- Remover slider antes/depois com imagens (maria-before.jpg / maria-after.jpg)
- Substituir por seção de narrativa com link para vídeo externo do abrigo
- Manter o layout geral, mas usando um embed/link de vídeo e texto real sobre o trabalho no abrigo em Curitiba
- Manter o badge "História Real"

---

## 4. Seção de "Matemática" (MathSection.tsx)

- Renomear "Matemática do Coração" → "Decisões que Fazem a Diferença"
- Na lista de itens do card de doação (lado direito), atualizar:
  - Remover "1 Cesta Básica completa" e "Brinquedos para alegrar"
  - Incluir: "1 Bíblia Ilustrada", "Revista Nosso Amiguinho", "Carta personalizada" como brindes
- Manter a lógica de animação do contador em R$ 0,70/dia

---

## 5. Seção dos Voluntários (AlissaSection.tsx)

- Alterar descrição para explicitar que são "universitários de Teologia e Medicina"
- Deixar claro que as doações ajudam os voluntários a voltarem para a faculdade
- Atualizar o stat "Teologia / iniciando em 2025" para refletir o curso atual
- Atualizar a quote final para mencionar o retorno à faculdade
- Atualizar "abençoadas" → "alcançadas" (caso exista no texto)

---

## 6. FAQ (FAQSection.tsx)

Reformular 3–4 perguntas focando em antecipação de objeções reais:

| Pergunta Atual | Nova Abordagem |
|---|---|
| "Como funciona o apadrinhamento?" | Mantida, mas atualizada com brindes (Bíblia, Nosso Amiguinho, carta) |
| "Posso cancelar a qualquer momento?" | Transformada em objeção: "E se eu não puder continuar doando?" |
| "A doação é dedutível do IR?" | Mantida |
| Nova | "Minha doação realmente chega às crianças?" — reforça transparência |
| Nova | "Por que devo confiar em dois universitários?" — humaniza e antecipa desconfiança |

---

## 7. Tipografia Pós-FAQ (FinalCTASection.tsx)

- Melhorar hierarquia visual da seção final
- Aumentar o peso e tamanho da citação principal
- Refinar os trust badges para incluir menção a Curitiba/local

---

## Arquivos a Modificar

```text
src/components/HeroSection.tsx        — Curitiba + urgência "HOJE"
src/components/MariaStorySection.tsx  — Substituir por história real + vídeo
src/components/MathSection.tsx        — Renomear seção + atualizar brindes
src/components/AlissaSection.tsx      — Universitários + faculdade + "alcançadas"
src/components/CTABox.tsx             — "QUERO FAZER PARTE" + 52 crianças + remover cancelamento
src/components/UrgencySection.tsx     — "TEMPO LIMITADO" + barra 52/100 + remover cancelamento
src/components/FAQSection.tsx         — Reformular com foco em objeções
src/components/FinalCTASection.tsx    — "APOIE NOSSO TRABALHO" + 52 crianças + tipografia
```

---

## Nota sobre o Vídeo do Abrigo

Para a seção da história real, será inserido um player de vídeo com link/URL a ser fornecido. Por enquanto, será adicionado um placeholder com campo de URL configurável, ou pode ser vinculado diretamente ao vídeo existente (`public/videos/hero-video.mp4`), caso seja o vídeo correto do abrigo.
