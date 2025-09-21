import { Caixa } from '../../entities/caixa';
import { Pedido } from '../../entities/pedido';
import { Produto } from '../../entities/produto';
import { EmbalagemService } from '../embalage.service';

describe('EmbalagemService', () => {
  let caixas: Caixa[];
  let service: EmbalagemService;

  beforeEach(() => {
    caixas = [
      Caixa.criar('C1', 10, 10, 10),
      Caixa.criar('C2', 20, 20, 20),
      Caixa.criar('C3', 30, 30, 30),
    ];

    service = new EmbalagemService(caixas);
  });

  it('deve empacotar produto na menor caixa que cabe', () => {
    const pedido = Pedido.criar('P1', [Produto.criar('p1', 5, 5, 5)]);
    const resultado = service.embalar(pedido);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].caixa?.id).toBe('C1');
    expect(resultado[0].produtos).toHaveLength(1);
  });

  it('deve retornar caixa null se produto nao couber em nenhuma caixa', () => {
    const pedido = Pedido.criar('P2', [Produto.criar('p2', 50, 50, 50)]);
    const resultado = service.embalar(pedido);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].caixa).toBeNull();
    expect(resultado[0].observacao).toBe(
      'Produto não cabe em nenhuma caixa disponível.',
    );
  });

  it('deve empacotar multiplos produtos na mesma caixa se couberem', () => {
    const pedido = Pedido.criar('P3', [
      Produto.criar('p1', 5, 5, 5),
      Produto.criar('p2', 5, 5, 5),
    ]);

    const resultado = service.embalar(pedido);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].caixa?.id).toBe('C1');
    expect(resultado[0].produtos).toHaveLength(2);
  });
});
