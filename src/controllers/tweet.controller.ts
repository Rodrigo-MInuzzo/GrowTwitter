import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { Usuario } from "../models/usuario.model";
import { Tweet } from "../models/tweet.model";

 export class TweetController{
    
    public async criarTweet(req:Request, res:Response){
       try {
             const {id}= req.params;
             const {conteudo}=req.body;

             if(!id || !conteudo){
              return res.status(401).send({
                ok: false,
                message: "As informações não foram informadas"
              })
             }

             const usuario= await repository.usuario.findUnique({
                where: {
                    id
                }
             });

             if(!usuario){
              return res.status(401).send({
                ok: false,
                message:"Usuário não encontrado"
              })
             }

             const usuarioBack= new Usuario(
                 usuario.nome,
                 usuario.email,
                 usuario.username,
                 usuario.senha)
            
             const tweet= new Tweet(conteudo,"T", usuarioBack) 
             const result = await repository.tweet.create({
                data:{
                    idUsuario:id,
                    conteudo: tweet.conteudo,
                    tipo: tweet.tipo
                }
             })
             
             return res.status(201).send({
                ok:true,
                message:"Tweet criado com sucesso",
                data: result
             })
        
       } catch (error:any) {
         return res. status(500).send({
           ok: false,
           message: error.toString()
         })
       }
    }

    public async listarTweets(req:Request, res:Response){
         try {
            const {id}= req.params;
            const tweets = await repository.tweet.findMany({
               where: {
                  idUsuario:id 
               },
               select : {
                  conteudo: true,
                  tipo:true,
                  usuario: true,
               }
           });
            res.status(200).send({
              ok: true,
              message: "Lista de tweets obtida com sucesso",
              data: tweets,
            });

         } catch (error:any) {
            return res. status(500).send({
               ok: false,
               message: error.toString()
             })
         }
    }

    public async listarTodosTweets(req:Request, res:Response){
       try {
            const result = await repository.tweet.findMany({
               select : {
                  id: true,
                  conteudo: true,
                  tipo:true,
                  usuario: true,
               }
            })
            return res.status(200).send({
               ok: true,
               message: "Lista de tweets obtida com sucesso!",
               data: result,
            })
         
       } catch (error:any) {

         return res.status(500).send({
            ok: false,
            message: error.toString()
          })
       }

    }

 }