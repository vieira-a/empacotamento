import { Caixa } from '../caixa';

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
});
