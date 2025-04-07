import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) {}

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      switch (selected[i].data) {
        // Permissão em categorias---------------------------------
        case 'categoriasCriar':
          console.log('existe categoria');
          permissao[0].permission.create = true;
          break;
        case 'categoriasVisualizar':
          permissao[0].permission.read = true;
          break;
        case 'categoriasEditar':
          permissao[0].permission.update = true;
          break;
        case 'categoriasStatus':
          permissao[0].permission.status = true;
          break;
        case 'categoriasExcluir':
          permissao[0].permission.delete = true;
          break;

        // Permissão em pedidos---------------------------------
        case 'pedidosCriar':
          permissao[1].permission.create = true;
          break;
        case 'pedidosVisualizar':
          permissao[1].permission.read = true;
          break;
        case 'pedidosEditar':
          permissao[1].permission.update = true;
          break;
        case 'pedidosStatus':
          permissao[1].permission.status = true;
          break;
        case 'pedidosExcluir':
          permissao[1].permission.delete = true;
          break;

        // Permissão em produtos---------------------------------
        case 'produtosCriar':
          permissao[2].permission.create = true;
          break;
        case 'produtosVisualizar':
          permissao[2].permission.read = true;
          break;
        case 'produtosEditar':
          permissao[2].permission.update = true;
          break;
        case 'produtosStatus':
          permissao[2].permission.status = true;
          break;
        case 'produtosExcluir':
          permissao[2].permission.delete = true;
          break;

        // Permissão em condPagamento---------------------------------
        case 'condPagamentoCriar':
          permissao[3].permission.create = true;
          break;
        case 'condPagamentoVisualizar':
          permissao[3].permission.read = true;
          break;
        case 'condPagamentoEditar':
          permissao[3].permission.update = true;
          break;
        case 'condPagamentoStatus':
          permissao[3].permission.status = true;
          break;
        case 'condPagamentoExcluir':
          permissao[3].permission.delete = true;
          break;

        // Permissão em tipoFrete---------------------------------
        case 'tipoFreteCriar':
          permissao[4].permission.create = true;
          break;
        case 'tipoFreteVisualizar':
          permissao[4].permission.read = true;
          break;
        case 'tipoFreteEditar':
          permissao[4].permission.update = true;
          break;
        case 'tipoFreteStatus':
          permissao[4].permission.status = true;
          break;
        case 'tipoFreteExcluir':
          permissao[4].permission.delete = true;
          break;

        // Permissão em Relatório-------------------------------------
        case 'relatoriosVisualizar':
          permissao[5].permission.read = true;
          break;

        // Permissão em Empresas---------------------------------
        case 'empresasCriar':
          permissao[6].permission.create = true;
          break;
        case 'empresasVisualizar':
          permissao[6].permission.read = true;
          break;
        case 'empresasEditar':
          permissao[6].permission.update = true;
          break;
        case 'empresasStatus':
          permissao[6].permission.status = true;
          break;
        case 'empresasExcluir':
          permissao[6].permission.delete = true;
          break;

        // Permissão em formaPagamento---------------------------------
        case 'formaPagamentoCriar':
          permissao[7].permission.create = true;
          break;
        case 'formaPagamentoVisualizar':
          permissao[7].permission.read = true;
          break;
        case 'formaPagamentoEditar':
          permissao[7].permission.update = true;
          break;
        case 'formaPagamentoStatus':
          permissao[7].permission.status = true;
          break;
        case 'formaPagamentoExcluir':
          permissao[7].permission.delete = true;
          break;
      }
    }
     
  }
  carregarPermissoesTreeNode(permissao: any, selectedpermissao: any) {
    // Início de Permissao de Atendimentos--------------------------------------------------------------
    if (permissao[0].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categorias') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Atendimentos -------------------------------------------------------------------

    // Início de Permissao de pedidos--------------------------------------------------------------
    if (permissao[1].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidos') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Convenios -------------------------------------------------------------------

    // Início de Permissao de produtos--------------------------------------------------------------
    if (permissao[2].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.produtos !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtos') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de produtos -------------------------------------------------------------------

    // Início de Permissao de condPagamento--------------------------------------------------------------
    if (permissao[3].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamento') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de condPagamento -------------------------------------------------------------------

    // Início de Permissao de tipoFretes--------------------------------------------------------------
    if (permissao[4].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[4].permission.create !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.status !== true &&
      permissao[4].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretes') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de tipoFretes -------------------------------------------------------------------

    // Início de Permissao de Usuarios--------------------------------------------------------------
    if (permissao[5].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[5].permission.create !== true &&
      permissao[5].permission.read !== true &&
      permissao[5].permission.update !== true &&
      permissao[5].permission.status !== true &&
      permissao[5].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Usuarios -------------------------------------------------------------------


    // Início de Permissao de Relatórios------------------------------------------------
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatoriosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatorios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Relatórios------------------------------------------------

    // Início de Permissao de Empresas--------------------------------------------------------------
    if (permissao[7].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresas') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Empresas -------------------------------------------------------------------

    // Início de Permissao de tipoFrete--------------------------------------------------------------
    if (permissao[8].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[8].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[8].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[8].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[8].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretesExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[8].permission.create !== true &&
      permissao[8].permission.read !== true &&
      permissao[8].permission.update !== true &&
      permissao[8].permission.status !== true &&
      permissao[8].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFretes') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de tipoFretes -------------------------------------------------------------------

    // Verificar Node de Cadastro-------------------------------------------------------------------
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true &&
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true &&
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true &&
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.delete !== true &&
      permissao[5].permission.create !== true &&
      permissao[5].permission.read !== true &&
      permissao[5].permission.update !== true &&
      permissao[5].permission.status !== true &&
      permissao[5].permission.delete !== true &&
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true &&
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true &&
      permissao[8].permission.create !== true &&
      permissao[8].permission.read !== true &&
      permissao[8].permission.update !== true &&
      permissao[8].permission.status !== true &&
      permissao[8].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
  }
}