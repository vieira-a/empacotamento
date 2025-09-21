import { EmbalagemService } from 'src/domain/services/embalage.service';
import { Pedido } from '../../domain/entities/pedido';
import { Produto } from '../../domain/entities/produto';
import { CAIXAS_PADRAO } from '../../domain/constants/caixas';
import { PedidoDTO } from '../dtos/pedido.dto';
import { CaixaDTO } from '../dtos/caixa.dto';

export class EmpacotarPedidoUseCase {
  private readonly embalagemService = new EmbalagemService(CAIXAS_PADRAO);

  execute(pedidoDTO: PedidoDTO): { pedido_id: string; caixas: CaixaDTO[] } {
    const produtos = pedidoDTO.produtos.map((p) =>
      Produto.criar(
        p.produto_id,
        p.dimensoes.altura,
        p.dimensoes.largura,
        p.dimensoes.comprimento,
      ),
    );

    const pedido = Pedido.criar(pedidoDTO.pedido_id, produtos);

    const resultado = this.embalagemService.embalar(pedido);

    const caixas: CaixaDTO[] = resultado.map((r) => ({
      caixa_id: r.caixa ? r.caixa.id : null,
      produtos: r.produtos.map((p) => p.id),
      ...(r.observacao ? { observacao: r.observacao } : {}),
    }));

    return { pedido_id: pedido.id, caixas };
  }
}
