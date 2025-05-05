import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrincipalComponent } from './principal/principal.component';
import { RelatoriosRountingModule } from './relatorios.routing';
import { RelatoriosService } from './relatorios.service'; // Ajuste o caminho conforme necessário

@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    PrimeNGModule,
    SharedModule,
    RelatoriosRountingModule
  ],
  providers: [RelatoriosService] // Adiciona o serviço como provedor
})
export class RelatoriosModule { }