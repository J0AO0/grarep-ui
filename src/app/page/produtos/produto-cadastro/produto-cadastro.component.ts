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

  produtoId: any
  selectedCategoria: any;
  categorias = []

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    // this.carregarCategoria();
    this.title.setTitle('Cadastro Produto');
    this.idProduto = this.route.snapshot.params['id'];
    if (this.idProduto) {
      this.spinner.show();
      this.carregarProduto(this.idProduto);
    } 
    // else {
    //   this.produtos.status = true;
    // }
  }


  get editando() {
    return Boolean(this.produtos.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
    } else {
      this.adicionarProduto(form);
    }
  }

  atualizarProduto(form: NgForm) {
    this.salvando = true;
    // console.log(this.selectedPaciente);
    // console.log(this.atendimentos);
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

    // Primeiro adiciona o produto
    this.produtoService.adicionar(this.produtos)
      .then((produtoAdicionado) => {
        // Verifique se o arquivo de imagem foi selecionado
        if (this.selectedFile) {
          // Agora chama o upload passando o ID do produto adicionado
          const formData = new FormData();
          formData.append('arquivo', this.selectedFile); // Adiciona o arquivo ao FormData
          formData.append('descricao', this.descricao); // Adiciona a descrição ao FormData

          this.produtoService.uploadFoto(produtoAdicionado.id, formData).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Produto',
                detail: 'Produto e imagem adicionados com sucesso!'
              });
              this.router.navigate(['/produtos']);
            },
            (error) => {
              this.erroHandler.handle(error);
            }
          );
        } else {
          // Se não houver arquivo, apenas exibe uma mensagem de sucesso
          this.messageService.add({
            severity: 'success',
            summary: 'Produto',
            detail: 'Produto adicionado com sucesso!'
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
    this.produtoService.buscarPorId(id)
      .then((obj) => {
        setTimeout(() => {
          // this.selectedCategoria = this.categorias.find(
          //   (pac) => pac.value === obj.categoria.id
          // );




        }, 300);
        this.produtos = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categorias: ${this.produtos.nome}`);
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // onUpload() {
  //   if (this.selectedFile) {
  //     this.produtoService.uploadFoto(this.selectedFile).subscribe(
  //       (response) => console.log('Sucesso!', response),
  //       (error) => console.log('Erro', error)
  //     );
  //   }
  // }

  onUpload(event: any) {
    this.selectedFile = event.files[0]; // Captura o arquivo selecionado
  }

  onSubmit() {
    if (this.selectedFile && this.descricao) {
      const formData = new FormData();
      formData.append('arquivo', this.selectedFile);
      formData.append('descricao', this.descricao);

      this.produtoId = this.produtoService.buscarPorId(this.idProduto);

      console.log(this.produtoId)

      this.produtoService.uploadFoto(this.produtoId, formData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Foto salva com sucesso!' });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a foto.' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione um arquivo e insira a descrição.' });
    }
  }


}
