import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, provideNgxMask } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
//import { DashboardsModule } from './pages/dashboards/dashboard.module';
//import { SegurancaModule } from './pages/seguranca/seguranca.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './page/seguranca/seguranca.module';
import { PrimeNGModule } from './primeng.module';
import { MessageService } from 'primeng/api';
import { DashboardsModule } from './page/dashboards/dashboard.module';


registerLocaleData(localePt, 'pt');

// Configuração do ngx-mask
export const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SegurancaModule,
    PrimeNGModule,
    DashboardsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideNgxMask(maskConfig),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
