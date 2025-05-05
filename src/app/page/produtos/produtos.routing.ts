import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosListarComponent } from './produto-lista/produtos-lista.component';


const routes: Routes = [
  {
    path: '', component: ProdutosListarComponent,
    canActivate: [AuthGuard],
     data: {roles: ['R_PROD']}
  },
  {
    path: 'novo', component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
      data: {roles: ['C_PROD']}
  },
  {
    path: ':id', component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
     data: {roles: ['U_PROD']}

  },

];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutosRountingModule { }