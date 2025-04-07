import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsRountingModule } from './dashboard.routing'


@NgModule({
  declarations: [
   PrincipalComponent
  ],
  imports: [
    PrimeNGModule,
    DashboardsRountingModule,
    SharedModule
  ]
})
export class DashboardsModule { }