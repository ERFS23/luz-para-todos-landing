
# Plano: Renomear Projeto LUMINIS para FÊNIX

## Resumo

Vou substituir todas as ocorrências de "LUMINIS", "Luminis" e "luminis" por "FÊNIX", "Fênix" e "fenix" respectivamente, mantendo a consistência de capitalização em cada contexto.

---

## Arquivos a Modificar

### 1. index.html (Metadados e SEO)
- Linha 10: `<title>Projeto LUMINIS` → `Projeto FÊNIX`
- Linha 11: `Projeto LUMINIS` na meta description
- Linha 12: `Projeto LUMINIS` no author
- Linha 14: `Projeto LUMINIS` no og:title
- Linha 20: `@ProjetoLuminis` → `@ProjetoFenix`

**Novo conteudo do title:**
```html
<title>Projeto FÊNIX - Seja a Luz de uma Criança</title>
```

---

### 2. src/index.css (Comentários CSS)
- Linha 7: `/* LUMINIS Color Palette */` → `/* FÊNIX Color Palette */`
- Linha 38: `/* Custom LUMINIS tokens */` → `/* Custom FÊNIX tokens */`
- Linha 94: `/* Tokens LUMINIS adaptativos */` → `/* Tokens FÊNIX adaptativos */`

---

### 3. tailwind.config.ts (Comentário)
- Linha 64: `// LUMINIS custom colors` → `// FÊNIX custom colors`

---

### 4. src/components/Header.tsx (Logo e texto)
- Linha 45: `LUMINIS` → `FÊNIX`

---

### 5. src/components/HeroSection.tsx (Descrição principal)
- Linha 28: `O Projeto LUMINIS leva luz...` → `O Projeto FÊNIX leva luz...`

---

### 6. src/components/MariaStorySection.tsx (Timeline)
- Linha 129: `Conheceu o LUMINIS` → `Conheceu o FÊNIX`

---

### 7. src/components/FAQSection.tsx (Perguntas frequentes)
- Linha 11: `O Projeto LUMINIS opera...` → `O Projeto FÊNIX opera...`
- Linha 23: `O Projeto LUMINIS possui registro...` → `O Projeto FÊNIX possui registro...`
- Linha 62: `Tudo que você precisa saber sobre o Projeto LUMINIS` → `Projeto FÊNIX`

---

### 8. src/components/FinalCTASection.tsx (Rodapé)
- Linha 75: `— Alissa, Fundadora do Luminis` → `— Alissa, Fundadora do Fênix`
- Linha 92: URL WhatsApp: `sobre%20o%20Luminis` → `sobre%20o%20Fênix`

---

### 9. .lovable/plan.md (Documentação interna)
- Linha 6: `projeto LUMINIS` → `projeto FÊNIX`
- Linha 37: `identidade visual LUMINIS` → `identidade visual FÊNIX`
- Linha 87: `Adaptacoes ao Projeto LUMINIS` → `Adaptações ao Projeto FÊNIX`

---

## Classes CSS que NÃO mudam

As seguintes classes CSS usam "luminis" como identificador interno e serão mantidas para evitar quebrar estilos:
- `.btn-luminis` (botão primário)
- `.input-luminis` (campos de input)

Essas são convenções de nomenclatura de código, não texto visível ao usuário.

---

## Resumo das Mudanças

| Arquivo | Ocorrências | Tipo de Mudança |
|---------|-------------|-----------------|
| index.html | 5 | Metadados SEO |
| src/index.css | 3 | Comentários CSS |
| tailwind.config.ts | 1 | Comentário |
| src/components/Header.tsx | 1 | Logo visível |
| src/components/HeroSection.tsx | 1 | Texto descritivo |
| src/components/MariaStorySection.tsx | 1 | Timeline |
| src/components/FAQSection.tsx | 3 | FAQ textos |
| src/components/FinalCTASection.tsx | 2 | Citação + WhatsApp URL |
| .lovable/plan.md | 3 | Documentação |

**Total: 20 substituições de texto visível/metadados**

---

## Resultado Final

Após as mudanças:
- O nome "FÊNIX" aparecerá no header, hero section, FAQ e rodapé
- Os metadados SEO refletirão o novo nome
- A identidade visual (cores douradas) permanece intacta
- Nenhum estilo CSS será quebrado
