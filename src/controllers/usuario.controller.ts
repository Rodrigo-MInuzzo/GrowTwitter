import { Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";

export class UsuarioController{
    public async criarUsuario(req:Request, res:Response){
        try {
            //entrada
            const {nome, email, senha,username}=req.body;
             if(!nome || !email || !senha || !username){
                return res.status(400).send({
                    ok: false,
                    message: "Algum campo está faltando!",
                });
             }
              
             const usuario= new Usuario(nome,email,username,senha);
            //processamento
            
            const result= await repository.usuario.create({
                data: usuario,
            })

            //saida
            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso",
                data:result,
            })
            
        } catch (error:any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
  
    public async login(req:Request, res:Response){
        try {
              const {email,senha}=req.body;

              if(!email || !senha){
                 return res.status(400).send({
                    ok: false,
                    message:"E-mail ou senha não informados"
                 })
              }

              const usuario= await repository.usuario.findUnique({
                where:{
                    email,
                    senha
                }
              })
            
              if(!usuario){
                 return res.status(400).send({
                    ok: false,
                    message:"Usuário não encontrado"
                 })
              }

              const token= randomUUID();

              await repository.usuario.update({
                where:{
                    id: usuario.id
                },
                data:{
                    token
                }
              })

              return res.status(200).send({
                ok: true,
                message: "Login feito com sucesso!",
                data:{
                    token,
                }
              });

        } catch (error:any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    }

    public async buscarUsuario(req:Request, res:Response){
       try {
          const{id}= req.params;

          if(!id){
            return res.status(400).send({
                ok: false,
                message: "Id não informado"
            })
          }

          const usuario= await repository.usuario.findUnique({
            where: {
                id,
            }
          })
        
          if(!usuario){
            return res.status(401).send({
                ok: false,
                message: "Usuário não encontrado"
            })
          }

          return res.status(200).send({
            ok: true,
            message: "Usuário encontrado com sucesso",
            data: usuario
        
          })

       } catch (error:any) {
        return res.status(500).send({
            ok:false,
            message:error.toString()
        })
       }
    }

    public async listarUsuarios(req:Request, res:Response){
        try {
           return res.status(201).send(
            await repository.usuario.findMany()
           )

            
        } catch (error:any) {
            return res.status(500).send({
                ok:false,
                message: error.toString()
            })
        }
    }

}