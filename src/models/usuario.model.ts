import { randomUUID } from "crypto";

export class Usuario{
    public id: string;

    constructor(
        public nome: string,
        public email: string,
        public username: string,
        public senha: string,
    ){
        this.id= randomUUID()

    }
}