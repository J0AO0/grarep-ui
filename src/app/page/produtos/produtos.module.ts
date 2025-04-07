import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosListarComponent } from './produto-lista/produtos-lista.component';
import { ProdutosRountingModule } from './produtos.routing';



@NgModule({
  declarations: [
    ProdutoCadastroComponent,
    ProdutosListarComponent
  ],

  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    ProdutosRountingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class ProdutosModule { }
