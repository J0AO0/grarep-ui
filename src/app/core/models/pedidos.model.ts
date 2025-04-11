import { ProdutoPedido } from "./produtopedido.model";
import { Produtos } from "./produtos.model";


export class Pedidos {
    id?: number;
    produtos: { produtoId: number, quantidade: number }[] = [];
    arquiteto: string;
    nf: number;
    representante: string;
    quantidade: number;
    datagravacao: Date;
    emailusuario: string;
    ProdutoPedido = new Array<ProdutoPedido>();
}