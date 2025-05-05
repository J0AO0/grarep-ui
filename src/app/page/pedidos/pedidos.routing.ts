import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';





const routes: Routes = [
  {
    path: '',
    component: PedidosListaComponent,
   // canActivate: [AuthGuard],
    data: {roles: ['R_PED']}
  },
  {
    path: 'novo',
    component: PedidosCadastroComponent,
   // canActivate: [AuthGuard],
    data: {roles: ['C_PED']}
  },
  {
    path: ':id',
    component: PedidosCadastroComponent,
   // canActivate: [AuthGuard],
    data: {roles: ['U_PED']}
  } 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
