import { PedidoDTO } from '../../dtos/pedido.dto';
import { EmpacotarPedidoUseCase } from '../empacotar-pedido.usecase';

describe('EmpacotarPedidoUseCase', () => {
  let useCase: EmpacotarPedidoUseCase;

  beforeEach(() => {
    useCase = new EmpacotarPedidoUseCase();
  });

  it('deve empacotar um pedido com produtos que cabem nas caixas', () => {
    const pedidoDTO: PedidoDTO = {
      pedido_id: 'pedido1',
      produtos: [
        {
          produto_id: 'p1',
          dimensoes: { altura: 5, largura: 5, comprimento: 5 },
        },
        {
          produto_id: 'p2',
          dimensoes: { altura: 9, largura: 9, comprimento: 9 },
        },
      ],
    };

    const resultado = useCase.execute(pedidoDTO);

    expect(resultado.pedido_id).toBe('pedido1');
    expect(resultado.caixas).toHaveLength(1);
    expect(resultado.caixas[0].produtos).toEqual(['p1', 'p2']);
    expect(resultado.caixas[0].caixa_id).toBeDefined();
    expect(resultado.caixas[0].observacao).toBeUndefined();
  });

  it('deve retornar caixa null para produto que nao cabe em nenhuma caixa', () => {
    const pedidoDTO: PedidoDTO = {
      pedido_id: 'pedido2',
      produtos: [
        {
          produto_id: 'p1',
          dimensoes: { altura: 100, largura: 100, comprimento: 100 },
        },
      ],
    };

    const resultado = useCase.execute(pedidoDTO);

    expect(resultado.caixas).toHaveLength(1);
    expect(resultado.caixas[0].caixa_id).toBeNull();
    expect(resultado.caixas[0].observacao).toBe(
      'Produto não cabe em nenhuma caixa disponível.',
    );
  });

  it('deve empacotar mmltiplos produtos em caixas separadas se necessario', () => {
    const pedidoDTO: PedidoDTO = {
      pedido_id: 'pedido3',
      produtos: [
        {
          produto_id: 'p1',
          dimensoes: { altura: 5, largura: 5, comprimento: 5 },
        },
        {
          produto_id: 'p2',
          dimensoes: { altura: 25, largura: 25, comprimento: 25 },
        },
      ],
    };

    const resultado = useCase.execute(pedidoDTO);

    expect(resultado.caixas).toHaveLength(1);
    expect(resultado.caixas[0].produtos).toEqual(['p1', 'p2']);
  });
});
