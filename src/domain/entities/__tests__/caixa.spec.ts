import { Caixa } from '../caixa';

describe('Caixa', () => {
  it('deve criar uma caixa valida', () => {
    const caixa = Caixa.criar('c1', 10, 20, 30);

    expect(caixa.id).toBe('c1');
    expect(caixa.volume).toBe(10 * 20 * 30);
  });
});
