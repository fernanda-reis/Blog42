import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,

  ) { }

  ngOnInit() {
    window.scroll(0,0)

        // if (environment.token == ''){
    //   alert('Sua sessão expirou! Faça o login novamente.')
    //  this.router.navigate(['/entrar'])
    //  }

    this.authService.refreshToken()
    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id:  number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }


  deletar() {
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert('Postagem deletada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }


}
