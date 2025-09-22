# ADR 003: Cobertura de testes

## Status

Aceito

## Contexto

O empacotamento envolve regras complexas de dimensão, volume e orientação. É necessário garantir que mudanças futuras não quebrem a lógica. Além disso, a manutenção do código se torna mais fácil quando os testes estão próximos às implementações que verificam.

## Decisão

- Testes unitários para entidades (`Produto`, `Caixa`, `Pedido`) garantindo:
  - Validações de dimensões.
  - Cálculo de volume.
  - Verificação de encaixe (`cabe`).
- Testes unitários do caso de uso `EmpacotarPedidoUseCase` e do serviço `EmbalagemService`:
  - Pedidos com múltiplos produtos.
  - Produtos que não cabem em nenhuma caixa.
  - Produtos que cabem em diferentes caixas com rotações.
  - Verificação de que a menor caixa possível é sempre escolhida quando couberem.
  - Testes de agrupamento de produtos em caixas diferentes quando necessário.
- Testes de integração da API, cobrindo autenticação e retorno esperado.

- **Localização dos arquivos de teste:**

  Cada arquivo de teste (`*.spec.ts`) está localizado em uma pasta `__tests__` no mesmo diretório do arquivo que testa. Exemplo:

  ```
  src/domain/services/embalage.service.ts
  src/domain/services/__tests__/embalage-service.spec.ts
  ```

  Isso facilita encontrar o teste correspondente à implementação e mantém a estrutura do projeto modular e organizada.

## Consequências

- Cobertura de regras críticas do negócio.
- Rápida detecção de regressões.
- Manutenção facilitada, mesmo com lógica complexa de empacotamento.
- Estrutura de arquivos coerente, facilitando o onboarding de novos desenvolvedores.
