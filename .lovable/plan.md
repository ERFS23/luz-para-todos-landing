
# Plano: Implementar DisplayCards e Atualizar Ofertas

## Resumo

Vou criar o componente `DisplayCards` no estilo solicitado e refatorar a seção "O Que Oferecemos" para exibir os 5 produtos reais do projeto LUMINIS em um layout de cards empilhados com efeito de hover interativo.

---

## Novos Produtos a Exibir

1. **Revista Nosso Amiguinho** - Assinatura mensal
2. **Revista Vida e Saude** - Assinatura mensal
3. **Biblia Ilustrada para Familia** - Presente especial
4. **Biblia Ilustrada para Crianca** - Presente infantil
5. **Oferta do Anjo** - Contribuicao especial

---

## Arquivos a Criar/Modificar

### 1. Criar `src/components/ui/display-cards.tsx`

Novo componente com:
- Card individual (`DisplayCard`) com icone, titulo, descricao e data
- Container (`DisplayCards`) com layout de grid empilhado
- Efeitos de hover com transicao suave e grayscale
- Adaptado ao tema dark/light usando variaveis CSS do projeto

### 2. Modificar `src/components/OfferingsSection.tsx`

- Importar o novo componente `DisplayCards`
- Substituir o array `offerings` pelos 5 novos produtos
- Configurar cada card com:
  - Icone apropriado (Book, Heart, Newspaper, Baby, Sparkles)
  - Titulo e descricao em portugues
  - Cores douradas (gold/amber) para manter identidade visual LUMINIS
  - Classes de posicionamento para efeito de empilhamento

---

## Detalhes Tecnicos

### DisplayCard - Estrutura

```text
+----------------------------------+
|  [Icone]  Titulo                |
|                                  |
|  Descricao do produto            |
|                                  |
|  Data/Tag                        |
+----------------------------------+
```

### DisplayCards - Layout Grid

```text
     [Card 1]
        [Card 2]
           [Card 3]
              [Card 4]
                 [Card 5]
```

Cada card deslocado 12-16px horizontal e 10px vertical, criando efeito cascata.

### Configuracao dos Cards

| Card | Icone | Titulo | Cor |
|------|-------|--------|-----|
| 1 | Newspaper | Revista Nosso Amiguinho | Gold |
| 2 | Heart | Revista Vida e Saude | Amber |
| 3 | BookOpen | Biblia Ilustrada Familia | Gold |
| 4 | Baby | Biblia Ilustrada Crianca | Amber |
| 5 | Sparkles | Oferta do Anjo | Gold |

### Efeitos de Hover

- Grayscale desativado ao passar o mouse
- Overlay transparente removido
- Translacao vertical para destaque
- Transicao suave de 500-700ms

---

## Adaptacoes ao Projeto LUMINIS

1. **Cores**: Usar `text-primary` e `text-amber-500` em vez de azul
2. **Background**: Usar `bg-card` para compatibilidade dark mode
3. **Bordas**: Usar `border-border` e `outline-border`
4. **Textos**: Usar `text-foreground` e `text-muted-foreground`

---

## Responsividade

- **Mobile**: Cards em coluna unica, sem empilhamento
- **Tablet**: Empilhamento reduzido
- **Desktop**: Empilhamento completo com hover interativo

O componente usara `flex-col md:grid` para alternar entre layouts.
