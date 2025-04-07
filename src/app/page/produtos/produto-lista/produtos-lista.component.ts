import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProdutoService } from '../produtos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/services/validation.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { lastValueFrom } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { FiltrosProdutos } from 'src/app/core/models/filtros.model';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltroProdutosService } from 'src/app/core/services/filtros-services/filtro-produtos.service';

export interface Product {
  nome: string;
  category: string;
  description: string;
  price: number;
  image: string;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrl: './produtos-lista.component.css'
})
export class ProdutosListarComponent implements OnInit {

  descricao: string = '';
  selectedFile: File | null = null;
  idProduto: number;
  produtoId: any
  produtoSelecionadoComImagem: any = null;  // Produto com imagem selecionada
  imageError: boolean = false;  // Nova variável para controlar o erro de imagem

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;
  @ViewChild('imagem') imagem: OverlayPanel;


  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  produtos = [];
  sinal = true;
  status = 'Ativo';
  cols: any[];
  salvando: boolean;
  dateRangeStart: string;
  dateRangeEnd: string;
  selectedProduto: any;
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
  displayProduto: boolean;
  colsProduto = [];
  loading: boolean;
  filtro = new FiltrosProdutos()
  menu;

  imagemNomes: string[] = [];

  constructor(
    private title: Title,
    private prodService: ProdutoService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private filtroProduto: FiltroProdutosService
  ) { }

  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.filtro = new FiltrosProdutos();
    this.filtroDefault();
    this.carregarProduto();
  }

  refresh() {
    this.carregarProduto();
  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Produtos');
    this.carregarProduto();

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
      { field: 'id', header: 'Código', width: '130px', type: 'numeric' },
      { field: 'sku', header: 'SKU', width: '130px', type: 'text' },
      { field: 'nome', header: 'Nome Produto', width: '250px', type: 'text' },
      // { field: 'descricao', header: 'Descrição', width: '250px', type: 'text' },
      // { field: 'preco', header: 'Preço', width: '250px', type: 'text' },
      // { field: 'categoria', header: 'Categoria', width: '250px', type: 'text' },
      { field: 'datagravacao', header: 'Data Gravação', width: '170px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'emailusuario', header: 'Usuário Gravação', width: '190px', type: 'text' }
    ];


    this.colsProduto = [
      { field: 'id', header: 'ID', width: '80px' },
      // { field: 'image', header: 'Imagem', width: '100px' },
      { field: 'nome', header: 'Produto', width: '300px' },
      { field: 'preco', header: 'Preço', width: '250px', type: 'text' },
    ];
  }


  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarProduto();
  }


  carregarProduto() {
    this.spinner.show();
    this.prodService.listarComFiltro(this.filtro)
      .then(obj => {
        this.produtos = obj.content;
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
    this.carregarProduto();
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
      this.carregarProduto();
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
      this.filtroProduto.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarProduto();
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

    this.carregarProduto();
  }



  onSubmit() {
    if (this.selectedFile && this.descricao) {
      const formData = new FormData();
      formData.append('arquivo', this.selectedFile);
      formData.append('descricao', this.descricao);

      if (!this.produtoId) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Produto não selecionado.'
        });
        return;
      }

      // Convertendo Observable para Promise
      lastValueFrom(this.prodService.uploadFoto(this.produtoId, formData))
        .then((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Produto',
            detail: `${response.descricao} Adicionado com sucesso`
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar a foto.'
          });
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione um arquivo e insira a descrição.'
      });
    }
  }



  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagemNomes.push(file.name);  // Adiciona o nome da imagem à lista
    }
  }


  onImageButtonClick(produtoId: number, event: Event) {
    this.produtoId = produtoId;
    this.imagem.show(event);  // Abre o OverlayPanel no local do clique
  }

  showProduto(produtoId: number, event: Event) {
    this.loading = true;
    this.imageError = false;  // Reseta o erro antes de tentar carregar
    this.spinner.show();

    this.prodService.produtoImagem(produtoId).subscribe({
      next: (produtoBlob: Blob) => {
        const produtoUrl = URL.createObjectURL(produtoBlob);

        // Mantém os dados do produto selecionado e adiciona a imagem
        this.produtoSelecionadoComImagem = {
          ...this.produtos.find(p => p.id === produtoId),
          imageUrl: produtoUrl
        };

        this.loading = false;
        this.spinner.hide();
        this.displayProduto = true;
      },
      error: (erro) => {
        this.loading = false;
        this.imageError = true;  // Sinaliza que houve um erro no carregamento da imagem
        this.spinner.hide();
        this.errorHandler.handle(erro);
      }
    });
  }

}
