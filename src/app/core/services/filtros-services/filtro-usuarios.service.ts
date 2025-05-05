import { Injectable } from '@angular/core';
import { FiltroUsuarios } from '../../models/filtros.model';


@Injectable({
    providedIn: 'root',
})

export class FiltroUsuariosService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltroUsuarios): Promise<FiltroUsuarios> {

        let filtro = new FiltroUsuarios();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'id') {
            filtro.id = value.qty;
        }

        if (value.field === 'nome') {
            filtro.nome = value.qty;
        }

        if (value.field === 'emailusuario') {
            filtro.emailusuario = value.qty;
        }

        if (value.field === 'status') {
            filtro.status = value.qty;
        }

        return filtro;
    }
}
