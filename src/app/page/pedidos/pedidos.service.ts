import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Pedidos } from 'src/app/core/models/pedidos.model';
import { ProdutoPedido } from 'src/app/core/models/produtopedido.model';
import { Produtos } from 'src/app/core/models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidoUrl: string;

  constructor(private http: HttpClient) {
    this.pedidoUrl = `${environment.apiUrl}/pedidos`;
  }

  buscarValores(
    idpedido: number,
    idproduto: number
  ): Promise<ProdutoPedido> {
    return firstValueFrom(
      this.http.get(`${this.pedidoUrl}/${idpedido}/${idproduto}`)
    ).then((response) => response as ProdutoPedido);
  }

  carregarProdutos(produto): Promise<Produtos[]> {
    let params = new HttpParams();
    params = params.set('id', produto);
    return firstValueFrom(this.http.get(this.pedidoUrl, { params })).then(
      (response) => response as Produtos[]
    );
  }

  adicionarProdutos(idPedido: number, produtos: ProdutoPedido[]): Promise<void> {
    const url = `${this.pedidoUrl}/${idPedido}/produtos`;
    console.log('URL da requisição:', url);
    console.log('Corpo da requisição:', JSON.stringify(produtos, null, 2));

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { produtos }; // Envolve o array em um objeto, ajuste conforme o backend

    return firstValueFrom(this.http.post<void>(url, body, { headers }))
      .then(() => {
        console.log('Produtos adicionados ao pedido com sucesso');
      })
      .catch(error => {
        console.error('Erro ao adicionar produtos ao pedido:', error);
        console.log('Detalhes do erro:', error.error); // Exibe a mensagem do servidor
        throw error;
      });
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pedidoUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    );
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.pedidoUrl}/${id}`))
      .then(() => null);
  }

  adicionar(pedido: Pedidos): Promise<Pedidos> {
    return this.http.post<Pedidos>(`${this.pedidoUrl}`, pedido)
      .toPromise()
      .then(pedidoCriado => {
        return pedidoCriado;
      })
      .catch(error => {
        console.error('Erro ao criar pedido', error);
        throw error;
      });
  }

  atualizar(pedido: Pedidos): Promise<Pedidos> {
    return firstValueFrom(this.http.put(`${this.pedidoUrl}/${pedido.id}`, pedido))
      .then((response) => response as Pedidos);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.pedidoUrl}/${id}`))
      .then((response) => response as Pedidos);
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.pedidoUrl}/${id}/status`, status, { headers }))
      .then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pedidoUrl}${valor}`))
      .then((response) => response);
  }

  convertStringDate(obj: any[]) {
    obj.forEach((element) => {
      const dateFormat = 'YYYY/MM/DD H:mm';
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, dateFormat)
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }
}