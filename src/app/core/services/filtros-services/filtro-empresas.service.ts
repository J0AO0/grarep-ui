import { Injectable } from '@angular/core';
import { FiltrosEmpresas } from '../../models/filtros.model';



@Injectable({
    providedIn: 'root',
})

export class FiltroEmpresasService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltrosEmpresas): Promise<FiltrosEmpresas> {

        let filtro = new FiltrosEmpresas();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'id') {
            filtro.id = value.qty;
        }

        if (value.field === 'razaosocial') {
            filtro.razaosocial = value.qty;
        }

        if (value.field === 'cpfoucnpj') {
            filtro.cpfoucnpj = value.qty;
        }

        if (value.field === 'naturezapessoa') {
            filtro.naturezapessoa = value.qty;
        }

        if (value.field === 'cep') {
            filtro.cep = value.qty;
        }

        if (value.field === 'logradouro') {
            filtro.logradouro = value.qty;
        }

        if (value.field === 'numero') {
            filtro.numero = value.qty;
        }

        if (value.field === 'complemento') {
            filtro.complemento = value.qty;
        }

        if (value.field === 'bairro') {
            filtro.bairro = value.qty;
        }

        if (value.field === 'cidade') {
            filtro.cidade = value.qty;
        }

        if (value.field === 'uf') {
            filtro.uf = value.qty;
        }

        if (value.field === 'nomecontato') {
            filtro.nomecontato = value.qty;
        }

        if (value.field === 'telefone') {
            filtro.telefone = value.qty;
        }

        if (value.field === 'whats') {
            filtro.whats = value.qty;
        }

        if (value.field === 'email') {
            filtro.email = value.qty;
        }

        if (value.field === 'valor') {
            filtro.valor = value.qty;
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