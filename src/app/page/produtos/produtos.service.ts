import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom, Observable } from 'rxjs';
import { FiltrosProdutos } from 'src/app/core/models/filtros.model';
import { Produtos } from 'src/app/core/models/produtos.model';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produtoUrl: string;

  constructor(private http: HttpClient) {
    this.produtoUrl = `${environment.apiUrl}/produtos`;
  }

  // Faz o upload da foto associando ao produto por ID
  uploadFoto(produtoId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.produtoUrl}/${produtoId}/foto`, formData);
  }

  produtoImagem(produtoId: number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Accept': 'image/jpeg' }); // Ou outro tipo de mídia aceito

    return this.http.get(`${this.produtoUrl}/${produtoId}/fotos`, {
      headers: headers,
      responseType: 'blob'  // Espera receber um blob (imagem)
    });
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.produtoUrl}/lista`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }


  listarProdutos(): Promise<any[]> {
    return firstValueFrom(this.http.get(`${this.produtoUrl}`)).then(
      (response: any) => {
        const produtos = response.content || []; // <- aqui acessamos os produtos paginados
        this.convertStringDate(produtos);
        return produtos;
      }
    );
  }

  listarComFiltro(filtro: FiltrosProdutos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.produtoUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosProdutos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.sku) {
      obj.sku = filtro.sku;
    }

    if (filtro.nome) {
      obj.nome = filtro.nome;
    }

    if (filtro.descricao) {
      obj.descricao = filtro.descricao;
    }

    if (filtro.preco) {
      obj.preco = filtro.preco;
    }

    if (filtro.categoria) {
      obj.categoria = filtro.categoria;
    }

    if (filtro.emailusuario) {
      obj.emailusuario = filtro.emailusuario;
    }

    if (filtro.datagravacaode) {
      obj.datagravacaode = filtro.datagravacaode;
    }

    if (filtro.datagravacaoate) {
      obj.datagravacaoate = filtro.datagravacaoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.produtoUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(produto: Produtos): Promise<Produtos> {
    return firstValueFrom(
      this.http.post<Produtos>(this.produtoUrl, produto)
    );
  }

  atualizar(produto: Produtos): Promise<Produtos> {
    return firstValueFrom(
      this.http.put(`${this.produtoUrl}/${produto.id}`, produto)
    ).then((response) => {
      const pacAlterado = response as Produtos;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(prod: Produtos[]) {
    for (const produto of prod) {
      if (produto.datagravacao === null) {
      } else {
        produto.datagravacao = moment(produto.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.produtoUrl}/${id}`)).then(
      (response) => {
        const produto = response as Produtos;
        this.converterStringsParaDatas([produto]);
        return produto;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.produtoUrl}${valor}`)).then(
      (response) => response
    );
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

  private converterStringsParaDatasFiltro(obj: any[]) {
    obj.forEach((element) => {
      if (element.datanasc) {
        element.datanasc = moment(element.datanasc, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

}