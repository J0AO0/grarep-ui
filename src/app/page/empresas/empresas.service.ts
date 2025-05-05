import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { FiltrosEmpresas } from 'src/app/core/models/filtros.model';
import { Empresas } from 'src/app/core/models/empresas.model';


@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  empresaUrl: string;

  constructor(private http: HttpClient) {
    this.empresaUrl = `${environment.apiUrl}/empresas`;
  }



  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/empresapadrao`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  //TODO EMPRESA PADRAO
  listarEmpresaPadrao(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/usuarios`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }


  listarEmpresas(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/empresapadrao`)).then(
      (response) => {

        const obj = response as any[];
        this.convertStringDate(obj);
        console.log(obj)
        return obj;
      }
    );
  }

  listarComFiltro(filtro: FiltrosEmpresas): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.empresaUrl}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatasFiltro(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosEmpresas) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.razaosocial) {
      obj.razaosocial = filtro.razaosocial;
    }

    if (filtro.cpfoucnpj) {
      obj.cpfoucnpj = filtro.cpfoucnpj;
    }

    if (filtro.naturezapessoa) {
      obj.naturezapessoa = filtro.naturezapessoa;
    }

    if (filtro.cep) {
      obj.cep = filtro.cep;
    }

    if (filtro.logradouro) {
      obj.logradouro = filtro.logradouro;
    }

    if (filtro.numero) {
      obj.numero = filtro.numero;
    }

    if (filtro.complemento) {
      obj.complemento = filtro.complemento;
    }

    if (filtro.bairro) {
      obj.bairro = filtro.bairro;
    }

    if (filtro.cidade) {
      obj.cidade = filtro.cidade;
    }

    if (filtro.uf) {
      obj.uf = filtro.uf;
    }

    if (filtro.nomecontato) {
      obj.nomecontato = filtro.nomecontato;
    }

    if (filtro.telefone) {
      obj.telefone = filtro.telefone;
    }

    if (filtro.whats) {
      obj.whats = filtro.whats;
    }

    if (filtro.email) {
      obj.email = filtro.email;
    }

    if (filtro.valor) {
      obj.valor = filtro.valor;
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
    return firstValueFrom(this.http.delete(`${this.empresaUrl}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(empresa: Empresas): Promise<Empresas> {
    return firstValueFrom(
      this.http.post<Empresas>(this.empresaUrl, empresa)
    );
  }

  atualizar(empresa: Empresas): Promise<Empresas> {
    return firstValueFrom(
      this.http.put(`${this.empresaUrl}/${empresa.id}`, empresa)
    ).then((response) => {
      const pacAlterado = response as Empresas;
      this.converterStringsParaDatas([pacAlterado]);
      return pacAlterado;
    });
  }
  private converterStringsParaDatas(emp: Empresas[]) {
    for (const empresa of emp) {
      if (empresa.datagravacao === null) {
      } else {
        empresa.datagravacao = moment(empresa.datagravacao, 'YYYY-MM-DD').toDate();
      }
    }
  }
  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.empresaUrl}/${id}`)).then(
      (response) => {
        const empresa = response as Empresas;
        this.converterStringsParaDatas([empresa]);
        return empresa;
      }
    );
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.empresaUrl}${valor}`)).then(
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

