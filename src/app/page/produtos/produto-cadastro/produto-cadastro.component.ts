import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produtos.service';
import { Component, OnInit } from '@angular/core';
import { Regex } from 'src/app/core/validators/regex';
import { Produtos } from 'src/app/core/models/produtos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css',
})
export class ProdutoCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';

  descricao: string = '';
  selectedFile: File | null = null;

  regex = new Regex();
  salvando: boolean = false;
  produtos = new Produtos();
  idProduto: number;

  produtoId: any;
  selectedCategoria: any;
  categorias = [];

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.title.setTitle('Cadastro Produto');
    this.idProduto = this.route.snapshot.params['id'];
    if (this.idProduto) {
      this.spinner.show();
      this.carregarProduto(this.idProduto);
    }
  }

  get editando() {
    return Boolean(this.produtos.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  atualizarProduto(form: NgForm) {
    this.salvando = true;
    this.produtoService
      .atualizar(this.produtos)
      .then((produto) => {
        this.produtos = produto;
        this.messageService.add({
          severity: 'info',
          summary: 'Produto',
          detail: `alterado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/produtos']);
        this.atualizarTituloEdicao();
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      });
  }

  adicionarProduto(form: NgForm) {
    this.salvando = true;

    this.produtoService
      .adicionar(this.produtos)
      .then((produtoAdicionado) => {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('arquivo', this.selectedFile);
          formData.append('descricao', this.descricao);

          this.produtoService.uploadFoto(produtoAdicionado.id, formData).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Produto',
                detail: 'Produto e imagem adicionados com sucesso!',
              });
              this.router.navigate(['/produtos']);
            },
            (error) => {
              this.erroHandler.handle(error);
            }
          );
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Produto',
            detail: 'Produto adicionado com sucesso!',
          });
          this.router.navigate(['/produtos']);
        }
        this.salvando = false;
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      });
  }

  carregarProduto(id: number) {
    this.produtoService
      .buscarPorId(id)
      .then((obj) => {
        setTimeout(() => {}, 300);
        this.produtos = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categorias: ${this.produtos.nome}`);
  }
}