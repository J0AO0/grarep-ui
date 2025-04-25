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
            label: 'Produtos',
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
//              {
//                label: 'Status',
//                data: 'produtosStatus',
//                key: 'produtosStatus',
//              },
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
//              {
//                label: 'Status',
//                data: 'pedidosStatus',
//                key: 'pedidosStatus',
//              },
            ],
          }
        ]
      }
    ];
  }
}
