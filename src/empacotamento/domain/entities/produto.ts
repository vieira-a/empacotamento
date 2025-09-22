export class Produto {
  private constructor(
    private readonly _id: string,
    private readonly _altura: number,
    private readonly _largura: number,
    private readonly _comprimento: number,
  ) {
    if (_altura <= 0 || _largura <= 0 || _comprimento <= 0) {
      throw new Error(`Produto ${_id} com dimensões inválidas.`);
    }
  }

  get id(): string {
    return this._id;
  }

  public static criar(
    id: string,
    altura: number,
    largura: number,
    comprimento: number,
  ) {
    return new Produto(id, altura, largura, comprimento);
  }

  get volume(): number {
    return this._altura * this._largura * this._comprimento;
  }

  get dimensoes(): [number, number, number] {
    return [this._altura, this._largura, this._comprimento];
  }
}
