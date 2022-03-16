import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  senhaConfirmada: string
  usuarioTipo: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.senhaConfirmada = event.target.value
  }

  tipoUser(event: any){
    this.usuarioTipo = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.usuarioTipo

    if(this.senhaConfirmada.length < 5) {
      alert('A senha deve ter pelo menos 5 caracteres!')
    } else {
      if(this.usuario.foto == null){
        this.usuario.foto = 'https://i.imgur.com/B0uqNg1.png'
      }

      if(this.usuario.senha != this.senhaConfirmada){
        alert('As senhas não batem!')
      } else {
        this.authService.cadastrar(this.usuario).subscribe({
          next: (resp:Usuario) => {
            this.usuario = resp
            this.router.navigate(['/entrar'])
            alert('Usuario cadastrado com sucesso!')
          },
          error: (erro) => {
            if (erro.status == 400) {
              alert('E-mail já cadastrado!')
            }
          }
        })
      }
    }
  }

}
