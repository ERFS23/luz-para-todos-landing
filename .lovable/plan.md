

# Plano: Tornar a Animação de Shader Visível no Hero

## Problema Identificado
A animação WebGL do shader está praticamente invisível porque:
1. A opacidade está muito baixa (25%)
2. O fundo cream sólido da página cobre a animação
3. Existem decorações de gradiente por cima do shader
4. Os elementos do hero têm fundos opacos

---

## Solução

### 1. Aumentar a Opacidade do Shader
- Mudar a opacidade de `0.25` para `0.6` ou `0.7` para tornar a animação bem visível
- Ajustar o z-index para garantir que fique visível mas atrás do conteúdo

### 2. Tornar o Fundo do Hero Transparente
- Remover o fundo sólido cream da seção hero
- Aplicar um fundo escuro/transparente que permita ver o shader
- Usar `bg-transparent` ou `bg-black/10` no hero

### 3. Remover Decorações que Obstruem
- Remover ou reduzir drasticamente os gradientes decorativos
- Eliminar os círculos blur que cobrem o shader

### 4. Adaptar Elementos para Transparência
- Usar glassmorphism nos cards de estatísticas (backdrop-blur)
- Tornar o CTABox semi-transparente
- Manter legibilidade do texto com sombras sutis

---

## Alterações Técnicas

### Arquivo: `src/components/HeroSection.tsx`

**Linha 9 - Aumentar opacidade:**
```tsx
// De:
<AnimatedShaderBackground opacity={0.25} className="z-0" />

// Para:
<AnimatedShaderBackground opacity={0.7} className="z-0" />
```

**Linhas 11-14 - Remover/reduzir decorações:**
```tsx
// Remover completamente ou reduzir drasticamente a opacidade:
{/* Decorações removidas para não cobrir o shader */}
```

**Linha 7 - Tornar seção transparente:**
```tsx
// De:
<section className="relative min-h-screen pt-20 pb-12 px-4 sm:px-6 overflow-hidden">

// Para:
<section className="relative min-h-screen pt-20 pb-12 px-4 sm:px-6 overflow-hidden bg-transparent">
```

**Linhas 51, 59, 67 - Cards de estatísticas com glassmorphism:**
```tsx
// De:
<div className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-cream-light/50">

// Para:
<div className="text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
```

### Arquivo: `src/components/CTABox.tsx`
- Adicionar `backdrop-blur` e reduzir opacidade do fundo
- Usar glassmorphism para manter legibilidade

### Arquivo: `src/index.css` (opcional)
- Criar classe utilitária para overlay escuro sutil no hero
- Garantir contraste do texto sobre o shader

---

## Resultado Esperado
- Animação de shader claramente visível como fundo do hero
- Conteúdo (texto, vídeo, CTA) continua legível com efeito glassmorphism
- Visual moderno e impactante com o shader em destaque

