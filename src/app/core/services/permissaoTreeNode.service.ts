import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) {}

  permissaoTreeNode(selected: any, permissao: any) {
    // Validação para garantir que permissao é um array válido com pelo menos 5 elementos
    if (!Array.isArray(permissao) || permissao.length < 5) {
      console.error('Array de permissões inválido ou insuficiente:', permissao);
      return;
    }

    for (const i of Object.keys(selected)) {
      const permissaoData = selected[i].data;
      switch (permissaoData) {
        // Permissão em Usuários---------------------------------
        case 'usuariosCriar':
          permissao[0].permission = permissao[0].permission || {};
          permissao[0].permission.create = true;
          break;
        case 'usuariosVisualizar':
          permissao[0].permission = permissao[0].permission || {};
          permissao[0].permission.read = true;
          break;
        case 'usuariosEditar':
          permissao[0].permission = permissao[0].permission || {};
          permissao[0].permission.update = true;
          break;
        case 'usuariosStatus':
          permissao[0].permission = permissao[0].permission || {};
          permissao[0].permission.status = true;
          break;
        case 'usuariosExcluir':
          permissao[0].permission = permissao[0].permission || {};
          permissao[0].permission.delete = true;
          break;

        // Permissão em Empresas---------------------------------
        case 'empresasCriar':
          permissao[1].permission = permissao[1].permission || {};
          permissao[1].permission.create = true;
          break;
        case 'empresasVisualizar':
          permissao[1].permission = permissao[1].permission || {};
          permissao[1].permission.read = true;
          break;
        case 'empresasEditar':
          permissao[1].permission = permissao[1].permission || {};
          permissao[1].permission.update = true;
          break;
        case 'empresasStatus':
          permissao[1].permission = permissao[1].permission || {};
          permissao[1].permission.status = true;
          break;
        case 'empresasExcluir':
          permissao[1].permission = permissao[1].permission || {};
          permissao[1].permission.delete = true;
          break;

        // Permissão em Pedidos---------------------------------
        case 'pedidosCriar':
          permissao[2].permission = permissao[2].permission || {};
          permissao[2].permission.create = true;
          break;
        case 'pedidosVisualizar':
          permissao[2].permission = permissao[2].permission || {};
          permissao[2].permission.read = true;
          break;
        case 'pedidosEditar':
          permissao[2].permission = permissao[2].permission || {};
          permissao[2].permission.update = true;
          break;
        case 'pedidosStatus':
          permissao[2].permission = permissao[2].permission || {};
          permissao[2].permission.status = true;
          break;
        case 'pedidosExcluir':
          permissao[2].permission = permissao[2].permission || {};
          permissao[2].permission.delete = true;
          break;

        // Permissão em Produtos---------------------------------
        case 'produtosCriar':
          permissao[3].permission = permissao[3].permission || {};
          permissao[3].permission.create = true;
          break;
        case 'produtosVisualizar':
          permissao[3].permission = permissao[3].permission || {};
          permissao[3].permission.read = true;
          break;
        case 'produtosEditar':
          permissao[3].permission = permissao[3].permission || {};
          permissao[3].permission.update = true;
          break;
        case 'produtosStatus':
          permissao[3].permission = permissao[3].permission || {};
          permissao[3].permission.status = true;
          break;
        case 'produtosExcluir':
          permissao[3].permission = permissao[3].permission || {};
          permissao[3].permission.delete = true;
          break;

        // Permissão em Relatório-------------------------------------
        case 'relatoriosVisualizar':
          permissao[4].permission = permissao[4].permission || {};
          permissao[4].permission.read = true;
          break;
      }
    }
  }

  carregarPermissoesTreeNode(permissao: any, selectedpermissao: any) {
    // Validação para garantir que permissao é um array válido com pelo menos 5 elementos
    if (!Array.isArray(permissao) || permissao.length < 5) {
      console.error('Array de permissões inválido ou insuficiente:', permissao);
      return;
    }

    // Início de Permissão de Usuários--------------------------------------------------------------
    if (!permissao[0].permission.create) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[0].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[0].permission.update) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[0].permission.status) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[0].permission.delete) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      !permissao[0].permission.create &&
      !permissao[0].permission.read &&
      !permissao[0].permission.update &&
      !permissao[0].permission.status &&
      !permissao[0].permission.delete
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissão de Usuários -------------------------------------------------------------------

    // Início de Permissão de Empresas--------------------------------------------------------------
    if (!permissao[1].permission.create) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[1].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[1].permission.update) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[1].permission.status) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[1].permission.delete) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      !permissao[1].permission.create &&
      !permissao[1].permission.read &&
      !permissao[1].permission.update &&
      !permissao[1].permission.status &&
      !permissao[1].permission.delete
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresas') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissão de Empresas -------------------------------------------------------------------

    // Início de Permissão de Pedidos--------------------------------------------------------------
    if (!permissao[2].permission.create) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[2].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[2].permission.update) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[2].permission.status) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[2].permission.delete) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      !permissao[2].permission.create &&
      !permissao[2].permission.read &&
      !permissao[2].permission.update &&
      !permissao[2].permission.status &&
      !permissao[2].permission.delete
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidos') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissão de Pedidos -------------------------------------------------------------------

    // Início de Permissão de Produtos--------------------------------------------------------------
    if (!permissao[3].permission.create) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[3].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[3].permission.update) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[3].permission.status) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[3].permission.delete) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      !permissao[3].permission.create &&
      !permissao[3].permission.read &&
      !permissao[3].permission.update &&
      !permissao[3].permission.status &&
      !permissao[3].permission.delete
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtos') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissão de Produtos -----------------------------------------------------------------`-------------------------------------------------------------

    // Início de Permissão de Relatórios------------------------------------------------
    if (!permissao[4].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatoriosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (!permissao[4].permission.read) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatorios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissão de Relatórios------------------------------------------------

    // Verificar Node de Cadastro-------------------------------------------------------------------
    if (
      !permissao[0].permission.create &&
      !permissao[0].permission.read &&
      !permissao[0].permission.update &&
      !permissao[0].permission.status &&
      !permissao[0].permission.delete &&
      !permissao[1].permission.create &&
      !permissao[1].permission.read &&
      !permissao[1].permission.update &&
      !permissao[1].permission.status &&
      !permissao[1].permission.delete &&
      !permissao[2].permission.create &&
      !permissao[2].permission.read &&
      !permissao[2].permission.update &&
      !permissao[2].permission.status &&
      !permissao[2].permission.delete &&
      !permissao[3].permission.create &&
      !permissao[3].permission.read &&
      !permissao[3].permission.update &&
      !permissao[3].permission.status &&
      !permissao[3].permission.delete &&
      !permissao[4].permission.read
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
  }
}