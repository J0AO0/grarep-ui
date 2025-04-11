import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Regex } from 'src/app/core/validators/regex';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { PedidosService } from '../pedidos.service';
import { Pedidos } from 'src/app/core/models/pedidos.model';
import { ProdutoService } from '../../produtos/produtos.service';
import { ProdutoPedido } from 'src/app/core/models/produtopedido.model';
import {
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { Produtos } from 'src/app/core/models/produtos.model';

//TODO REFAZER PEDIDOS E FAZER CLIENTES;

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css'],
})
export class PedidosCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';

  descricao: string = '';
  selectedFile: File | null = null;
  displayProdutos: boolean = false;
  colsItens = [];
  produtos = [];         // Todos os produtos
  loading: boolean = false;
  produtosSelecionados: any[] = [];
  quantidades: { [sku: string]: number } = {};
  produtoPedido: ProdutoPedido;
  produtosPedido: ProdutoPedido[] = [];
  exibirForm = false;
  exibirFormAlteracao = false;
  regex = new Regex();
  salvando: boolean = false;
  pedidos = new Pedidos();
  idPedido: number;
  selectedCondPagamento: any;
  pedidoId: any;
  prodIndex: number;
  prod = new Produtos();
  exibirFormProduto = false;
  prtodutoSelecionado: number;

  constructor(
    private pedidoService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private produtoService: ProdutoService,
    private confirmation: ConfirmationService,
  ) {}

  ngOnInit() {
    this.carregarProdutos();
    console.log(this.carregarProdutos());
    this.colsItens = [
      { field: 'nome', header: 'Nome', width: '200px' },
      { field: 'sku', header: 'SKU', width: '200px' },
      { field: 'quantidade', header: 'Quantidade', width: '200px' }
    ];
  }
  
  prepararNovoPedido() {
    console.log('mostrar')
    console.log('produtos', this.produtos);
    this.exibirForm = true;
    this.produtoPedido = new ProdutoPedido();
  }

  confirmarPedido(frm: NgForm) {
//    this.carregarProdutoPedido(
//      this.produtoPedido.idProduto,
//      this.produtoPedido.quantidade
 //   );
    this.pedidos.ProdutoPedido[this.prodIndex] =
      this.clonarProduto(this.produtoPedido);
    this.exibirForm = false;
    this.exibirFormAlteracao = false;
    frm.reset();
  }


  clonarProduto(produto: ProdutoPedido): ProdutoPedido {
    return new ProdutoPedido(
      produto.idProduto,
      produto.quantidade
    );
  }


  carregarProdutoPedido(idpedido: number, idproduto: number) {
    this.pedidoService
      .buscarValores(idpedido, idproduto)
      .then((prodPedido) => {
        this.pedidos.ProdutoPedido[this.prodIndex].idProduto =
        prodPedido.idProduto;
        this.pedidos.ProdutoPedido[this.prodIndex].quantidade =
        prodPedido.quantidade;
      })
    //  .catch((erro) => this.errorHandler.handle(erro));
  }


  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.pedidos.nf}</b> ?`,
      accept: () => {
        this.excluir(this.idPedido);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação cancelada',
              detail: 'Você cancelou',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'error',
              summary: 'Ação rejeitada',
              detail: 'Você rejeitou',
            });
            break;
        }
      },
    });
  }

  salvarProduto(form: NgForm) {
    this.adicionarProduto(form);
    this.carregarProdutos();
    form.reset();
    this.exibirFormProduto = false;
  }

  adicionarProduto(form: NgForm) {
    this.produtoService
      .adicionar(this.prod)
      .then((prodAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Paciente',
          detail: `${prodAdicionado.sku}, adicionado com sucesso!`,
        });
        this.carregarProdutos();
      })
    //  .catch((erro) => this.errorHandler.handle(erro));
  }


  carregarProdutos() {
    return this.produtoService
      .listarProdutos()
      .then((prod) => {
        this.produtos = prod.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      
   //   .catch((erro) => {
  //      this.errorHandler.handle(erro);
   //   });
  }



  excluir(id: any) {
    this.produtoService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atendimento',
          detail: `${this.pedidos.nf}, excluído com sucesso!`,
        });
        this.router.navigate(['/atendimentos']);
      })
     // .catch((erro) => this.errorHandler.handle(erro));
  }

  adicionarPedido(form: NgForm) {
    this.salvando = true;
    this.pedidoService.adicionar(this.pedidos)
      .then((pedidoAdicionado) => {
        this.salvando = false;
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      });
  }


  get editando() {
    return Boolean(this.pedidos.id);
  }


  salvar(form: NgForm) {
    if (this.editando) {
    } else {
      this.adicionarPedido(form);
    }
  }

}