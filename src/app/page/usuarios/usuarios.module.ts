import { NgModule } from '@angular/core';
import { ValidateEqualModule } from 'ng-validate-equal';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuariosRountingModule } from './usuarios.routing';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuariosListaComponent,
    UsuarioEditarComponent,
    AlterarSenhaComponent
  ],

  imports: [
    PrimeNGModule,
    UsuariosRountingModule,
    ValidateEqualModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ]
})
export class UsuariosModule { }
