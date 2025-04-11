export class ProdutoPedido {
    idProduto?: number;
    quantidade?: number;

    constructor(idProduto?: number, quantidade?: number) {
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
}