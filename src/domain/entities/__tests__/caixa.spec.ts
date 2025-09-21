import { Caixa } from '../caixa';
import { Produto } from '../produto';

describe('Caixa', () => {
  it('deve criar uma caixa valida', () => {
    const caixa = Caixa.criar('c1', 10, 20, 30);

    expect(caixa.id).toBe('c1');
    expect(caixa.volume).toBe(10 * 20 * 30);
  });

  it('deve lancar erro se dimensoes forem invalidas', () => {
    expect(() => Caixa.criar('c2', 0, 10, 10)).toThrowError(
      'Caixa c2 com dimensões inválidas.',
    );
    expect(() => Caixa.criar('c3', 10, -5, 10)).toThrowError(
      'Caixa c3 com dimensões inválidas.',
    );
  });

  it('deve retornar true se produto couber na caixa', () => {
    const caixa = Caixa.criar('c1', 10, 20, 30);
    const produto = Produto.criar('p1', 5, 10, 15);

    expect(caixa.cabe(produto)).toBe(true);
  });

  it('deve retornar false se produto nao couber na caixa', () => {
    const caixa = Caixa.criar('c1', 10, 20, 30);
    const produtoGrande = Produto.criar('p2', 15, 25, 35);

    expect(caixa.cabe(produtoGrande)).toBe(false);
  });
});
