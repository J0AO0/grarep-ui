import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core/layout/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { NaoAutorizadoComponent } from './core/layout/nao-autorizado/nao-autorizado.component';
//import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { AlterarSenhaComponent } from './pages/usuarios/alterar-senha/alterar-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard' , loadChildren: () => 
    import('./page/dashboards/dashboard.module').then(m => m.DashboardsModule)
  },
  {
    path: 'empresas' , loadChildren: () => 
    import('./page/empresas/empresas.module').then(m => m.EmpresaModule)
  },
 {
    path: 'usuarios', loadChildren: () =>
    import('./page/usuarios/usuarios.module').then(m =>  m.UsuariosModule)
  },
  {
    path: 'produtos', loadChildren: () =>
    import('./page/produtos/produtos.module').then(m =>  m.ProdutosModule)
  },
  {
    path: 'pedidos', loadChildren: () =>
    import('./page/pedidos/pedidos.module').then(m =>  m.PedidosModule)
  },
  {
    path: 'relatorios', loadChildren: () =>
      import('./page/relatorios/relatorios.module').then(m => m.RelatoriosModule)
  },
  
 // { path: 'alterarsenha', component: AlterarSenhaComponent },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo: 'dashboard  ' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
