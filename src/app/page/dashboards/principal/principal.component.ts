import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  urlMetabase: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const tenantId = this.authService.getTenantId();
    const usuarioId = this.authService.getUsuarioId();

    console.log('Tenant ID:', tenantId);
    console.log('Usuário ID:', usuarioId);

    if (!tenantId || !usuarioId) {
      console.error('Erro: tenantId ou usuarioId não encontrados', { tenantId, usuarioId });
      return;
    }

    const dashboardId = 'd42f9258-2be6-4dc1-a6f9-38510cf84cb4';
    const url = `https://metabase.gralha-azul.ind.br/public/dashboard/${dashboardId}?tenant=${encodeURIComponent(tenantId)}&usuario=${encodeURIComponent(usuarioId)}#hide_parameters=tenant,usuario`;

    this.urlMetabase = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log('URL Metabase:', url);
  }
}