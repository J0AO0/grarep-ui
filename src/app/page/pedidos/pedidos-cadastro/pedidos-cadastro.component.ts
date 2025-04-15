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
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Produtos } from 'src/app/core/models/produtos.model';

interface Column {
  field: string;
  header: string;
  width: string;
}

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
  colsItens: Column[] = [];
  produtos: { label: string; value: number }[] = [];         
  loading: boolean = false;
  produtoPedido: ProdutoPedido = new ProdutoPedido();
  produtosPedido: ProdutoPedido[] = [];
  exibirForm: boolean = false;
  exibirFormAlteracao: boolean = false;
  regex = new Regex();
  salvando: boolean = false;
  pedidos: Pedidos = new Pedidos();
  idPedido: number;
  pedidoId: any;
  prodIndex: number;
  prod: Produtos = new Produtos();
  exibirFormProduto: boolean = false;
  produtoSelecionado: number;

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
    this.pedidos.produtos = [];
    this.colsItens = [
      { field: 'nome', header: 'Nome', width: '200px' },
      // { field: 'sku', header: 'SKU', width: '200px' },
      // { field: 'quantidade', header: 'Quantidade', width: '200px' }
    ];

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carregarPedido(id);
      }
    });
  }

  carregarPedido(id: number) {
    this.spinner.show();
    this.pedidoService.buscarPorId(id)
      .then(pedido => {
        this.pedidos = pedido;
        this.spinner.hide();
      })
      .catch(erro => {
        this.erroHandler.handle(erro);
        this.spinner.hide();
      });
  }
  
  prepararNovoPedido() {
    console.log('mostrar');
    console.log('produtos', this.produtos);
    this.exibirForm = true;
    this.produtoPedido = new ProdutoPedido();
  }

  confirmarPedido(frm: NgForm) {
    this.pedidos.produtos.push(this.clonarProduto(this.produtoPedido));
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
        this.pedidos.produtos[this.prodIndex].idProduto = prodPedido.idProduto;
        this.pedidos.produtos[this.prodIndex].quantidade = prodPedido.quantidade;
      })
      .catch((erro) => this.erroHandler.handle(erro));
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
          summary: 'Produto',
          detail: `${prodAdicionado.sku}, adicionado com sucesso!`,
        });
        this.carregarProdutos();
      })
      .catch((erro) => this.erroHandler.handle(erro));
  }

  carregarProdutos() {
    this.produtoService
      .listarProdutos()
      .then((prod) => {
        this.produtos = prod.map((mp) => ({ 
          label: `${mp.sku} - ${mp.nome}`, 
          value: mp.id 
        }));
      })
      .catch((erro) => this.erroHandler.handle(erro));
  }

  excluir(id: any) {
    this.produtoService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Produto',
          detail: `${this.pedidos.nf}, excluído com sucesso!`,
        });
        this.router.navigate(['/pedidos']);
      })
      .catch((erro) => this.erroHandler.handle(erro));
  }

  adicionarPedido(form: NgForm) {
    console.log('Pedido a ser enviado:', this.pedidos);
    this.salvando = true;
    this.pedidoService.adicionar(this.pedidos)
      .then((pedidoAdicionado) => {
        this.salvando = false;
        this.router.navigate(['/pedidos']);
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
      // Editar pedido se necessário
    } else {
      this.adicionarPedido(form);
    }
  }
}
