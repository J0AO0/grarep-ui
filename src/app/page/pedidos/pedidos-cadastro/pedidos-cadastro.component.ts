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
  colsProdutos: any[];
  produtos: any[];         // Todos os produtos
  produtosFiltrados: any[]; // Produtos filtrados por categoria ou pesquisa
  filtroProduto: string = ''; // Valor da pesquisa
  produtoSelecionado: any;  // Produto selecionado
  loading: boolean = false;
  produtosSelecionados: any[] = [];
  quantidades: { [sku: string]: number } = {};

  

  regex = new Regex();
  salvando: boolean = false;
  pedidos = new Pedidos();
  idPedido: number;
  selectedCondPagamento: any;
  pedidoId: any;

  constructor(
    private pedidoService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.colsProdutos = [
      { field: 'nome', header: 'Nome' },
      { field: 'sku', header: 'SKU' },
      { field: 'quantidade', header: 'Quantidade' }
    ];
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

  async abrirDialogoProdutos() {
    this.loading = true;
    this.displayProdutos = true;
  
    try {
      const produtos = await this.produtoService.listarProdutos();  // <- await aqui
      this.produtos = produtos;
      this.produtosFiltrados = [...produtos];
    } catch (erro) {
      this.erroHandler.handle(erro);
    } finally {
      this.loading = false;
    }
  }

  // Função para filtrar produtos pelo nome
  filtrarProdutosPorNome() {
    if (this.filtroProduto) {
      this.produtosFiltrados = this.produtosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(this.filtroProduto.toLowerCase())
      );
    }
  }
  
  
// Função para bloquear clique na linha
isRowSelectable(): boolean {
  return false;
}

// Quando a seleção muda
onSelecionadosChange(selecionados: any[]) {
  this.produtosSelecionados = selecionados;

  this.produtosSelecionados.forEach(prod => {
    if (!this.quantidades[prod.sku]) {
      this.quantidades[prod.sku] = 1; // valor default
    }
  });
}

removerProduto(produto: any) {
  this.produtosSelecionados = this.produtosSelecionados.filter(p => p.sku !== produto.sku);
  delete this.quantidades[produto.sku];
}


// Verifica se o produto está entre os selecionados
isProdutoSelecionado(produto: any): boolean {
  return this.produtosSelecionados.some(p => p.sku === produto.sku);
}

confirmarSelecao() {
  this.produtosSelecionados.forEach(prod => {
    prod.quantidade = this.quantidades[prod.sku] || 1; // Default para 1 se não tiver
  });

  console.log('Produtos confirmados com quantidade:', this.produtosSelecionados);

  this.displayProdutos = false;
}

cancelarSelecao() {
  this.displayProdutos = false;
}


}