import { ProdutoPedido } from "./produtopedido.model";

export class Pedidos {
    id?: number;
    // Ajuste: Use apenas um campo para representar os produtos
    produtos: ProdutoPedido[] = [];  // Lista de produtos que pertencem ao pedido
    arquiteto: string;
    nf: number;
    representante: string;
    quantidade: number;  // Se necessário, adicione mais detalhes sobre a quantidade
    datagravacao: Date;
    emailusuario: string;
}
