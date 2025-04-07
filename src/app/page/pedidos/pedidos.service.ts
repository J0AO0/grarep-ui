import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Pedidos } from 'src/app/core/models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedidoUrl: string;

  constructor(private http: HttpClient) {
    this.pedidoUrl = `${environment.apiUrl}/pedidos`;
    
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pedidoUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.pedidoUrl}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(pedido: Pedidos): Promise<Pedidos> {
    return firstValueFrom(this.http.post<Pedidos>(this.pedidoUrl, pedido));
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
      // Certifique-se de que o formato da string de data está correto
      const dateFormat = 'YYYY/MM/DD H:mm';

      // Verifique se a data não é nula ou indefinida antes de tentar convertê-la
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, dateFormat)
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }
}
