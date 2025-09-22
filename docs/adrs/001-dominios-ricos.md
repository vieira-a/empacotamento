# ADR 001: Uso de domínios ricos

## Status

Aceito

## Contexto

O sistema de empacotamento lida com regras complexas de encaixe de produtos em caixas, validações de dimensões, volumes e orientações. Um modelo anêmico dificultaria manter a lógica de negócio consistente, distribuindo regras por múltiplos serviços.

## Decisão

Adotar um **domínio rico**, onde entidades como `Produto`, `Caixa` e `Pedido` encapsulam comportamentos e validações.

Por exemplo:

- `Caixa.cabe(produto)` verifica todas as rotações possíveis.
- `Produto` mantém dimensões e calcula volume internamente.
- `Pedido` organiza e expõe lista de produtos com validações de consistência.

## Consequências

- A lógica de negócio fica centralizada nas entidades.
- Facilita testes unitários específicos por entidade.
- Aumenta a complexidade inicial da modelagem.
