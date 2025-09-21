import { Produto } from '../produto';

describe('Entidade Produto', () => {
  describe('Criacao do produto', () => {
    it('deve criar um produto válido com dimensões positivas', () => {
      const produto = Produto.criar('p1', 10, 20, 30);
      expect(produto).toBeInstanceOf(Produto);
      expect(produto.id).toBe('p1');
      expect(produto.dimensoes).toEqual([10, 20, 30]);
    });
  });
});
