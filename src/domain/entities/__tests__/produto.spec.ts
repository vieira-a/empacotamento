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

    it('deve lançar erro se largura for 0 ou negativa', () => {
      expect(() => Produto.criar('p4', 10, 0, 10)).toThrow(
        'Produto p4 com dimensões inválidas.',
      );
      expect(() => Produto.criar('p5', 10, -5, 10)).toThrow(
        'Produto p5 com dimensões inválidas.',
      );
    });

    it('deve lançar erro se comprimento for 0 ou negativo', () => {
      expect(() => Produto.criar('p6', 10, 10, 0)).toThrow(
        'Produto p6 com dimensões inválidas.',
      );
      expect(() => Produto.criar('p7', 10, 10, -2)).toThrow(
        'Produto p7 com dimensões inválidas.',
      );
    });
  });
});
