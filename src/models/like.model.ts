import { Tweet } from "@prisma/client";
import { Usuario } from "./usuario.model";
import { randomUUID } from "crypto";

 export class Like{
    public id: string;

    constructor(
        public usuario : Usuario,
        public tweet: Tweet
    ){
        this.id= randomUUID()

    }
 }