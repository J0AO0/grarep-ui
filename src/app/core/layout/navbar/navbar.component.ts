import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { ConfirmationService, MessageService } from 'primeng/api';




import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../error-handler.service';
import { AuthService } from 'src/app/page/seguranca/auth.service';
import { EmpresasService } from 'src/app/page/empresas/empresas.service';
import { UsuariosService } from 'src/app/page/usuarios/usuarios.service';
import { Usuarios } from '../../models/usuarios.model';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @Input()
  routerLinkActiveOptions: {
    exact: boolean;
  };

  sair: any;
  logo: any = '/assets/images/labsrad.png';
  logoDescricao: any = '/assets/images/labsdev-circle-icon.png';
  visibleSidebar;
  menu;
  env = environment;
  displayEmpresas: boolean;
  loading: boolean;
  empresas = [];
  usuario = new Usuarios();
  usuarios = new Array<Usuarios>();
  colsEmpresa = [];
  razaosocial: string;
  idEmpresaativa: number;

  items = [
    {
      label: 'sair',
      icon: 'pi pi-sign-out',
      command: () => {
        this.confirmarLogout(this.sair)
      }
    }
  ]

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private confirmation: ConfirmationService,
    private empresaService: EmpresasService,
    private messageService: MessageService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.razaosocial = '...';

    this.colsEmpresa = [
      { field: 'id', header: 'ID', width: '80px' },
      { field: 'cpfoucnpj', header: 'Cnpj', width: '300px' },
      { field: 'razaosocial', header: 'Empresa', width: '250px' },
      { field: 'cidade', header: 'Cidade', width: '100px' },
      { field: 'uf', header: 'Estado', width: '100px' },
    ];
  }

  ngAfterViewInit() {
    if (this.auth.jwtPayload) {
      this.usuarioLogado();
    }
  }

  novoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
  confirmarLogout(sair: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja sair? `,
      accept: () => {
        this.logout(sair);
      }
    });
  }
  logout(sair: any) {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  showEmpresas() {
    this.menu = false;
    this.displayEmpresas = true;
    // colocar timeOut
     this.carregarEmpresasUsuario();
    console.log(this.empresaService.listarEmpresaPadrao);
  }
  carregarEmpresasUsuario() {
    this.loading = true;
    return this.empresaService
      .listarEmpresaPadrao()
      .then((obj) => {
        this.empresas = obj;
        this.loading = false;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loading = false;
      });
  }

  carregarEmpresaPadrao() {
    this.loading = true;
    return this.empresaService
      .listar()
      .then((obj) => {
        this.empresas = obj;
        this.loading = false;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loading = false;
      });
  }

  selecionaEmpresa(id: number) {
    this.usuarioService
      .empresaUsuario(id)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Empresa',
          detail: `selecionada com sucesso!`,
        });
        this.displayEmpresas = false;
        this.usuarioLogado();
        this.redirectTo('/');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  redirectTo(uri: string) {
    if (this.router.url === '/dashboard') {
      window.location.reload();
    }
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  usuarioLogado() {
    this.usuarioService
      .listarUsuarios()
      .then((obj) => {
        this.usuarios = obj;
        this.verificarUsuarioLogado(this.usuarios);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  verificarUsuarioLogado(usuarios: Array<Usuarios>) {
    for (const i of Object.keys(usuarios)) {
      if (this.auth.jwtPayload?.user_name === usuarios[i].email) {
        this.usuario = usuarios[i];
        this.usuarioService.buscarPorId(usuarios[i].id).then((obj2) => {
          this.razaosocial = obj2.empresaativa;
          this.idEmpresaativa = obj2.idEmpresaativa;
        });
      } else {
        this.razaosocial = null;
      }
    }
  }



}
