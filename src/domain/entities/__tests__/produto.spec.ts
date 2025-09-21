import { Produto } from '../produto';

describe('Entidade Produto', () => {
  describe('Criacao do produto', () => {
    it('deve criar um produto válido com dimensões positivas', () => {
      const produto = Produto.criar('p1', 10, 20, 30);
      expect(produto).toBeInstanceOf(Produto);
      expect(produto.id).toBe('p1');
      expect(produto.dimensoes).toEqual([10, 20, 30]);
    });

    it('deve lançar erro se altura for 0 ou negativa', () => {
      expect(() => Produto.criar('p2', 0, 10, 10)).toThrow(
        'Produto p2 com dimensões inválidas.',
      );
      expect(() => Produto.criar('p3', -1, 10, 10)).toThrow(
        'Produto p3 com dimensões inválidas.',
      );
    });
  });
});
