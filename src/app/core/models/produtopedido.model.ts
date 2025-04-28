export class ProdutoPedido {
    produtoId?: number;
    quantidade?: number;

    constructor(idProduto?: number, quantidade?: number) {
        this.produtoId = idProduto;
        this.quantidade = quantidade;
    }
}