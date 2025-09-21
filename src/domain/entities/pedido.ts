import { Produto } from './produto';

export class Pedido {
  constructor(
    private readonly _id: string,
    private readonly _listaProdutos: Produto[],
  ) {
    if (!_listaProdutos.length) throw new Error(`Pedido ${_id} sem produtos`);
  }

  get id(): string {
    return this._id;
  }

  get listaProdutos(): Produto[] {
    return this._listaProdutos;
  }

  static criar(id: string, produtos: Produto[]) {
    return new Pedido(id, produtos);
  }
}
