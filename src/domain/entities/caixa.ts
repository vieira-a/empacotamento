import { Produto } from './produto';

export class Caixa {
  private constructor(
    private readonly _id: string,
    private readonly _altura: number,
    private readonly _largura: number,
    private readonly _comprimento: number,
  ) {
    if (_altura <= 0 || _largura <= 0 || _comprimento <= 0) {
      throw new Error(`Caixa ${_id} com dimensões inválidas.`);
    }
  }

  public static criar(
    id: string,
    altura: number,
    largura: number,
    comprimento: number,
  ) {
    return new Caixa(id, altura, largura, comprimento);
  }

  get id(): string {
    return this._id;
  }

  get volume(): number {
    return this._altura * this._largura * this._comprimento;
  }

  public cabe(produto: Produto): boolean {
    const dimensoesProduto = [...produto.dimensoes].sort((a, b) => a - b);
    const dimensoesCaixa = [
      this._altura,
      this._largura,
      this._comprimento,
    ].sort((a, b) => a - b);

    return dimensoesProduto.every((dim, i) => dim <= dimensoesCaixa[i]);
  }
}
