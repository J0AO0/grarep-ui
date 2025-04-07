import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) { }

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      switch (selected[i].data) {
        // Permissão em Usuarios---------------------------------
        case 'usuariosCriar':
          permissao[0].permission.create = true;
          break;
        case 'usuariosVisualizar':
          permissao[0].permission.read = true;
          break;
        case 'usuariosEditar':
          permissao[0].permission.update = true;
          break;
        case 'usuariosStatus':
          permissao[0].permission.status = true;
          break;
        case 'usuariosExcluir':
          permissao[0].permission.delete = true;
          break;

        // Permissão em Relatório-------------------------------------
        // case 'relatoriosVisualizar':
        //   permissao[5].permission.read = true;
        //   break;

        // Permissão em Empresas---------------------------------
        case 'empresasCriar':
          permissao[1].permission.create = true;
          break;
        case 'empresasVisualizar':
          permissao[1].permission.read = true;
          break;
        case 'empresasEditar':
          permissao[1].permission.update = true;
          break;
        case 'empresasStatus':
          permissao[1].permission.status = true;
          break;
        case 'empresasExcluir':
          permissao[1].permission.delete = true;
          break;

        // Permissão em Categorias------- --------------------------
        case 'categoriaCriar':
          permissao[2].permission.create = true;
          break;
        case 'categoriaVisualizar':
          permissao[2].permission.read = true;
          break;
        case 'categoriaEditar':
          permissao[2].permission.update = true;
          break;
        case 'categoriaStatus':
          permissao[2].permission.status = true;
          break;
        case 'categoriasExcluir':
          permissao[2].permission.delete = true;
          break;

        case 'pedidoCriar':
          console.log('Pedido existente')
          permissao[3].permission.create = true;
          console.log(permissao[3].permission.read)
          break;
        case 'pedidoVisualizar':
          permissao[3].permission.read = true;
          break;
        case 'pedidoEditar':
          permissao[3].permission.update = true;
          break;
        case 'pedidoStatus':
          permissao[3].permission.status = true;
          break;
        case 'pedidoExcluir':
          permissao[3].permission.delete = true;
          break;

        case 'produtoCriar':
          console.log('Produto existente')
          permissao[4].permission.create = true;
          console.log(permissao[4].permission.read)
          break;
        case 'produtoVisualizar':
          permissao[4].permission.read = true;
          break;
        case 'produtoEditar':
          permissao[4].permission.update = true;
          break;
        case 'produtoStatus':
          permissao[4].permission.status = true;
          break;
        case 'produtoExcluir':
          permissao[4].permission.delete = true;
          break;

        case 'condPagamentoCriar':
          console.log('Condição de Pagamento existente')
          permissao[5].permission.create = true;
          console.log(permissao[5].permission.read)
          break;
        case 'condPagamentoVisualizar':
          permissao[5].permission.read = true;
          break;
        case 'condPagamentoEditar':
          permissao[5].permission.update = true;
          break;
        case 'condPagamentoStatus':
          permissao[5].permission.status = true;
          break;
        case 'condPagamentoExcluir':
          permissao[5].permission.delete = true;
          break;

        case 'tipoFreteCriar':
          console.log('Tipo de Frete existente')
          permissao[6].permission.create = true;
          console.log(permissao[6].permission.read)
          break;
        case 'tipoFreteVisualizar':
          permissao[6].permission.read = true;
          break;
        case 'tipoFreteEditar':
          permissao[6].permission.update = true;
          break;
        case 'tipoFreteStatus':
          permissao[6].permission.status = true;
          break;
        case 'tipoFreteExcluir':
          permissao[6].permission.delete = true;
          break;

        case 'formaPagamentoCriar':
          console.log('Forma de Pagamento existente')
          permissao[7].permission.create = true;
          console.log(permissao[7].permission.read)
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
    // Início de Permissao de Usuarios--------------------------------------------------------------
    if (permissao[0].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosExcluir') {
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
        if (item.data === 'usuario') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Usuarios -------------------------------------------------------------------

    // // Início de Permissao de Relatórios------------------------------------------------
    // if (permissao[5].permission.read !== true) {
    //   selectedpermissao.forEach((item, index) => {
    //     if (item.data === 'relatoriosVisualizar') {
    //       selectedpermissao.splice(index, 1);
    //     }
    //   });
    // }
    // if (permissao[5].permission.read !== true) {
    //   selectedpermissao.forEach((item, index) => {
    //     if (item.data === 'relatorios') {
    //       selectedpermissao.splice(index, 1);
    //     }
    //   });
    // }
    // // Fim permissao de Relatórios------------------------------------------------

    // Início de Permissao de Empresas--------------------------------------------------------------
    if (permissao[1].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaExcluir') {
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
        if (item.data === 'empresa') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Empresas -------------------------------------------------------------------

    // Início de Permissao de Categorias--------------------------------------------------------------
    if (permissao[2].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasCriar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasVisualizar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasEditar') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasStatus') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (permissao[2].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categoriasExcluir') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    if (
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'categorias') {
          selectedpermissao.splice(index, 2);
        }
      });
    }
    // Fim permissao de categorias -------------------------------------------------------------------

    // Início de Permissao de pedidos--------------------------------------------------------------
    if (permissao[3].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoCriar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoVisualizar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoEditar') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoStatus') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    if (permissao[3].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pedidoExcluir') {
          selectedpermissao.splice(index, 3);
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
        if (item.data === 'pedido') {
          selectedpermissao.splice(index, 3);
        }
      });
    }
    // Fim permissao de pedidos -------------------------------------------------------------------

    // Início de Permissao de produtos--------------------------------------------------------------
    if (permissao[4].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoCriar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoVisualizar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoEditar') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoStatus') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    if (permissao[4].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoExcluir') {
          selectedpermissao.splice(index, 4);
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
        if (item.data === 'produto') {
          selectedpermissao.splice(index, 4);
        }
      });
    }
    // Fim permissao de produtos -------------------------------------------------------------------

    // Início de Permissao de condPagamentos--------------------------------------------------------------
    if (permissao[5].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoCriar') {
          selectedpermissao.splice(index, 5);
        }
      });
    }
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoVisualizar') {
          selectedpermissao.splice(index, 5);
        }
      });
    }
    if (permissao[5].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoEditar') {
          selectedpermissao.splice(index, 5);
        }
      });
    }
    if (permissao[5].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoStatus') {
          selectedpermissao.splice(index, 5);
        }
      });
    }
    if (permissao[5].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'condPagamentoExcluir') {
          selectedpermissao.splice(index, 5);
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
        if (item.data === 'condPagamento') {
          selectedpermissao.splice(index, 5);
        }
      });
    }
    // Fim permissao de condPagamentos -------------------------------------------------------------------

    // Início de Permissao de tipoFretes--------------------------------------------------------------
    if (permissao[6].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteCriar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteVisualizar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteEditar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteStatus') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteExcluir') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFrete') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    // Fim permissao de tipoFretes -------------------------------------------------------------------

    // Início de Permissao de tipoFretes--------------------------------------------------------------
    if (permissao[6].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteCriar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteVisualizar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteEditar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteStatus') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteExcluir') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFrete') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    // Fim permissao de tipoFretes -------------------------------------------------------------------

    // Início de Permissao de tipoFretes--------------------------------------------------------------
    if (permissao[6].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteCriar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteVisualizar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteEditar') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteStatus') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (permissao[6].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFreteExcluir') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    if (
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'tipoFrete') {
          selectedpermissao.splice(index, 6);
        }
      });
    }
    // Fim permissao de tipoFretes -----------------------------------------------------------------
    // Início de Permissao de formaPagamentos--------------------------------------------------------------
    if (permissao[7].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'formaPagamentoCriar') {
          selectedpermissao.splice(index, 7);
        }
      });
    }
    if (permissao[7].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'formaPagamentoVisualizar') {
          selectedpermissao.splice(index, 7);
        }
      });
    }
    if (permissao[7].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'formaPagamentoEditar') {
          selectedpermissao.splice(index, 7);
        }
      });
    }
    if (permissao[7].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'formaPagamentoStatus') {
          selectedpermissao.splice(index, 7);
        }
      });
    }
    if (permissao[7].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'formaPagamentoExcluir') {
          selectedpermissao.splice(index, 7);
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
        if (item.data === 'formaPagamento') {
          selectedpermissao.splice(index, 7);
        }
      });
    }
    // Fim permissao de formaPagamentos -------------------------------------------------------------------

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
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }

  }
}

