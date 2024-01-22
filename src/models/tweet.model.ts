import { randomUUID } from "crypto";
import { Usuario } from "./usuario.model";



export class Tweet{
    public id: string;

    constructor(
        public conteudo: string,
        public tipo: string,
        public usuario: Usuario
    ){
       this.id= randomUUID()
        
    }
}