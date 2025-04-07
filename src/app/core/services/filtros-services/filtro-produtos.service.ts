import { Injectable } from '@angular/core';
import { FiltrosProdutos } from '../../models/filtros.model';



@Injectable({
    providedIn: 'root',
})

export class FiltroProdutosService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltrosProdutos): Promise<FiltrosProdutos> {

        let filtro = new FiltrosProdutos();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'id') {
            filtro.id = value.qty;
        }

        
        if (value.field === 'sku') {
            filtro.sku = value.qty;
        }

        if (value.field === 'nome') {
            filtro.nome = value.qty;
        }

        
        if (value.field === 'descricao') {
            filtro.descricao = value.qty;
        }

        
        if (value.field === 'preco') {
            filtro.preco = value.qty;
        }

        if (value.field === 'categoria') {
            filtro.categoria = value.qty;
        }

        if (value.field === 'emailusuario') {
            filtro.emailusuario = value.qty;
        }

        if(value.field === 'status'){
            filtro.status = value.qty;
          }

        return filtro;
    }
}