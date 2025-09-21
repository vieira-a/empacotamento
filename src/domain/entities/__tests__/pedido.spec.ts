import { Pedido } from '../pedido';
import { Produto } from '../produto';

describe('Pedido', () => {
  let produtos: Produto[];

  beforeEach(() => {
    produtos = [Produto.criar('p1', 10, 10, 10), Produto.criar('p2', 5, 5, 5)];
  });

  it('deve criar um pedido válido', () => {
    const pedido = new Pedido('pedido1', produtos);

    expect(pedido.id).toBe('pedido1');
    expect(pedido.listaProdutos).toHaveLength(2);
  });

  it('deve lancar erro ao criar pedido sem produtos', () => {
    expect(() => new Pedido('pedido2', [])).toThrowError(
      'Pedido pedido2 sem produtos',
    );
  });
});
