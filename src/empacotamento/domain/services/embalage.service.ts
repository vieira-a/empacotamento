import { Pedido } from '../entities/pedido';
import { Caixa } from '../entities/caixa';
import { Produto } from '../entities/produto';

export class EmbalagemService {
  constructor(private readonly caixasDisponiveis: Caixa[]) {}

  public embalar(
    pedido: Pedido,
  ): { caixa: Caixa | null; produtos: Produto[]; observacao?: string }[] {
    const resultado: {
      caixa: Caixa | null;
      produtos: Produto[];
      observacao?: string;
    }[] = [];
    const produtos = [...pedido.listaProdutos];

    for (const produto of produtos) {
      let encaixado = false;

      for (const grupo of resultado) {
        if (
          grupo.caixa &&
          grupo.produtos.every((p) => grupo.caixa!.cabe(p)) &&
          grupo.caixa.cabe(produto)
        ) {
          grupo.produtos.push(produto);
          encaixado = true;
          break;
        }
      }

      if (!encaixado) {
        const caixaCandidata = this.caixasDisponiveis
          .filter((c) => c.cabe(produto))
          .sort((a, b) => a.volume - b.volume)[0];

        if (!caixaCandidata) {
          resultado.push({
            caixa: null,
            produtos: [produto],
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          });
        } else {
          resultado.push({ caixa: caixaCandidata, produtos: [produto] });
        }
      }
    }

    return resultado;
  }
}
