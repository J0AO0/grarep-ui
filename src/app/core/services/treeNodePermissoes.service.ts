import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeNodePermissoesService {

  treeNodePermissoes: TreeNode[];
  constructor() { }

  criarTreeNodePermissoes() {
    return [

      {
        label: 'Todas Permissões',
        selectable: true,
        data: 'cadastroNode',
        key: 'cadastroNode',

        children: [
          {
            label: 'Empresas',
            data: 'empresas',
            key: 'empresas',
            children: [
              {
                label: 'Criar',
                data: 'empresasCriar',
                key: 'empresasCriar',
              },
              {
                label: 'Visualizar',
                data: 'empresasVisualizar',
                key: 'empresasVisualizar',
              },
              {
                label: 'Editar',
                data: 'empresasEditar',
                key: 'empresasEditar',
              },
              {
                label: 'Status',
                data: 'empresasStatus',
                key: 'empresasStatus',
              },
            ],
          },
          {
            label: 'Usuários',
            data: 'usuarios',
            key: 'usuarios',
            children: [
              {
                label: 'Criar',
                data: 'usuariosCriar',
                key: 'usuariosCriar',
              },
              {
                label: 'Visualizar',
                data: 'usuariosVisualizar',
                key: 'usuariosVisualizar',
              },
              {
                label: 'Editar',
                data: 'usuariosEditar',
                key: 'usuariosEditar',
              },
              {
                label: 'Status',
                data: 'usuariosStatus',
                key: 'usuariosStatus',
              },
            ],
          },
          {
            label: 'Categorias',
            data: 'categorias',
            key: 'categorias',
            children: [
              {
                label: 'Criar',
                data: 'categoriasCriar',
                key: 'categoriasCriar',
              },
              {
                label: 'Visualizar',
                data: 'categoriasVisualizar',
                key: 'categoriasVisualizar',
              },
              {
                label: 'Editar',
                data: 'categoriasEditar',
                key: 'categoriasEditar',
              },
              {
                label: 'Status',
                data: 'categoriasStatus',
                key: 'categoriasStatus',
              },
            ],
          },
          {
            label: 'Produtoss',
            data: 'produtos',
            key: 'produtos',
            children: [
              {
                label: 'Criar',
                data: 'produtosCriar',
                key: 'produtosCriar',
              },
              {
                label: 'Visualizar',
                data: 'produtosVisualizar',
                key: 'produtosVisualizar',
              },
              {
                label: 'Editar',
                data: 'produtosEditar',
                key: 'produtosEditar',
              },
              {
                label: 'Status',
                data: 'produtosStatus',
                key: 'produtosStatus',
              },
            ],
          },
          {
            label: 'Pedidos',
            data: 'pedidos',
            key: 'pedidos',
            children: [
              {
                label: 'Criar',
                data: 'pedidosCriar',
                key: 'pedidosCriar',
              },
              {
                label: 'Visualizar',
                data: 'pedidosVisualizar',
                key: 'pedidosVisualizar',
              },
              {
                label: 'Editar',
                data: 'pedidosEditar',
                key: 'pedidosEditar',
              },
              {
                label: 'Status',
                data: 'pedidosStatus',
                key: 'pedidosStatus',
              },
            ],
          },
          {
            label: 'Condições de Pagamento',
            data: 'condPagamentos',
            key: 'condPagamentos',
            children: [
              {
                label: 'Criar',
                data: 'condPagamentosCriar',
                key: 'condPagamentosCriar',
              },
              {
                label: 'Visualizar',
                data: 'condPagamentosVisualizar',
                key: 'condPagamentosVisualizar',
              },
              {
                label: 'Editar',
                data: 'condPagamentosEditar',
                key: 'condPagamentosEditar',
              },
              {
                label: 'Status',
                data: 'condPagamentosStatus',
                key: 'condPagamentosStatus',
              },
            ],
          },
          {
            label: 'Tipos de Frete',
            data: 'tipoFretes',
            key: 'tipoFretes',
            children: [
              {
                label: 'Criar',
                data: 'tipoFretesCriar',
                key: 'tipoFretesCriar',
              },
              {
                label: 'Visualizar',
                data: 'tipoFretesVisualizar',
                key: 'tipoFretesVisualizar',
              },
              {
                label: 'Editar',
                data: 'tipoFretesEditar',
                key: 'tipoFretesEditar',
              },
              {
                label: 'Status',
                data: 'tipoFretesStatus',
                key: 'tipoFretesStatus',
              },
            ],
          },
          {
            label: 'Formas de Pagamento',
            data: 'formaPagamentos',
            key: 'formaPagamentos',
            children: [
              {
                label: 'Criar',
                data: 'formaPagamentosCriar',
                key: 'formaPagamentosCriar',
              },
              {
                label: 'Visualizar',
                data: 'formaPagamentosVisualizar',
                key: 'formaPagamentosVisualizar',
              },
              {
                label: 'Editar',
                data: 'formaPagamentosEditar',
                key: 'formaPagamentosEditar',
              },
              {
                label: 'Status',
                data: 'formaPagamentosStatus',
                key: 'formaPagamentosStatus',
              },
            ],
          }

        ]
      }
    ];
  }
}
