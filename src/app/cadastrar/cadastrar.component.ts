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

    if(this.usuario.senha != this.senhaConfirmada){
      alert('As senhas não batem!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuario cadastrado com sucesso!')
      })
    }
  }

}
