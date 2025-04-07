import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';





const routes: Routes = [
  {
    path: '',
    component: PedidosListaComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['pedidos']}
  },
  {
    path: 'novo',
    component: PedidosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['pedidos']}
  },
  {
    path: ':id',
    component: PedidosCadastroComponent,
    //canActivate: [AuthGuard],
    data: {roles: ['pedidos']}
  } 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
