# ADR 004: Caixas definidas no código

## Status

Aceito

## Contexto

Caixas possuem dimensões e identificadores fixos. Persistir caixas no banco de dados traria overhead desnecessário na execução do projeto, visto que não foi especificado como requisito a sua implementação em banco de dados.

## Decisão

- Definir as caixas **diretamente no código** como constantes (`CAIXAS_PADRAO`).
- Permitir facilmente alterações futuras de dimensões ou adição de novas caixas.

## Consequências

- Simplicidade na execução do teste.
- Evita operações de CRUD desnecessárias.
- Para o futuro, migrar para banco de dados ou serviço externo se a variedade de caixas aumentar.
