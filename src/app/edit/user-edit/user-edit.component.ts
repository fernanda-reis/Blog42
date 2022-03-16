import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUser: number;
  usuarioTipo: string;
  senha: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == ''){
      alert('Sua sessão expirou! Faça o login novamente.')
     this.router.navigate(['/entrar'])
     }

    this.authService.refreshToken();
    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
  }


  tipoUser(event: any) {
    this.usuarioTipo = event.target.value;
  }

  atualizar() {
    this.usuario.senha = this.senha;
    this.authService.atualizar(this.usuario).subscribe({
      next: (resp: Usuario) => {
        this.usuario = resp;
        alert('Dados atualizados com sucesso! Faça o login para continuar.');
        this.sair();
      },
      error: (erro) => {
        if (erro.status == 400) {
          alert('Senha incorreta! Tente novamente.');
        } else if (erro.status == 500) {
          alert('Confirme sua senha!');
        }
      },
    });
  }


  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  sair() {
    this.usuario = new Usuario();
    this.idUser = 0;
    this.usuarioTipo = '';
    this.senha = '';

    environment.token = '';
    environment.nome = '';
    environment.foto = '';
    environment.usuario = '';
    environment.tipo = '';
    environment.senha = '';
    environment.id = 0;

    this.router.navigate(['/entrar']);
  }
}
