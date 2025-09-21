# Microsserviço de empacotamento

## Descrição

API Web utilizando Node com NestJs que recebe, em formato JSON, uma lista de pedidos. Cada pedido contém uma lista de produtos, cada um com suas dimensões (altura, largura, comprimento).

A API processa cada pedido e determina a melhor forma de embalar os produtos, selecionando uma ou mais caixas para cada pedido e especificando quais produtos vão em cada caixa.

### Caixas disponívels

- Caixa 1: 30 x 40 x 80
- Caixa 2: 50 x 50 x 40
- Caixa 3: 50 x 80 x 60

**Entrada:**

A API deve aceitar um JSON contendo N pedidos diferentes. Cada pedido deve ter entre N produtos. Cada produto deve incluir suas dimensões em centímetros (altura, largura, comprimento).

**Processamento:**

Para cada pedido, a API deve calcular a melhor forma de empacotar os produtos dentro das caixas de papelão disponíveis. Você poderá usar uma ou mais caixas de papelão para empacotar o pedido. Deve considerar a otimização do espaço, tentando minimizar o número de caixas de papelão a serem usadas.

**Saída:**

A API deve retornar um JSON que, para cada pedido, lista as caixas usadas e quais produtos foram colocados em cada caixa.
