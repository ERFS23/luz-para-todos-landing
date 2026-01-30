

# Plano: Melhorar Legibilidade dos Textos Pequenos no Hero

## Problema Identificado
Os textos pequenos no Hero estão usando `text-muted-foreground` que tem baixo contraste sobre o fundo animado do shader. Os textos afetados são:

1. **Subtítulo principal** (linha 27): "O Projeto LUMINIS leva luz..."
2. **Labels das estatísticas** (linhas 50, 58, 66): "Crianças atendidas", "Abrigos parceiros", "Vai direto às crianças"
3. **Indicador de scroll** (linha 82): "Role para ver mais"

---

## Solução

Trocar `text-muted-foreground` por cores mais visíveis com melhor contraste:
- Usar `text-white` ou `text-white/90` para máximo contraste
- Adicionar `drop-shadow` sutil para destacar do fundo animado

---

## Alterações no Arquivo: `src/components/HeroSection.tsx`

| Linha | De | Para |
|-------|----|----|
| 27 | `text-muted-foreground` | `text-white/90 drop-shadow-md` |
| 50 | `text-muted-foreground` | `text-white/80` |
| 58 | `text-muted-foreground` | `text-white/80` |
| 66 | `text-muted-foreground` | `text-white/80` |
| 82 | `text-muted-foreground` | `text-white/70` |

---

## Resultado Esperado
- Todos os textos pequenos claramente legíveis sobre a animação de shader
- Contraste adequado sem perder a elegância visual
- Sombra sutil no subtítulo principal para garantir legibilidade

