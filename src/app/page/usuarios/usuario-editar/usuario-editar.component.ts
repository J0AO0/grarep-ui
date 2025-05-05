import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../seguranca/auth.service';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
  TreeNode,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Empresas } from 'src/app/core/models/empresas.model';
import { Permissoes } from 'src/app/core/models/permissoes.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { PermissaoTreeNodeService } from 'src/app/core/services/permissaoTreeNode.service';
import { TreeNodePermissoesService } from 'src/app/core/services/treeNodePermissoes.service';
import { Regex } from 'src/app/core/validators/regex';
import { EmpresasService } from '../../empresas/empresas.service';
import { UsuariosService } from '../usuarios.service';

// Interface estendida para adicionar propriedades específicas do frontend
interface EmpresaComAcesso extends Empresas {
  empresasusuario?: boolean;
  empresapadrao?: boolean;
}

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css'],
})
export class UsuarioEditarComponent implements OnInit, AfterViewInit {
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  rowsPerPageTable: number[] = [10, 15, 25, 50, 100, 200];
  permissao: Permissoes[];
  permissaoNova: Permissoes[];
  selectedValues: string[] = [];
  regex = new Regex();
  usuario = new Usuarios();
  empresas: EmpresaComAcesso[] = [];
  tiposperfil = [];
  empresa: Empresas[];
  selectedEmpresa: Empresas[];
  colsEmpresa = [];
  tenant: any[];
  cols: any[];
  permission: TreeNode[];
  arr: TreeNode[];
  selectedPermission: TreeNode[];
  todos = false;
  idUser: number;
  loading: boolean;
  salvando: boolean;

  constructor(
    private title: Title,
    private empresaService: EmpresasService,
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private treeNodeService: TreeNodePermissoesService,
    private permissaoTreeNode: PermissaoTreeNodeService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.criarTreeNodePermissoes();
    this.idUser = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Usuário');

    this.cols = [{ field: 'name', header: 'Permissões' }];
    this.colsEmpresa = [
      { field: 'id', header: 'Código', width: '100px' },
      { field: 'cpfoucnpj', header: 'Cnpj', width: '150px' },
      { field: 'razaosocial', header: 'Empresa', width: '250px' },
      { field: 'cidade', header: 'Cidade', width: '150px' },
      { field: 'uf', header: 'Estado', width: '100px' },
    ];
  }

  ngAfterViewInit(): void {
    if (this.idUser) {
      this.spinner.show();
      this.carregarPermissoes(this.idUser);
      this.carregarUsuario(this.idUser);
      this.carregarEmpresas(this.idUser);
    } else {
      this.usuario.status = true;
      this.carregarEmpresas();
    }
  }

  expandAll() {
    this.permission.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  carregarPermissoesAlterar(id: number) {
    this.salvando = true;
    this.usuarioService.listarPermissoes(id).then((per) => {
      this.permissaoNova = per;
      this.permissaoTreeNode.permissaoTreeNode(
        this.selectedPermission,
        this.permissaoNova
      );
      this.usuario.permissoes = this.permissaoNova;
      this.usuarioService
        .atualizar(this.usuario)
        .then((usuario) => {
          this.usuario = usuario;
          this.messageService.add({
            severity: 'info',
            summary: 'Usuário',
            detail: `${usuario.nome}, alterado com sucesso!`,
          });
          this.atualizarTituloEdicao();
          this.salvando = false;
          this.router.navigate(['/usuarios']);
        })
        .catch((erro) => {
          this.salvando = false;
          this.errorHandler.handle(erro);
        });
    });
  }

  criarTreeNodePermissoes() {
    this.permission = this.treeNodeService.criarTreeNodePermissoes();
  }

  carregarPermissoes(id: number) {
    this.usuarioService
      .listarPermissoes(id)
      .then((per) => {
        this.permissao = per;
        this.atribuirPermissoes();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atribuirPermissoes() {
    this.selectedPermission = [];
    this.permission.forEach((node) => {
      this.flattenTree(node);
    });
    this.verificarPermissoesDoUsuario();
  }

  verificarPermissoesDoUsuario() {
    this.permissaoTreeNode.carregarPermissoesTreeNode(
      this.permissao,
      this.selectedPermission
    );
  }

  flattenTree(node: TreeNode) {
    this.selectedPermission.push(node);
    if (node.children) {
      node.children.forEach((childNode) => {
        this.flattenTree(childNode);
      });
    }
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  get editando() {
    return Boolean(this.usuario.id);
  }

  salvar(form: NgForm) {
    this.atualizarUsuario(form);
  }

  atualizarUsuario(form: NgForm) {
    let chave = 0;
    this.usuario.empresas = [];

    for (const i of Object.keys(this.empresas)) {
      if (this.empresas[i].empresasusuario === true) {
        const empresa: Empresas = {
          id: this.empresas[i].id,
          cpfoucnpj: this.empresas[i].cpfoucnpj,
          razaosocial: this.empresas[i].razaosocial,
          naturezapessoa: this.empresas[i].naturezapessoa,
          cep: this.empresas[i].cep,
          logradouro: this.empresas[i].logradouro,
          numero: this.empresas[i].numero,
          complemento: this.empresas[i].complemento,
          bairro: this.empresas[i].bairro,
          cidade: this.empresas[i].cidade,
          uf: this.empresas[i].uf,
          nomecontato: this.empresas[i].nomecontato,
          telefone: this.empresas[i].telefone,
          whats: this.empresas[i].whats,
          email: this.empresas[i].email,
          valor: this.empresas[i].valor,
          datagravacao: this.empresas[i].datagravacao,
          emailusuario: this.empresas[i].emailusuario,
          status: this.empresas[i].status,
        };
        this.usuario.empresas.push(empresa);
      }
      if (this.empresas[i].empresapadrao === true) {
        this.usuario.idEmpresaativa = this.empresas[i].id;
        chave = chave + 1;
      }
    }
    if (this.usuario.empresas.length === 0 || chave === 0 || chave > 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuário',
        detail: `Você não pode adicionar usuário sem empresa e/ou empresa padrão!`,
      });
    } else {
      this.verificarPermissoes();
    }
  }

  verificarPermissoes() {
    this.carregarPermissoesAlterar(3);
  }

  carregarUsuario(id: number) {
    this.usuarioService
      .buscarPorId(id)
      .then((usuario) => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  carregarEmpresas(idUsuario?: number) {
    this.loading = true;
    return this.empresaService.listar().then((empresas) => {
      this.empresas = empresas.map((empresa: Empresas) => {
        return {
          ...empresa,
          empresasusuario: false,
          empresapadrao: false,
        } as EmpresaComAcesso;
      });

      if (idUsuario && this.usuario.empresas) {
        this.empresas = this.empresas.map((empresa: EmpresaComAcesso) => {
          const empresaUsuario = this.usuario.empresas.find(
            (e) => e.id === empresa.id
          );
          if (empresaUsuario) {
            return {
              ...empresa,
              empresasusuario: true,
              empresapadrao: this.usuario.idEmpresaativa === empresa.id,
            };
          }
          return empresa;
        });
      }

      this.loading = false;
    }).catch((erro) => {
      this.loading = false;
      this.errorHandler.handle(erro);
    });
  }

  alterar(form: NgForm) {
    form.reset();
    setTimeout(
      function () {
        this.rep = new Usuarios();
      }.bind(this),
      1
    );

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuário: ${this.usuario.nome}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.usuario.nome}</b> ?`,
      accept: () => {
        this.excluir(this.idUser);
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

  excluir(id: any) {
    this.usuarioService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Usuário',
          detail: `${this.usuario.nome}, excluído com sucesso!`,
        });
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}