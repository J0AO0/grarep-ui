import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

// Interface para o payload do JWT
interface JwtPayload {
  user_name: string;
  scope: string[];
  nome: string | null;
  id: number;
  exp: number;
  authorities: string[];
  jti: string;
  tenant: { id: number; descricao: string };
  client_id: string;
}

// Interface para o objeto usuarioLogado
interface UsuarioLogado {
  id: number;
  tenant: string;
  tenantId: number;
  nome: string;
}

@Injectable()
export class AuthService {
  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: JwtPayload | null;
  linkHttp: HttpClient;
  resetpass: string;
  empresaativaUrl: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private messageService: MessageService,
    private httpBackend: HttpBackend,
    private router: Router
  ) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.resetpass = `${environment.apiUrl}/d/forgot`;
    this.linkHttp = new HttpClient(this.httpBackend);
    this.empresaativaUrl = `${environment.apiUrl}/empresas/ativa`;
  }

  setToken(token: string) {
    this.armazenarToken(token, null);
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic bGFic3JlcDojU0VSVkVSQGxhYnNyZXA=')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response: any) => {
        const token = response['access_token'];
        this.armazenarToken(token, response);

        // Decodifica o token para obter as informações do usuário
        const decodedToken: JwtPayload = this.jwtHelper.decodeToken(token);
        console.log('Token recebido:', token);
        console.log('Decoded Token:', decodedToken);

        const usuarioLogado: UsuarioLogado = {
          id: decodedToken.id || 0,
          tenant: decodedToken.tenant?.descricao || '',
          tenantId: decodedToken.tenant?.id || 0,
          nome: decodedToken.nome || decodedToken.user_name || 'Usuário Desconhecido',
        };

        // Log para depuração
        console.log('Usuario Logado:', usuarioLogado);

        // Verifica se id e tenantId estão presentes
        if (!usuarioLogado.id || !usuarioLogado.tenantId) {
          console.error('Token não contém id ou tenant.id:', decodedToken);
          throw new Error('Informações do usuário incompletas no token');
        }

        // Armazena as informações do usuário no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        this.messageService.add({
          severity: 'success',
          summary: 'Login',
          detail: 'Efetuado com sucesso',
        });
      })
      .catch((response) => {
        console.error('Login error:', response);
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválido');
          }
        }
        return Promise.reject(response);
      });
  }

  logout() {
    return firstValueFrom(
      this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
    ).then(() => {
      this.limparAccessToken();
      this.messageService.add({
        severity: 'success',
        summary: 'Saindo',
        detail: 'até breve...',
      });
      this.router.navigate(['/login']);
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('name_user');
    localStorage.removeItem('usuarioLogado');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    const token = localStorage.getItem('token');
    if (!token) return false;
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    return this.jwtPayload?.authorities.includes(permissao) || false;
  }

  private armazenarToken(token: string, response: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    if (!this.jwtPayload?.id || !this.jwtPayload?.tenant?.id) {
      console.error('Token inválido: id ou tenant.id ausentes', this.jwtPayload);
      this.limparAccessToken();
      this.router.navigate(['/login']);
      return;
    }

    if (response?.nome) {
      this.jwtPayload.nome = response.nome;
      localStorage.setItem('name_user', response.nome);
    }
    localStorage.setItem('token', token);

    // Reconstrói usuarioLogado a partir do token
    const usuarioLogado: UsuarioLogado = {
      id: this.jwtPayload.id,
      tenant: this.jwtPayload.tenant.descricao,
      tenantId: this.jwtPayload.tenant.id,
      nome: this.jwtPayload.nome || this.jwtPayload.user_name || 'Usuário Desconhecido',
    };

    console.log('Armazenando usuarioLogado:', usuarioLogado);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  }

  buscarEmpAtiva() {
    return firstValueFrom(this.http.get(`${this.empresaativaUrl}`)).then(
      (response) => response
    );
  }

  getTenant(): string {
    const usuarioLogado: UsuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (usuarioLogado.tenant) {
      console.log('Tenant encontrado em usuarioLogado:', usuarioLogado.tenant);
      return usuarioLogado.tenant;
    }

    // Fallback: tenta recuperar do token
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: JwtPayload = this.jwtHelper.decodeToken(token);
      console.log('Tentando recuperar tenant do token:', decodedToken);
      if (decodedToken.tenant?.descricao) {
        const updatedUsuarioLogado: UsuarioLogado = {
          id: decodedToken.id || 0,
          tenant: decodedToken.tenant.descricao,
          tenantId: decodedToken.tenant.id || 0,
          nome: decodedToken.nome || decodedToken.user_name || 'Usuário Desconhecido',
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUsuarioLogado));
        console.log('Tenant recuperado do token:', decodedToken.tenant.descricao);
        return decodedToken.tenant.descricao;
      }
    }
    console.error('Nenhum tenant encontrado. Token:', token, 'UsuarioLogado:', usuarioLogado);
    this.limparAccessToken();
    this.router.navigate(['/login']);
    return '';
  }

  getTenantId(): string {
    const usuarioLogado: UsuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (usuarioLogado.tenantId) {
      console.log('TenantId encontrado em usuarioLogado:', usuarioLogado.tenantId);
      return usuarioLogado.tenantId.toString();
    }

    // Fallback: tenta recuperar do token
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: JwtPayload = this.jwtHelper.decodeToken(token);
      console.log('Tentando recuperar tenantId do token:', decodedToken);
      if (decodedToken.tenant?.id) {
        const updatedUsuarioLogado: UsuarioLogado = {
          id: decodedToken.id || 0,
          tenant: decodedToken.tenant.descricao || '',
          tenantId: decodedToken.tenant.id,
          nome: decodedToken.nome || decodedToken.user_name || 'Usuário Desconhecido',
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUsuarioLogado));
        console.log('TenantId recuperado do token:', decodedToken.tenant.id);
        return decodedToken.tenant.id.toString();
      }
    }
    console.error('Nenhum tenantId encontrado. Token:', token, 'UsuarioLogado:', usuarioLogado);
    this.limparAccessToken();
    this.router.navigate(['/login']);
    return '';
  }

  getUsuarioId(): string {
    const usuarioLogado: UsuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (usuarioLogado.id) {
      console.log('UsuarioId encontrado em usuarioLogado:', usuarioLogado.id);
      return usuarioLogado.id.toString();
    }

    // Fallback: tenta recuperar do token
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken: JwtPayload = this.jwtHelper.decodeToken(token);
      console.log('Tentando recuperar usuarioId do token:', decodedToken);
      if (decodedToken.id) {
        const updatedUsuarioLogado: UsuarioLogado = {
          id: decodedToken.id,
          tenant: decodedToken.tenant?.descricao || '',
          tenantId: decodedToken.tenant?.id || 0,
          nome: decodedToken.nome || decodedToken.user_name || 'Usuário Desconhecido',
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUsuarioLogado));
        console.log('UsuarioId recuperado do token:', decodedToken.id);
        return decodedToken.id.toString();
      }
    }
    console.error('Nenhum usuarioId encontrado. Token:', token, 'UsuarioLogado:', usuarioLogado);
    this.limparAccessToken();
    this.router.navigate(['/login']);
    return '';
  }

  regrasdePermissao(roles: string[]) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic bGFic3JlcDojU0VSVkVSQGxhYnNyZXA=')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response: any) => {
        this.armazenarToken(response['access_token'], response);
        return Promise.resolve();
      })
      .catch((response) => {
        console.error('Erro ao renovar token:', response);
        this.limparAccessToken();
        this.router.navigate(['/login']);
        return Promise.resolve();
      });
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      console.log('Carregando token:', this.jwtPayload);
      if (!this.jwtPayload?.id || !this.jwtPayload?.tenant?.id) {
        console.error('Token inválido ao carregar: id ou tenant.id ausentes', this.jwtPayload);
        this.limparAccessToken();
        this.router.navigate(['/login']);
        return;
      }

      const usuarioLogado: UsuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
      if (!usuarioLogado.id || !usuarioLogado.tenantId) {
        const updatedUsuarioLogado: UsuarioLogado = {
          id: this.jwtPayload.id,
          tenant: this.jwtPayload.tenant.descricao,
          tenantId: this.jwtPayload.tenant.id,
          nome: this.jwtPayload.nome || this.jwtPayload.user_name || 'Usuário Desconhecido',
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUsuarioLogado));
        console.log('Reconstruído usuarioLogado:', updatedUsuarioLogado);
      }
      if (this.jwtPayload.nome) {
        localStorage.setItem('name_user', this.jwtPayload.nome);
      }
    } else {
      console.warn('Token inválido ou expirado ao carregar:', token);
      this.limparAccessToken();
      this.router.navigate(['/login']);
    }
  }

  atualizarSenha(pass: string): Promise<any> {
    return firstValueFrom(this.linkHttp.put(`${this.resetpass}`, pass)).then(
      (response) => response as any
    );
  }
}