import { Tema } from "./Tema"
import { Usuario } from "./Usuario"

export class Postagem {
  public id: number
  public titulo: string
  public texto: string
  public data: string
  public tipo: string
  public usuario: Usuario
  public tema: Tema
}
