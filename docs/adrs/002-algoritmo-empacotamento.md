# ADR 002: Algoritmo de empacotamento

## Status

Aceito

## Contexto

Existem múltiplos algoritmos para empacotamento 3D (First Fit, Best Fit, heurísticas de orientação, otimização de volume). Cada produto pode ser rotacionado e várias caixas podem ser necessárias para um pedido.

## Decisão

Adotar uma abordagem **intermediária baseada em heurística**:

- Produtos são ordenados por volume decrescente.
- Tentar encaixar cada produto nas caixas existentes, considerando todas as rotações possíveis.
- Se não couber, seleciona a menor caixa disponível que comporte o produto.
- Se nenhum encaixe for possível, marcar o produto como “sem caixa disponível”.

## Consequências

- Simula um empacotamento eficiente sem precisar de algoritmos NP-completos.
- Permite rastrear facilmente quais produtos não couberam.
- Mantém o algoritmo suficientemente flexível para futuras melhorias.
