import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from '../../seguranca/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { EmpresasService } from '../empresas.service';
import { FiltrosEmpresas } from 'src/app/core/models/filtros.model';
import { FiltroEmpresasService } from 'src/app/core/services/filtros-services/filtro-empresas.service';



@Component({
  selector: 'app-empresas-lista',
  templateUrl: './empresas-lista.component.html',
  styleUrls: ['./empresas-lista.component.css'],
})

export class EmpresasListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef; s


  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  empresas = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  dateRangeStart: string;
  dateRangeEnd: string;
  selectedEmpresa: any;
  rangeDatesFiltroDataNasc: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros: 0;
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  timeout: any;
  datagravacaode: string;
  datagravacaoate: string;
  totalPages = 0;
  first = 1;
  blockBtnFilter = false;
  filtro = new FiltrosEmpresas()

  constructor(
    private title: Title,
    private empService: EmpresasService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroEmpresa: FiltroEmpresasService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.filtro = new FiltrosEmpresas();
    this.filtroDefault();
    this.carregarEmpresa();
  }

  refresh() {
    this.carregarEmpresa();
  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Empresas');
    this.carregarEmpresa();

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.cols = [
      { field: 'id', header: 'Código', width: '115px', type: 'text' },
      { field: 'razaosocial', header: 'Empresa', width: '250px', type: 'text' },
      { field: 'cpfoucnpj', header: 'Cnpj', width: '200px', type: 'text' },
      { field: 'naturezapessoa', header: 'Natureza Pessoa', width: '200px', type: 'text' },
      { field: 'cep', header: 'Cep', width: '200px', type: 'text' },
      { field: 'logradouro', header: 'Logradouro', width: '200px', type: 'text' },
      { field: 'numero', header: 'Número', width: '200px', type: 'text' },
      { field: 'complemento', header: 'Complemento', width: '200px', type: 'text' },
      { field: 'bairro', header: 'Bairro', width: '200px', type: 'text' },
      { field: 'cidade', header: 'Cidade', width: '150px', type: 'text' },
      { field: 'uf', header: 'Estado', width: '130px', type: 'text' },
      { field: 'nomecontato', header: 'Nome Contato', width: '200px', type: 'text' },
      { field: 'telefone', header: 'Telefone', width: '200px', type: 'text' },
      { field: 'whats', header: 'WhatsApp', width: '200px', type: 'text' },
      { field: 'email', header: 'E-mail', width: '200px', type: 'text' },
      { field: 'valor', header: 'Valor Empresa', width: '200px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '200px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '250px', type: 'text' }
    ];
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarEmpresa();
  }


  carregarEmpresa() {
    this.spinner.show();
    this.empService.listarComFiltro(this.filtro)
      .then(obj => {
        this.empresas = obj.content;
        this.totalRegistros = obj.totalElements;
        this.totalPages = obj.totalPages;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }


  AlternarLista() {
    if (this.filtro.status === 'Ativos') {
      this.filtro.status = 'Inativos';
    } else {
      this.filtro.status = 'Ativos';
    }
    this.carregarEmpresa();
  }

  searchData(tipo: string) {

    if (tipo === 'datagravacaode') {
      if (this.datagravacaode && this.datagravacaode.length === 10) {
        const dia = this.datagravacaode.substring(0, 2);
        const mes = this.datagravacaode.substring(3, 5);
        const ano = this.datagravacaode.substring(6, 10);
        this.filtro.datagravacaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaode = '';
      }
    }
    if (tipo === 'datagravacaoate') {
      if (this.datagravacaoate && this.datagravacaoate.length === 10) {
        const dia = this.datagravacaoate.substring(0, 2);
        const mes = this.datagravacaoate.substring(3, 5);
        const ano = this.datagravacaoate.substring(6, 10);
        this.filtro.datagravacaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarEmpresa();
      this.FirstPage();
    }, 800);
  }

  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }

  FirstPage() {
    this.paginator.changePage(0);
  }


  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroEmpresa.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarEmpresa();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.spinner.hide();
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  limparData(tipo: string) {
    if (tipo === 'dataGravacao') {
      this.filtro.datagravacaode = '';
      this.filtro.datagravacaoate = '';
      this.datagravacaode = '';
      this.datagravacaoate = '';
    }

    this.carregarEmpresa();
  }

}
