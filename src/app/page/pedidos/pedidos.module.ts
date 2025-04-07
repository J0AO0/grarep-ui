import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PedidosRoutingModule } from './pedidos.routing';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';



@NgModule({
  declarations: [
    PedidosCadastroComponent, 
    PedidosListaComponent,
    
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    PedidosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class PedidosModule {}
